import { Container, Text } from "@mantine/core";


export default function Footer() {
    return (
        <Container size="xl" style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "60px", borderTop: "1px solid var(--mantine-color-dark-4)" }}>
            <Text
                c="dimmed"
                fz="sm"
                fw={400}
                ta="center"
            >
                Copyright © 2025 neverfear-neverdie.vercel.app. All rights reserved.
            </Text>
        </Container>
    );
};