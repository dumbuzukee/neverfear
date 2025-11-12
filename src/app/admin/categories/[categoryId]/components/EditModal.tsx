"use client";

import { Button, Checkbox, Modal, NumberInput, Select, Stack, Textarea, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { notifications } from "@mantine/notifications";
import { useState } from "react";

import axios from "axios";

export default function EditProductModal({ opened, close, product }: { opened: boolean, close: () => void, product: any }) { 
    const form = useForm({
        initialValues: {
            name: product.name,
            description: product.description,
            image: product.image,
            recommended: product.recommended,
            price: product.price,
            stockValues: product.stockValues.join("\n"),
            status: product.status,
        },
    });

    const [updating, setUpdating] = useState(false);

    const handleUpdateProduct = form.onSubmit(async (values) => {
        const {
            name,
            description,
            image,
            recommended,
            price,
            stockValues,
            status,
        } = values;

        setUpdating(true);

        const splitedStockValues = stockValues
            .split("\n")
            .map((value: any) => value.trim())
            .filter(Boolean);

        const response = await axios
            .put(`/api/v1/admin/products/${product._id}`, {
                name,
                description,
                image,
                recommended,
                price,
                stockValues: splitedStockValues,
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
    });
    
    return (
        <>
        <Modal
            title="Update Product"
            radius="md"
            shadow="sm"
            opened={opened}
            onClose={close}
            centered
        >
            <form onSubmit={handleUpdateProduct}>
                <Stack>
                    <TextInput
                        required
                        label="Product Name"
                        placeholder="Update your product name"
                        radius="md"
                        {...form.getInputProps("name")}
                    />
                    <Textarea
                        label="Product Description"
                        placeholder="Update your product description"
                        radius="md"
                        autosize
                        minRows={6}
                        maxRows={6}
                        {...form.getInputProps("description")}
                    />
                    <TextInput
                        required
                        label="Product Image"
                        placeholder="Update your product image"
                        radius="md"
                        {...form.getInputProps("image")}
                    />
                    <NumberInput
                        required
                        label="Product Price"
                        placeholder="Update your product price"
                        radius="md"
                        {...form.getInputProps("price")}
                    />
                    <Checkbox
                        label="Product Recommended"
                        checked={form.values.recommended}
                        radius="md"
                        onChange={(event) => form.setFieldValue("recommended", event.currentTarget.checked)}
                    />
                    <Textarea
                        label="Product Stock Values"
                        placeholder="Update your stock values"
                        radius="md"
                        autosize
                        minRows={6}
                        maxRows={6}
                        {...form.getInputProps("stockValues")}
                    />
                    <Select
                        required
                        label="Product Status"
                        placeholder="Update your product status"
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
                        Update Product
                    </Button>
                </Stack>
            </form>
        </Modal>
        </>
    );
};