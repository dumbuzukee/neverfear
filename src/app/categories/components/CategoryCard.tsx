"use client";

import { ActionIcon, Badge, Button, Card, Group, Image, Menu, MenuDropdown, MenuItem, MenuTarget, Stack, Text, } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { notifications } from "@mantine/notifications";
import { IconEdit, IconEye, IconSettings, IconTrash } from "@tabler/icons-react";

import Link from "next/link";

import axios from "axios";

export default function CategoryCard({ category }: { category: any }) {

    return (
        <Card
            component={Link}
            href={"/categories/" + category._id}
            p="md"
            radius="md"
            shadow="sm"
            withBorder
            style={{
                opacity: category.status === "inactive" ? 0.5 : 1,
                pointerEvents: category.status === "inactive" ? "none" : "auto",
                filter: category.status === "inactive" ? "grayscale(50%)" : "none",
                transition: "all 0.2s ease",
            }}
        >
            <Image
                src={category.image}
                height={160}
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
                        <Text c="gray" fz="md" fw={500}>
                            {category.name}
                        </Text>
                        <Text c="dimmed" fz="sm" fw={500}>
                            Products: {category.products}
                        </Text>
                    </Stack>
                </Group>
            </Stack>
        </Card>
    );
};