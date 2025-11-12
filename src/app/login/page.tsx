
import { Anchor, Container, Paper, Text, Title } from "@mantine/core";

import LoginForm from "./components/Form";

export default function LoginPage() {
    return (
        <Container size={480}>
            <Paper
                p="xl"
                radius="md"
                shadow="sm"
                withBorder
            >
                <Title size={24} ta="center" mb="xs">
                    Login to your account
                </Title>
                <Text c="dimmed" size="sm" ta="center" mb="md">
                    Do not have an account yet? <Anchor size="sm" href="/register">Create account.</Anchor>
                </Text>
                <LoginForm />
            </Paper>
        </Container>
    );
};