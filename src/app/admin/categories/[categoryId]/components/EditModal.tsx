"use client";

import { Badge, Button, Chip, Group, Modal, NumberInput, Stack, Text, Textarea, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { notifications } from "@mantine/notifications";
import { useState } from "react";
import { IconCheck, IconFileDescription, IconList, IconPencil, IconPhoto, IconReceipt } from "@tabler/icons-react";

import axios from "axios";

interface EditProductModalProps {
    opened: boolean;
    close: () => void;
    product: any;
};

export default function EditProductModal({ opened, close, product }: EditProductModalProps) { 
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
                        leftSection={<IconPencil size={16} stroke={1.5} />}
                        label="Product Name"
                        description="Update your product name"
                        placeholder="Example Category..."
                        radius="md"
                        {...form.getInputProps("name")}
                    />
                    <Textarea
                        leftSection={<IconFileDescription size={16} stroke={1.5} />}
                        label="Product Description"
                        description="Update your product description"
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
                        label="Product Image"
                        description="Update your product image URL"
                        placeholder="https://..."
                        radius="md"
                        {...form.getInputProps("image")}
                    />
                    <NumberInput
                        required
                        leftSection={<IconReceipt size={16} stroke={1.5} />}
                        label="Product Price"
                        description="Update your product price"
                        placeholder="5-5000"
                        min={5}
                        max={5000}
                        radius="md"
                        {...form.getInputProps("price")}
                    />
                    <Group justify="space-between">
                        <Text fz="sm" fw={500}>
                            Product Type
                        </Text>
                        <Badge variant="light">
                            {product.stockType}
                        </Badge>
                    </Group>
                    <Textarea
                        leftSection={<IconList size={16} stroke={1.5} />}
                        label="Product Values"
                        description="Add your product stock values"
                        placeholder="..."
                        autosize
                        minRows={6}
                        maxRows={6}
                        radius="md"
                        {...form.getInputProps("stockValues")}
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
                        Update Product
                    </Button>
                </Stack>
            </form>
        </Modal>
        </>
    );
};