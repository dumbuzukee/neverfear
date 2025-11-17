"use client";

import { Blockquote, Button, Container, FileButton, Flex, Group, Image, List, ListItem, Notification, NumberInput, Paper, Stack, Tabs, TabsList, TabsPanel, TabsTab, Text, TextInput, ThemeIcon, Title } from "@mantine/core";
import { useForm } from "@mantine/form";
import { notifications } from "@mantine/notifications";
import { useState } from "react";

import QRCode from "react-qr-code";

import axios from "axios";
import { IconCircleCheck, IconInfoCircle, IconReceipt } from "@tabler/icons-react";
import { generatePromptPayQRCode } from "@/lib/topup";

export default function TopupForm() {

    const [amount, setAmount] = useState<number | string>(10);
    const [payload, setPayload] = useState<string>("");
    const [file, setFile] = useState<File | null>(null);

    const [toppingUp, setToppingUp] = useState(false);
    const [generated, setGenerated] = useState(false);

    const handleGeneratePromptPayQRCode = async () => {
        setGenerated(false);
        setPayload(generatePromptPayQRCode(Number(amount)));
        setGenerated(true);
    };

    const handleConfirmTopup = async () => {
        setToppingUp(true);

        if (file === null) {
            notifications.show({
                message: "You need to upload your slip file first",
                color: "red",
                autoClose: 3000,
            });
        };

        setToppingUp(false);
    };

    return (
        <Container size="xl" my="xl">
            <Notification
                title="Warning, Please make sure that the payment slip meets the following conditions"
                color="yellow"
                withBorder
                withCloseButton={false}
            >
                <List
                    mt="xs"
                    spacing="xs"
                    icon={
                        <ThemeIcon color="teal" size={24} radius="xl">
                            <IconCircleCheck size={16} />
                        </ThemeIcon>
                    }
                >
                    <ListItem icon c="gray" fz="sm" fw={500}>
                        English:
                    </ListItem>
                    <ListItem>
                        Recipient Name: The recipient must be "ANUNTASITH CHANMISRI" only.
                    </ListItem>
                    <ListItem>
                        Slip Validity: Each slip valid for 10 minutes after the payment time. Expired slips will be rejected.
                    </ListItem>
                    <ListItem>
                        Exact Amount: The transferred amount must match the amount you entered on the website.
                    </ListItem>
                    <ListItem>
                        No Edited Images: Modified or edited images will be automatically rejected.
                    </ListItem>
                    <ListItem icon c="gray" fz="sm" fw={500}>
                        ภาษาไทย:
                    </ListItem>
                    <ListItem>
                        ชื่อผู้รับเงิน: ผู้รับเงินต้องเป็น "อนันทสิทธิ์ จันมีศรี" เท่านั้น
                    </ListItem>
                    <ListItem>
                        อายุของสลิป: สลิปแต่ละใบมีอายุ 10 นาที หลังจากเวลาที่ทำรายการ หากเกินเวลาจะไม่สามารถใช้ได้
                    </ListItem>
                    <ListItem>
                        จำนวนเงินต้องตรงกัน: จำนวนเงินที่โอนต้องตรงกับจำนวนที่คุณกรอกในเว็บไซต์เท่านั้น
                    </ListItem>
                    <ListItem>
                        ห้ามแก้ไขรูปภาพ: สลิปที่ถูกแก้ไข, ครอปภาพ, หรือปรับแต่งใดๆ จะถูกปฏิเสธโดยอัตโนมัติ
                    </ListItem>
                </List>
            </Notification>
            <Paper p="md" radius="md" shadow="sm" mt="md" withBorder>
                <Stack>
                    <NumberInput
                        required
                        leftSection={<IconReceipt size={16} stroke={1.5} />}
                        label="Enter your amount"
                        description="Enter amount of balance, you want to top-up"
                        placeholder="10-1000"
                        value={amount}
                        onChange={setAmount}
                        min={10}
                        max={1000}
                        radius="md"
                    />
                    <Button
                        radius="md"
                        variant="gradient"
                        gradient={{ from: "violet", to: "grape" }}
                        onClick={handleGeneratePromptPayQRCode}
                    >
                        Generate Qr Code
                    </Button>
                    {generated && (
                        <>
                        <Text c="gray" fz="sm" fw={500}>
                            1. Use your mobile banking app or e-wallet to scan the QR Code below and complete the payment.
                        </Text>
                        <Flex justify={{ base: "center", md: "flex-start" }}>
                            <QRCode
                                value={payload}
                            />
                        </Flex>
                        <Text c="gray" fz="sm" fw={500}>
                            2. Upload the slip/receipt from your banking app for verification.
                        </Text>
                        <FileButton onChange={setFile} accept="image/png,image/jpeg">
                            {(props) => <Button
                                radius="md"
                                variant="gradient"
                                gradient={{ from: "violet", to: "grape" }}
                                {...props}
                            >
                                Upload Slip
                            </Button>}
                        </FileButton>
                        {file && (
                            <Text c="dimmed" fz="sm" fw={400}>
                                Picked file: {file.name}
                            </Text>
                        )}
                        <Text c="gray" fz="sm" fw={500}>
                            3. Review your information and click Confirm to submit your top-up request.
                        </Text>
                        <Button
                            radius="md"
                            variant="gradient"
                            gradient={{ from: "violet", to: "grape" }}
                            onClick={handleConfirmTopup}
                            disabled={file === null}
                        >
                            {(file === null) ? "Waiting you upload slip file" : "Confirm Topup"}
                        </Button>
                        </>
                    )}
                </Stack>
            </Paper>
        </Container>
    );
};