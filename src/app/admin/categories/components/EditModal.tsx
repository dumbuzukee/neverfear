"use client";

import { Button, Checkbox, Modal, Select, Stack, Textarea, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { notifications } from "@mantine/notifications";
import { useState } from "react";

import axios from "axios";

export default function EditCategoryModal({ opened, close, category }: { opened: boolean, close: () => void, category: any }) {
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
                        checked={form.values.recommended}
                        onChange={(event) => form.setFieldValue("recommended", event.currentTarget.checked)}
                    />
                    <Select
                        required
                        label="Category Status"
                        placeholder="Select a status"
                        radius="md"
                        data={[
                            { value: "active", label: "Active" },
                            { value: "inactive", label: "Inactive" }
                        ]}
                        {...form.getInputProps("status")}
                    />
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