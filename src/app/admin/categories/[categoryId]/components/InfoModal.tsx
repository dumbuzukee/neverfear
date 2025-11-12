"use client";

import { Modal, NumberInput, Stack, Textarea, TextInput } from "@mantine/core";

export default function ProductInfoModal({ opened, close, product }: { opened: boolean, close: () => void, product: any }) {   
    
    const stockValues = product.stockValues.join("\n");
    
    return (
        <>
        <Modal
            title="Product Info"
            size="lg"
            radius="md"
            shadow="sm"
            opened={opened}
            onClose={close}
            centered
        >
            <Stack>
                <TextInput
                    label="Category Identifier"
                    placeholder={product.categoryId}
                    value={product.categoryId}
                    radius="md"
                    variant="filled"
                    readOnly
                />
                <TextInput
                    label="Product Identifier"
                    placeholder={product._id}
                    value={product._id}
                    radius="md"
                    variant="filled"
                    readOnly
                />
                <TextInput
                    label="Product Name"
                    placeholder={product.name}
                    value={product.name}
                    radius="md"
                    variant="filled"
                    readOnly
                />
                <Textarea
                    label="Product Description"
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
                    label="Product Image"
                    placeholder={product.image}
                    value={product.image}
                    radius="md"
                    variant="filled"
                    readOnly
                />
                <TextInput
                    label="Product Recommended"
                    placeholder={product.recommended ? "Recommended" : "Not Recommended"}
                    value={product.recommended ? "Recommended" : "Not Recommended"}
                    radius="md"
                    variant="filled"
                    readOnly
                />
                <NumberInput
                    label="Product Price"
                    placeholder={product.price}
                    value={product.price}
                    radius="md"
                    variant="filled"
                    readOnly
                />
                <NumberInput
                    label="Product Stock"
                    placeholder={product.stock}
                    value={product.stock}
                    radius="md"
                    variant="filled"
                    readOnly
                />
                <TextInput
                    label="Product Stock Type"
                    placeholder={product.stockType}
                    value={product.stockType}
                    radius="md"
                    variant="filled"
                    readOnly
                />
                <Textarea
                    label="Product Stock Values"
                    placeholder={stockValues}
                    value={stockValues}
                    radius="md"
                    variant="filled"
                    autosize
                    minRows={6}
                    maxRows={6}
                    readOnly
                />
                <TextInput
                    label="Product Status"
                    placeholder={product.status === "active" ? "Active" : "Inactive"}
                    value={product.status === "active" ? "Active" : "Inactive"}
                    radius="md"
                    variant="filled"
                    readOnly
                />
            </Stack>
        </Modal>
        </>
    );
};