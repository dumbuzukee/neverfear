"use client";

import { Badge, Button, Card, Group, Image, Stack, Text, } from "@mantine/core";
import { notifications } from "@mantine/notifications";
import { IconShoppingCart, IconShoppingCartFilled } from "@tabler/icons-react";
import { useState } from "react";

import axios from "axios";
import { useDisclosure } from "@mantine/hooks";
import PurchaseModal from "./PurchaseModal";

export default function ProductCard({ product }: { product: any }) {

    const [openedPurchaseModal, { open: openPurchaseModal, close: closePurchaseModal }] = useDisclosure(false);

    const [purchasing, setPurchasing] = useState(false);

    const handlePurchaseItem = async () => {
        const response = await axios
            .post(`/api/v1/users/purchase/${product._id}`, {
                quantity: 1
            })
    }

    return (
        <>
        <PurchaseModal
            opened={openedPurchaseModal}
            close={closePurchaseModal}
            product={product}
        />
        <Card
            p="md"
            radius="md"
            shadow="sm"
            withBorder
            style={{
                opacity: product.status === "inactive" || product.stock === 0 ? 0.5 : 1,
                pointerEvents: product.status === "inactive" || product.stock === 0 ? "none" : "auto",
                filter: product.status === "inactive" || product.stock === 0 ? "grayscale(50%)" : "none",
                transition: "all 0.2s ease",
            }}
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
            <Stack mt="md" gap="xs">
                <Text c="gray" fz="sm" fw={500}>
                    {product.name}
                </Text>
                <Group justify="space-between">
                    <Text
                        fz="sm"
                        fw={500}
                        variant="gradient"
                        gradient={{ from: "violet", to: "grape" }}
                    >
                        {product.price}฿
                    </Text>
                    <Text c="dimmed" fz="sm" fw={400}>
                        {product.stock} Left
                    </Text>
                </Group>
                <Button
                    leftSection={<IconShoppingCartFilled size={16} stroke={1.5} />}
                    radius="md"
                    variant="gradient"
                    gradient={{ from: "violet", to: "grape" }}
                    onClick={openPurchaseModal}
                >
                    Purchase Item
                </Button>
            </Stack>
        </Card>
        </>
    );
};