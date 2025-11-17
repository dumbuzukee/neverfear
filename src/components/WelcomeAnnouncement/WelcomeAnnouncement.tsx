import { Anchor, Container, Notification } from "@mantine/core";
import { UserResponse } from "@/models/users.model";

interface WelcomeAnnouncementProps {
    user: UserResponse | null;
    loaded: boolean;
};

export default function WelcomeAnnouncement({ user, loaded }: WelcomeAnnouncementProps) {
    return (
        <Container size="xl" my="xl">
            {loaded
                ? (
                    <>
                    {user !== null
                        ? (
                            <Notification
                                title={`Welcome back ${user.username}!`}
                                withBorder
                                withCloseButton={false}
                            >
                                Start your journey with NEVERFEAR Project today!
                            </Notification>
                        )
                        : (
                            <Notification
                                title="Suggestion!"
                                withBorder
                                withCloseButton={false}
                            >
                                To use all features, please <Anchor size="sm" href="/login">Login</Anchor> to your account, or do not have an account yet? <Anchor size="sm" href="/register">Create your account here.</Anchor>  
                            </Notification>
                        )
                    }
                    </>
                )
                : (
                    <Notification
                        title="Loading Data!"
                        loading
                        withBorder
                        withCloseButton={false}
                    >
                        Loading user...
                    </Notification>
                )
            }
        </Container>
    );
};