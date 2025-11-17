"use client";

import { Burger, Button, Container, Divider, Group, Text, UnstyledButton } from "@mantine/core";
import { useAuth } from "@/context/AuthContext";

import Link from "next/link";
import HeaderUserMenu from "../HeaderUserMenu/HeaderUserMenu";
import classes from "./Header.module.css";

export default function Header({ opened, toggle }: { opened: boolean, toggle: () => void }) {
    const { user, loaded, logout } = useAuth();

    if (loaded) {
        return (
            <Container size="xl" className={classes.header}>
                <Group gap={24}>
                    <a href="/" className={classes.logo}>
                        NEVERFEAR
                    </a>
                    <Group gap={24} visibleFrom="sm">
                        <UnstyledButton
                            component={Link}
                            href="/"
                            className={classes.link}
                        >
                            Home
                        </UnstyledButton>
                        <UnstyledButton
                            component={Link}
                            href="/categories"
                            className={classes.link}
                        >
                            Categories
                        </UnstyledButton>
                        <UnstyledButton
                            component={Link}
                            href="/topup"
                            className={classes.link}
                        >
                            Topup
                        </UnstyledButton>
                        <Text
                            component={Link}
                            href="/history"
                            className={classes.link}
                        >
                            History
                        </Text>
                    </Group>
                </Group>
                <Group>
                    {(user !== null)
                        ? (
                            <>
                            <HeaderUserMenu
                                user={user}
                                logout={logout}
                            />
                            </>
                        )
                        : (
                            <>
                            <Button
                                component={Link}
                                href="/login"
                                radius="md"
                                variant="transparent"
                            >
                                Login
                            </Button>
                            <Button
                                component={Link}
                                href="/register"
                                radius="md"
                                variant="gradient"
                                gradient={{ from: "violet", to: "grape" }}
                            >
                                Register
                            </Button>
                            </>
                        )
                    }
                </Group>
                <Burger
                    opened={opened}
                    onClick={toggle}
                    hiddenFrom="sm"
                />
            </Container>
        );
    };  
};