"use client";

import { useAuth } from "@/context/AuthContext";

import Welcome from "@/components/Welcome/Welcome";
import { Container, Loader, Notification } from "@mantine/core";

export default function HomePage() {
    const { user, loaded } = useAuth();

    if (!loaded) {
        return (
            <Notification
                title="Loading Data!"
                loading
                withBorder
                withCloseButton={false}
            >
                Loading user...
            </Notification>
        );
    };

    return (
        <Container size="lg">
            {user !== null
                ? (
                    <Notification
                        title={`Welcome back, ${user.username}!`}
                        color="violet"
                        withBorder
                        withCloseButton={false}
                    >
                        Start your new journey with NEVERFEAR!
                    </Notification>
                )
                : (
                    <>
                    </>
                )
            }
        </Container>
    );
};