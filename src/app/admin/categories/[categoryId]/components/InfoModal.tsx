"use client";

import { Badge, Group, Modal, NumberInput, Stack, Text, Textarea, TextInput } from "@mantine/core";
import { IconBox, IconFileDescription, IconId, IconList, IconPencil, IconPhoto, IconReceipt } from "@tabler/icons-react";

interface ProductInfoModalProps {
    opened: boolean;
    close: () => void;
    product: any;
};

export default function ProductInfoModal({ opened, close, product }: ProductInfoModalProps) {   
    return (
        <>
        <Modal
            title="Product Info"
            size="md"
            radius="md"
            shadow="sm"
            opened={opened}
            onClose={close}
            centered
        >
            <Stack>
                <TextInput
                    leftSection={<IconId size={16} stroke={1.5} />}
                    label="Category Identifier"
                    description="Here is a product's category-id"
                    placeholder={product.categoryId}
                    value={product.categoryId}
                    radius="md"
                    variant="filled"
                    readOnly
                />
                <TextInput
                    leftSection={<IconId size={16} stroke={1.5} />}
                    label="Product Identifier"
                    description="Here is a product-id"
                    placeholder={product._id}
                    value={product._id}
                    radius="md"
                    variant="filled"
                    readOnly
                />
                <TextInput
                    leftSection={<IconPencil size={16} stroke={1.5} />}
                    label="Product Name"
                    description="Here is a product name"
                    placeholder={product.name}
                    value={product.name}
                    radius="md"
                    variant="filled"
                    readOnly
                />
                <Textarea
                    leftSection={<IconFileDescription size={16} stroke={1.5} />}
                    label="Product Description"
                    description="Here is a product description"
                    placeholder={product.description}
                    value={product.description}
                    radius="md"
                    variant="filled"
                    autosize
                    minRows={6}
                    maxRows={6}
                    readOnly
                />
                <TextInput
                    leftSection={<IconPhoto size={16} stroke={1.5} />}
                    label="Product Image"
                    description="Here is a product image URL"
                    placeholder={product.image}
                    value={product.image}
                    radius="md"
                    variant="filled"
                    readOnly
                />
                <NumberInput
                    leftSection={<IconReceipt size={16} stroke={1.5} />}
                    label="Product Price"
                    description="Here is a product price"
                    placeholder={product.price}
                    value={product.price}
                    radius="md"
                    variant="filled"
                    readOnly
                />
                <NumberInput
                    leftSection={<IconBox size={16} stroke={1.5} />}
                    label="Product Stock"
                    description="Here is a amount of product stock"
                    placeholder={product.stock}
                    value={product.stock}
                    radius="md"
                    variant="filled"
                    readOnly
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
                    description="Here is a product stock values"
                    placeholder={product.stockValues.join("\n")}
                    value={product.stockValues.join("\n")}
                    radius="md"
                    variant="filled"
                    autosize
                    minRows={6}
                    maxRows={6}
                    readOnly
                />
                <Group justify="space-between">
                    <Text fz="sm" fw={500}>
                        Category Recommended
                    </Text>
                    <Badge color={(product.recommended) ? "violet" : "gray"} variant="light">
                        Recommended
                    </Badge>
                </Group>
                <Group justify="space-between">
                    <Text fz="sm" fw={500}>
                        Product Status
                    </Text>
                    <Badge color={(product.status === "active") ? "violet" : "gray"} variant="light">
                        {product.status}
                    </Badge>
                </Group>
            </Stack>
        </Modal>
        </>
    );
};