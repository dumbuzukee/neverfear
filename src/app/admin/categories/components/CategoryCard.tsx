"use client";

import { ActionIcon, Badge, Button, Card, Group, Image, Menu, MenuDropdown, MenuItem, MenuTarget, Stack, Text, } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { notifications } from "@mantine/notifications";
import { modals } from "@mantine/modals";
import { IconEdit, IconEye, IconSettings, IconTrash } from "@tabler/icons-react";

import Link from "next/link";
import EditCategoryModal from "./EditModal";
import CategoryInfoModal from "./InfoModal";

import axios from "axios";

export default function CategoryCard({ category }: { category: any }) {
    const [openedEditModal, { open: openEditModal, close: closeEditModal }] = useDisclosure(false);
    const [openedInfoModal, { open: openInfoModal, close: closeInfoModal }] = useDisclosure(false);

    const handleDeleteCategory = async () => {
        const response = await axios
            .delete(`/api/v1/admin/categories/${category._id}`);

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
    };

    return (
        <>
        <CategoryInfoModal
            opened={openedInfoModal}
            close={closeInfoModal}
            category={category}
        />
        <EditCategoryModal
            opened={openedEditModal}
            close={closeEditModal}
            category={category}
        />
        <Card
            p="md"
            radius="md"
            shadow="sm"
            withBorder
        >
            <Image
                src={category.image}
                height={180}
            />
            <Badge
                variant="gradient"
                gradient={{ from: "violet", to: "grape" }}
                style={{
                    top: "var(--mantine-spacing-xs)",
                    left: "var(--mantine-spacing-xs)",
                    position: "absolute"
                }}
            >
                {category.status}
            </Badge>
            {category.recommended && (
                <>
                <Badge
                    variant="gradient"
                    gradient={{ from: "violet", to: "grape" }}
                    style={{
                        top: "var(--mantine-spacing-xs)",
                        right: "var(--mantine-spacing-xs)",
                        position: "absolute"
                    }}
                >
                    recommended
                </Badge>
                </>
            )}
            <Stack mt="md">
                <Group justify="space-between">
                    <Stack gap={0}>
                        <Text c="gray" fz="sm" fw={500}>
                            {category.name}
                        </Text>
                        <Text c="dimmed" fz="sm" fw={400}>
                            Products: {category.products}
                        </Text>
                    </Stack>
                    <Menu width={180} radius="md" shadow="sm" withArrow>
                        <MenuTarget>
                            <ActionIcon
                                size="xl"
                                radius="md"
                                variant="gradient"
                                gradient={{ from: "violet", to: "grape" }}
                            >
                                <IconSettings />
                            </ActionIcon>
                        </MenuTarget>
                        <MenuDropdown>
                            <MenuItem
                                leftSection={<IconEye size={16} stroke={1.5} />}
                                onClick={openInfoModal}
                            >
                                View Category
                            </MenuItem>
                            <MenuItem
                                leftSection={<IconEdit size={16} stroke={1.5} />}
                                onClick={openEditModal}
                            >
                                Edit Category
                            </MenuItem>
                            <MenuItem
                                leftSection={<IconTrash size={16} stroke={1.5} />}
                                color="red"
                                onClick={() => modals.openConfirmModal({
                                    title: "Confirm Delete Category",
                                    children: (
                                        <Text>
                                            Are you certain you want to delete this category? This action is destructive.
                                        </Text>
                                    ),
                                    labels: { confirm: "Delete Category", cancel: "Cancel" },
                                    confirmProps: { color: "red" },
                                    onConfirm: handleDeleteCategory
                                })}
                            >
                                Delete Category
                            </MenuItem>
                        </MenuDropdown>
                    </Menu>
                </Group>
                <Button
                    component={Link}
                    href={`/admin/categories/${category._id}`}
                    radius="md"
                    variant="gradient"
                    gradient={{ from: "violet", to: "grape" }}
                >
                    View Category
                </Button>
            </Stack>
        </Card>
        </>
    );
};