"use client";


import { Button, Container, Group, Paper, Stack, Title } from "@mantine/core";
import Link from "next/link";

export default function MenuManagement() {
    return (
        <Container size="lg" my="xl">
            <Paper p="md" radius="md" shadow="sm" withBorder>
                <Title fz="lg" fw={700} mb="md">
                    Menu Manager
                </Title>
                <Group>
                    <Button
                        component={Link}
                        href="/admin/users"
                        radius="md"
                        variant="light"
                    >
                        Manage Users
                    </Button>
                    <Button
                        component={Link}
                        href="/admin/categories"
                        radius="md"
                        variant="light"
                    >
                        Manage Categories
                    </Button>
                    <Button
                        component={Link}
                        href="/admin/products"
                        radius="md"
                        variant="light"
                    >
                        Manage Products
                    </Button>
                    <Button
                        component={Link}
                        href="/admin/history"
                        radius="md"
                        variant="light"
                    >
                        Topup History
                    </Button>
                    <Button
                        component={Link}
                        href="/admin/history"
                        radius="md"
                        variant="light"
                    >
                        Purchase History
                    </Button>
                </Group>
            </Paper>
        </Container>
    );
};