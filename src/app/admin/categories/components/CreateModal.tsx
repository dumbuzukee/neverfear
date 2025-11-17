"use client";

import { Button, Chip, Group, Modal, Stack, Textarea, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { notifications } from "@mantine/notifications";
import { useState } from "react";

import axios from "axios";
import { IconCheck, IconFileDescription, IconPencil, IconPhoto } from "@tabler/icons-react";

interface CreateCategoryModalProps {
    opened: boolean;
    close: () => void;
};

export default function CreateCategoryModal({ opened, close }: CreateCategoryModalProps) {
    const form = useForm({
        initialValues: {
            name: "",
            description: "",
            image: "",
            recommended: false,
            status: "active"
        },
    });

    const [creating, setCreating] = useState(false);

    const handleCreateCategory = form.onSubmit(
        async (values) => {
            const {
                name,
                description,
                image,
                recommended,
            } = values;

            setCreating(true);

            const response = await axios
                .post("/api/v1/admin/categories", {
                    name,
                    description,
                    image,
                    recommended,
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

            setCreating(false);
        }
    );
    
    return (
        <>
        <Modal
            title="Create Category"
            radius="md"
            shadow="sm"
            opened={opened}
            onClose={close}
            centered
        >
            <form onSubmit={handleCreateCategory}>
                <Stack>
                    <TextInput
                        required
                        leftSection={<IconPencil size={16} stroke={1.5} />}
                        label="Category Name"
                        description="Enter your category name"
                        placeholder="Exmaple Category..."
                        radius="md"
                        {...form.getInputProps("name")}
                    />
                    <Textarea
                        label="Category Description"
                        leftSection={<IconFileDescription size={16} stroke={1.5} />}
                        description="Enter your category description"
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
                        description="Enter your category image URL"
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
                        loading={creating}
                    >
                        Create Category
                    </Button>
                </Stack>
            </form>
        </Modal>
        </>
    );
};