"use client";

import { Button, Container, Group, Stack, Text, ThemeIcon, Title } from "@mantine/core";
import { IconSettings } from "@tabler/icons-react";

export default function Header() {
    return (
        <Group justify="space-between">
            <Group>
                <ThemeIcon size={48} radius="md" variant="light" >
                    <IconSettings size={36} />
                </ThemeIcon>
                <Stack gap={0}>
                    <Title size="xl" fw={700}>
                        Admin Panel
                    </Title>
                    <Text c="dimmed" size="sm">
                        Dashboard for administrators.
                    </Text>
                </Stack>
            </Group>
        </Group>
    );
};