"use client";

import { Button, Container, Paper, Stack, Text } from "@mantine/core";
import { IconArrowRight } from "@tabler/icons-react";

import Link from "next/link";

export default function WelcomeBanner() {
    return (
        <Container size="xl" my="xl">
            <Paper p="xl" radius="md" shadow="sm" withBorder>
                <Stack align="center">
                    <Text
                        fz="h1"
                        fw={900}
                        ff="heading"
                        ta="center"
                        variant="gradient"
                        gradient={{ from: "violet", to: "grape" }}
                    >
                        NEVERFEAR
                    </Text>
                    <Text
                        fz="h3"
                        fw={700}
                        ff="heading"
                        ta="center"
                        c="gray"
                    >
                        WELCOME EVERYONE TO MY E-COMMERCE PROJECT!
                    </Text>
                    <Button
                        rightSection={<IconArrowRight size={16} stroke={1.5} />}
                        component={Link}
                        href="/categories"
                        variant="gradient"
                        gradient={{ from: "violet", to: "grape" }}
                    >
                        Get Started
                    </Button>
                </Stack>
            </Paper>
        </Container>
    );
};