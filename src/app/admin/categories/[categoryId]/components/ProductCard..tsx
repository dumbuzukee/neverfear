"use client";

import { Badge, Button, Card, Group, Image, Menu, MenuDropdown, MenuItem, MenuTarget, Stack, Text, } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { notifications } from "@mantine/notifications";
import { IconEdit, IconEye, IconSettings, IconShoppingCartCog, IconTrash } from "@tabler/icons-react";

import ProductInfoModal from "./InfoModal";
import EditProductModal from "./EditModal";

import axios from "axios";

export default function ProductCard({ product }: { product: any }) {
    const [openedEditModal, { open: openEditModal, close: closeEditModal }] = useDisclosure(false);
    const [openedInfoModal, { open: openInfoModal, close: closeInfoModal }] = useDisclosure(false);

    const handleDeleteProduct = async () => {
        const response = await axios
            .delete(`/api/v1/admin/products/${product._id}`);

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
    };

    return (
        <>
        <EditProductModal
            opened={openedEditModal}
            close={closeEditModal}
            product={product}
        />
        <ProductInfoModal
            opened={openedInfoModal}
            close={closeInfoModal}
            product={product}
        />
        <Card
            p="md"
            radius="md"
            shadow="sm"
            withBorder
        >
            <Image
                src={product.image}
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
                {product.status}
            </Badge>
            {product.recommended && (
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
                <Stack gap={0}>
                    <Text
                        c="gray"
                        fz="md"
                        fw={500}
                    >
                        {product.name}
                    </Text>
                    <Group>
                        <Text
                            fz="md"
                            fw={700}
                            variant="gradient"
                            gradient={{ from: "violet", to: "grape" }}
                        >
                            {product.price}฿
                        </Text>
                        <Text
                            c="dimmed"
                            fz="md"
                            fw={500}
                        >
                            {product.stock} Left
                        </Text>
                    </Group>
                </Stack>
                <Menu width={180} radius="md" shadow="sm" withArrow>
                    <MenuTarget>
                        <Button
                            leftSection={<IconSettings />}
                            radius="md"
                            variant="gradient"
                            gradient={{ from: "violet", to: "grape" }}
                        >
                            Settings
                        </Button>
                    </MenuTarget>
                    <MenuDropdown>
                        <MenuItem
                            leftSection={<IconEye size={16} stroke={1.5} />}
                            onClick={openInfoModal}
                        >
                            View Product
                        </MenuItem>
                        <MenuItem
                            leftSection={<IconEdit size={16} stroke={1.5} />}
                            onClick={openEditModal}
                        >
                            Edit Product
                        </MenuItem>
                        <MenuItem
                            leftSection={<IconTrash size={16} stroke={1.5} />}
                            color="red"
                            onClick={handleDeleteProduct}
                        >
                            Delete Product
                        </MenuItem>
                    </MenuDropdown>
                </Menu>
            </Stack>
        </Card>
        </>
    );
};