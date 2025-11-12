"use client";

import { Modal, NumberInput, Stack, Textarea, TextInput } from "@mantine/core";

export default function CategoryInfoModal({ opened, close, category }: { opened: boolean, close: () => void, category: any }) {   
    return (
        <>
        <Modal
            title="Category Info"
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
                    placeholder={category._id}
                    value={category._id}
                    radius="md"
                    variant="filled"
                    readOnly
                />
                <TextInput
                    label="Category Name"
                    placeholder={category.name}
                    value={category.name}
                    radius="md"
                    variant="filled"
                    readOnly
                />
                <Textarea
                    label="Category Description"
                    placeholder={category.description}
                    value={category.description}
                    radius="md"
                    variant="filled"
                    autosize
                    minRows={6}
                    maxRows={6}
                    readOnly
                />
                <TextInput
                    label="Category Image"
                    placeholder={category.image}
                    value={category.image}
                    radius="md"
                    variant="filled"
                    readOnly
                />
                <TextInput
                    label="Category Recommended"
                    placeholder={category.recommended ? "Recommended" : "Not Recommended"}
                    value={category.recommended ? "Recommended" : "Not Recommended"}
                    radius="md"
                    variant="filled"
                    readOnly
                />
                <NumberInput
                    label="Category Products"
                    placeholder={category.products}
                    value={category.products}
                    radius="md"
                    variant="filled"
                    readOnly
                />
                <TextInput
                    label="Category Status"
                    placeholder={category.status === "active" ? "Active" : "Inactive"}
                    value={category.status === "active" ? "Active" : "Inactive"}
                    radius="md"
                    variant="filled"
                    readOnly
                />
            </Stack>
        </Modal>
        </>
    );
};