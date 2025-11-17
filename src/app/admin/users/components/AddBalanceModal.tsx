"use client";

import { Badge, Button, Group, Modal, NumberInput, Stack, Text } from "@mantine/core";
import { useForm } from "@mantine/form";
import { notifications } from "@mantine/notifications";
import { useState } from "react";

import axios from "axios";
import { IconReceipt } from "@tabler/icons-react";

interface AddBalanceModalProps {
    opened: boolean;
    close: () => void;
    user: any;
};

export default function AddBalanceModal({ opened, close, user }: AddBalanceModalProps) {
    const form = useForm({
        initialValues: {
            amount: 10
        },
    });

    const [adding, setAdding] = useState(false);

    const handleAddBalance = form.onSubmit(
        async (values) => {
            const { amount } = values;

            setAdding(true);

            const response = await axios
                .put(`/api/v1/admin/users/${user._id}/addBalance`, {
                    amount,
                });

            if (response.data.ok) {
                notifications.show({
                    message: response.data.message,
                    color: "green",
                    autoClose: 3000,
                });
                setTimeout(() => {
                    window.location.reload();
                }, 2000);
            } else {
                notifications.show({
                    message: response.data.message,
                    color: "red",
                    autoClose: 3000,
                });
            };

            setAdding(false);
        }
    );
    
    return (
        <>
        <Modal
            title="Add Balance"
            radius="md"
            shadow="sm"
            opened={opened}
            onClose={close}
            centered
        >
            <form onSubmit={handleAddBalance}>
                <Stack>
                    <Group gap="xs">
                        <Text fz="sm" fw={500}>
                            Current Balance:
                        </Text>
                        <Badge variant="light">
                            {user.balance}฿
                        </Badge>
                    </Group>
                    <NumberInput
                        leftSection={<IconReceipt size={16} stroke={1.5} />}
                        label="Add Balance"
                        description="Add amount of balance, you want to add"
                        placeholder="10-10000"
                        min={10}
                        max={10000}
                        radius="md"
                        {...form.getInputProps("amount")}
                    />
                    <Button
                        type="submit"
                        radius="md"
                        variant="gradient"
                        gradient={{ from: "violet", to: "grape" }}
                        loading={adding}
                    >
                        Add User Balance
                    </Button>
                </Stack>
            </form>
        </Modal>
        </>
    );
};