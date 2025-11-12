"use client";

import { Button, Container, Paper, Stack, Tabs, TabsList, TabsPanel, TabsTab, TextInput, Title } from "@mantine/core";
import { useForm } from "@mantine/form";
import { notifications } from "@mantine/notifications";
import axios from "axios";
import { useState } from "react";

export default function TopupForm() {
    const form = useForm({
        initialValues: {
            voucherCode: "",
            redeemCode: "",
        },
    });

    const [loading, setLoading] = useState(false);

    const handleTopup = form.onSubmit(
        async (values) => {
            const {
                voucherCode
            } = values;

            setLoading(true);

            const response = await axios
                .post("/api/v1/users/topup", {
                    voucherCode,
                });

            if (response.data.ok) {
                notifications.show({
                    message: `Topped up successfully, you received ${response.data.data.amount} from ${response.data.data.ownerName}`,
                    color: "green",
                    autoClose: 3000,
                });
                window.location.reload();
            } else {
                notifications.show({
                    message: response.data.message,
                    color: "red",
                    autoClose: 3000,
                });
            };

            setLoading(false);
        }
    );

    const handleRedeemCode = form.onSubmit(
        async (values) => {
            const {
                redeemCode,
            } = values;

            setLoading(true);

            const response = await axios
                .post("/api/users/redeem", {
                    redeemCode,
                });

            if (response.data.ok) {
                notifications.show({
                    message: response.data.message,
                    color: "green",
                    autoClose: 3000,
                });
                window.location.reload();
            } else {
                notifications.show({
                    message: response.data.message,
                    color: "red",
                    autoClose: 3000,
                });
            };

            setLoading(false);
        }
    );

    return (
        <Container size="lg" my="xl">
            <Paper p="xl" radius="md" shadow="sm" withBorder>
                <Title size={24} fw={700} mb="md">
                    Select Topup Methods
                </Title>
                <Tabs variant="outline" defaultValue="gift-voucher">
                    <TabsList>
                        <TabsTab value="gift-voucher">
                            TrueMoney Gift Voucher
                        </TabsTab>
                        <TabsTab value="redeem-code">
                            Redeem Code
                        </TabsTab>
                    </TabsList>
                    <TabsPanel value="gift-voucher">
                        <Title fz="lg" fw={700} my="md">
                            ซองอั่งเปาส์ TrueMoney
                        </Title>
                        <form onSubmit={handleTopup}>
                            <Stack>
                                <TextInput
                                    required
                                    label="Gift Voucher Link"
                                    placeholder="https://gift.truemoney.com/campaign/?v=xxxxxxxxxxxx"
                                    radius="md"
                                    {...form.getInputProps("voucherCode")}
                                />
                                <Button
                                    type="submit"
                                    radius="md"
                                    variant="gradient"
                                    gradient={{ from: "violet", to: "grape" }}
                                >
                                    Confirm Topup
                                </Button>
                            </Stack>
                        </form>
                    </TabsPanel>
                    <TabsPanel value="redeem-code">
                        <Title fz="lg" fw={700} my="md">
                            Redeem Code
                        </Title>
                        <form onSubmit={handleRedeemCode}>
                            <Stack>
                                <TextInput
                                    required
                                    label="Redeem Code"
                                    placeholder="Enter your code to redeem"
                                    radius="md"
                                    {...form.getInputProps("redeemCode")}
                                />
                                <Button
                                    type="submit"
                                    radius="md"
                                    variant="gradient"
                                    gradient={{ from: "violet", to: "grape" }}
                                >
                                    Confirm Redeem Code
                                </Button>
                            </Stack>
                        </form>
                    </TabsPanel>
                </Tabs>
            </Paper>
        </Container>
    )
}