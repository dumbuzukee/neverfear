
import { Anchor, Container, Paper, Text, Title } from "@mantine/core";

import RegisterForm from "./components/Form";

export default function RegisterPage() {
    return (
        <Container size={480} my="xl">
            <Paper
                p="xl"
                radius="md"
                shadow="sm"
                withBorder
            >
                <Title size={24} ta="center" mb="xs">
                    Create your account
                </Title>
                <Text c="dimmed" size="sm" ta="center" mb="md">
                    Already have an account? <Anchor size="sm" href="/login">Login.</Anchor>
                </Text>
                <RegisterForm />
            </Paper>
        </Container>
    );
};