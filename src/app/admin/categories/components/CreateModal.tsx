"use client";

import { Button, Checkbox, Modal, Stack, Textarea, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useState } from "react";

import axios from "axios";
import { notifications } from "@mantine/notifications";

export default function CreateCategoryModal({ opened, close }: { opened: boolean, close: () => void }) {
    const form = useForm({
        initialValues: {
            name: "",
            description: "",
            image: "",
            recommended: false,
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
                window.location.reload();
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
                        label="Category Name"
                        placeholder="Enter your category name"
                        radius="md"
                        {...form.getInputProps("name")}
                    />
                    <Textarea
                        label="Category Description"
                        placeholder="Enter your category description"
                        radius="md"
                        autosize
                        minRows={6}
                        maxRows={6}
                        {...form.getInputProps("description")}
                    />
                    <TextInput
                        required
                        label="Category Image"
                        placeholder="Enter your category image"
                        radius="md"
                        {...form.getInputProps("image")}
                    />
                    <Checkbox
                        label="Category Recommended"
                        {...form.getInputProps("recommended")}
                    />
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