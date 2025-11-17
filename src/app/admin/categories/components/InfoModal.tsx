"use client";

import { Badge, Group, Modal, NumberInput, Stack, Text, Textarea, TextInput } from "@mantine/core";
import { IconFileDescription, IconId, IconPencil, IconPhoto } from "@tabler/icons-react";

interface CategoryInfoModalProps {
    opened: boolean;
    close: () => void;
    category: any;
};

export default function CategoryInfoModal({ opened, close, category }: CategoryInfoModalProps) {   
    return (
        <>
        <Modal
            title="Category Info"
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
                    description="Here is a category-id"
                    placeholder={category._id}
                    value={category._id}
                    radius="md"
                    variant="filled"
                    readOnly
                />
                <TextInput
                    leftSection={<IconPencil size={16} stroke={1.5} />}
                    label="Category Name"
                    description="Here is a category name"
                    placeholder={category.name}
                    value={category.name}
                    radius="md"
                    variant="filled"
                    readOnly
                />
                <Textarea
                    leftSection={<IconFileDescription size={16} stroke={1.5} />}
                    label="Category Description"
                    description="Here is a category description"
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
                    leftSection={<IconPhoto size={16} stroke={1.5} />}
                    label="Category Image"
                    description="Here is a category image URL"
                    placeholder={category.image}
                    value={category.image}
                    radius="md"
                    variant="filled"
                    readOnly
                />
                <Group justify="space-between">
                    <Text fz="sm" fw={500}>
                        Category Recommended
                    </Text>
                    <Badge color={(category.recommended) ? "violet" : "gray"} variant="light">
                        Recommended
                    </Badge>
                </Group>
                <Group justify="space-between">
                    <Text fz="sm" fw={500}>
                        Category Products
                    </Text>
                    <Badge variant="light">
                        {category.products}
                    </Badge>
                </Group>
                <Group justify="space-between">
                    <Text fz="sm" fw={500}>
                        Category Status
                    </Text>
                    <Badge color={(category.status === "active") ? "violet" : "gray"} variant="light">
                        {category.status}
                    </Badge>
                </Group>
            </Stack>
        </Modal>
        </>
    );
};