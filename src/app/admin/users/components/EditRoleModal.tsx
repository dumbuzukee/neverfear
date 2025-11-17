"use client";

import { Badge, Button, Group, Modal, Select, Stack, Text } from "@mantine/core";
import { useForm } from "@mantine/form";
import { notifications } from "@mantine/notifications";
import { useState } from "react";

import axios from "axios";

interface EditRoleModalProps {
    opened: boolean;
    close: () => void;
    user: any;
    color: string;
};

export default function EditRoleModal({ opened, close, user, color }: EditRoleModalProps) {
    const form = useForm({
        initialValues: {
            role: user.role,
        },
    });

    const [updating, setUpdating] = useState(false);

    const handleUpdateRole = form.onSubmit(
        async (values) => {
            const { role } = values;

            setUpdating(true);

            const response = await axios
                .put(`/api/v1/admin/users/${user._id}`, {
                    role,
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

            setUpdating(false);
        }
    );
    
    return (
        <>
        <Modal
            title="Update Role"
            radius="md"
            shadow="sm"
            opened={opened}
            onClose={close}
            centered
        >
            <form onSubmit={handleUpdateRole}>
                <Stack>
                    <Group gap="xs">
                        <Text fz="sm" fw={500}>
                            Current Role:
                        </Text>
                        <Badge
                            color={color}
                            variant="light"
                        >
                            {user.role}
                        </Badge>
                    </Group>
                    <Select
                        required
                        label="Roles"
                        description="Select a role to update..."
                        placeholder="Role"
                        radius="md"
                        data={[
                            { label: "Developer", value: "dev", disabled: true },
                            { label: "Admin", value: "admin" },
                            { label: "User", value: "user" },
                            { label: "Guest", value: "guest" },
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
                        Update User Role
                    </Button>
                </Stack>
            </form>
        </Modal>
        </>
    );
};