"use client";

import { Button, Checkbox, Modal, NumberInput, Select, Stack, Textarea, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { notifications } from "@mantine/notifications";
import { useState } from "react";

import axios from "axios";

export default function CreateProductModal({ opened, close, categoryId }: { opened: boolean, close: () => void, categoryId: string }) {
    const form = useForm({
        initialValues: {
            name: "",
            description: "",
            image: "",
            recommended: false,
            price: 100,
            stockType: "keycode",
        },
    });

    const [creating, setCreating] = useState(false);

    const handleCreateProduct = form.onSubmit(
        async (values) => {
            const {
                name,
                description,
                image,
                recommended,
                price,
                stockType,
            } = values;

            setCreating(true);

            const response = await axios
                .post("/api/v1/admin/products", {
                    name,
                    description,
                    image,
                    recommended,
                    price,
                    stockType,
                    categoryId,
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
            title="Create Product"
            radius="md"
            shadow="sm"
            opened={opened}
            onClose={close}
            centered
        >
            <form onSubmit={handleCreateProduct}>
                <Stack>
                    <TextInput
                        required
                        label="Product Name"
                        placeholder="Enter your product name"
                        radius="md"
                        {...form.getInputProps("name")}
                    />
                    <Textarea
                        label="Product Description"
                        placeholder="Enter your product description"
                        radius="md"
                        autosize
                        minRows={6}
                        maxRows={6}
                        {...form.getInputProps("description")}
                    />
                    <TextInput
                        required
                        label="Product Image"
                        placeholder="Enter your product image"
                        radius="md"
                        {...form.getInputProps("image")}
                    />
                    <Checkbox
                        label="Product Recommended"
                        radius="md"
                        {...form.getInputProps("recommended")}
                    />
                    <NumberInput
                        required
                        label="Product Price"
                        placeholder="Enter your product price"
                        radius="md"
                        {...form.getInputProps("price")}
                    />
                    <Select
                        required
                        label="Product Type"
                        placeholder="Select a product type"
                        radius="md"
                        data={[
                            { value: "account", label: "Account" },
                            { value: "keycode", label: "KeyCode" },
                        ]}
                        {...form.getInputProps("stockType")}
                    />
                    <Button
                        type="submit"
                        radius="md"
                        variant="gradient"
                        gradient={{ from: "violet", to: "grape" }}
                        loading={creating}
                    >
                        Create Product
                    </Button>
                </Stack>
            </form>
        </Modal>
        </>
    );
};