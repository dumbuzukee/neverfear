"use client";

import { Button, Checkbox, Chip, Group, Modal, Select, Stack, Textarea, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { notifications } from "@mantine/notifications";
import { IconCheck, IconFileDescription, IconPencil, IconPhoto } from "@tabler/icons-react";
import { useState } from "react";

import axios from "axios";

interface EditCategoryModalProps {
    opened: boolean;
    close: () => void;
    category: any;
};

export default function EditCategoryModal({ opened, close, category }: EditCategoryModalProps) {
    const form = useForm({
        initialValues: {
            name: category.name,
            description: category.description,
            image: category.image,
            recommended: category.recommended,
            status: category.status,
        },
    });

    const [updating, setUpdating] = useState(false);

    const handleUpdateCategory = form.onSubmit(
        async (values) => {
            const {
                name,
                description,
                image,
                recommended,
                status,
            } = values;

            setUpdating(true);

            const response = await axios
                .put(`/api/v1/admin/categories/${category._id}`, {
                    name,
                    description,
                    image,
                    recommended,
                    status,
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
            title="Update Category"
            radius="md"
            shadow="sm"
            opened={opened}
            onClose={close}
            centered
        >
            <form onSubmit={handleUpdateCategory}>
                <Stack>
                    <TextInput
                        required
                        leftSection={<IconPencil size={16} stroke={1.5} />}
                        label="Category Name"
                        description="Update your category name"
                        placeholder="Example Category"
                        radius="md"
                        {...form.getInputProps("name")}
                    />
                    <Textarea
                        leftSection={<IconFileDescription size={16} stroke={1.5} />}
                        label="Category Description"
                        description="Update your category description"
                        placeholder="Category Description..."
                        radius="md"
                        autosize
                        minRows={6}
                        maxRows={6}
                        {...form.getInputProps("description")}
                    />
                    <TextInput
                        required
                        leftSection={<IconPhoto size={16} stroke={1.5} />}
                        label="Category Image"
                        description="Update your category image URL"
                        placeholder="https://..."
                        radius="md"
                        {...form.getInputProps("image")}
                    />
                    <Group>
                        <Chip
                            icon={<IconCheck size={16} stroke={1.5} />}
                            variant="light"
                            checked={form.values.recommended}
                            onChange={() => form.setFieldValue("recommended", !form.values.recommended)}
                        >
                            Recommended
                        </Chip>
                        <Chip
                            icon={<IconCheck size={16} stroke={1.5} />}
                            color="green"
                            variant="light"
                            checked={form.values.status === "active"}
                            onChange={() => form.setFieldValue("status", (form.values.status === "active") ? "inactive" : "active")}
                        >
                            Active
                        </Chip>
                    </Group>
                    <Button
                        type="submit"
                        radius="md"
                        variant="gradient"
                        gradient={{ from: "violet", to: "grape" }}
                        loading={updating}
                    >
                        Update Category
                    </Button>
                </Stack>
            </form>
        </Modal>
        </>
    );
};