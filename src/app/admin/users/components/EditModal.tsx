"use client";

import { Button, Checkbox, Modal, NumberInput, Select, Stack, Textarea, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { notifications } from "@mantine/notifications";
import { useState } from "react";

import axios from "axios";

export default function EditUserModal({ opened, close, user }: { opened: boolean, close: () => void, user: any }) {
    const form = useForm({
        initialValues: {
            balance: user.balance,
            role: user.role,
        },
    });

    const [updating, setUpdating] = useState(false);

    const handleUpdateUser = form.onSubmit(
        async (values) => {
            const {
                balance,
                role
            } = values;

            setUpdating(true);

            const response = await axios
                .put(`/api/v1/admin/users/${user._id}`, {
                    balance,
                    role,
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

            setUpdating(false);
        }
    );
    
    return (
        <>
        <Modal
            title="Update User"
            radius="md"
            shadow="sm"
            opened={opened}
            onClose={close}
            centered
        >
            <form onSubmit={handleUpdateUser}>
                <Stack>
                    <NumberInput
                        required
                        label="User Balance"
                        placeholder="Update user balance"
                        radius="md"
                        {...form.getInputProps("balance")}
                    />
                    <Select
                        required
                        label="User Role"
                        placeholder="Select a role"
                        radius="md"
                        data={[
                            { value: "admin", label: "Admin" },
                            { value: "user", label: "User" },
                            { value: "guest", label: "Guest" },
                        ]}
                        {...form.getInputProps("role")}
                    />
                    <Button
                        type="submit"
                        radius="md"
                        variant="gradient"
                        gradient={{ from: "violet", to: "grape" }}
                        loading={updating}
                    >
                        Update User
                    </Button>
                </Stack>
            </form>
        </Modal>
        </>
    );
};