"use client";

import { Button, Chip, Group, Modal, NumberInput, Select, Stack, Textarea, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { notifications } from "@mantine/notifications";
import { useState } from "react";
import { IconCheck, IconFileDescription, IconPencil, IconPhoto, IconReceipt, IconSettings } from "@tabler/icons-react";

import axios from "axios";

interface CreateProductModalProps {
    opened: boolean;
    close: () => void;
    categoryId: string;
};

export default function CreateProductModal({ opened, close, categoryId }: CreateProductModalProps) {
    const form = useForm({
        initialValues: {
            name: "",
            description: "",
            image: "",
            recommended: false,
            price: 100,
            stockType: "redemption-code",
            status: "active",
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
                status,
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
                    status,
                    categoryId,
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
                        leftSection={<IconPencil size={16} stroke={1.5} />}
                        label="Product Name"
                        description="Enter your product name"
                        placeholder="Example Product..."
                        radius="md"
                        {...form.getInputProps("name")}
                    />
                    <Textarea
                        leftSection={<IconFileDescription size={16} stroke={1.5} />}
                        label="Product Description"
                        description="Enter your product description"
                        placeholder="Product Description..."
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
                        description="Enter your product image URL"
                        placeholder="https://..."
                        radius="md"
                        {...form.getInputProps("image")}
                    />
                    <NumberInput
                        required
                        leftSection={<IconReceipt size={16} stroke={1.5} />}
                        label="Product Price"
                        description="Enter your product price"
                        placeholder="5-5000"
                        min={5}
                        max={5000}
                        radius="md"
                        {...form.getInputProps("price")}
                    />
                    <Select
                        required
                        leftSection={<IconSettings size={16} stroke={1.5} />}
                        label="Product Type"
                        description="Select a product's type"
                        data={[
                            { label: "🔑 Redemption Code", value: "redemption-code" },
                            { label: "🏷️ Game Account", value: "account" },
                            { label: "📦 Mystery Box", value: "mystery-box" }
                        ]}
                        radius="md"
                        {...form.getInputProps("stockType")}
                    />
                    <Group>
                        <Chip
                            icon={<IconCheck  size={16} stroke={1.5} />}
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
                        Create Product
                    </Button>
                </Stack>
            </form>
        </Modal>
        </>
    );
};