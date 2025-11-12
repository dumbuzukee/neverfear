"use client";

import { AppShell, AppShellHeader, AppShellMain, AppShellNavbar } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";

import Header from "../Header/Header";

export default function AppLayout({ children }: { children: React.ReactNode }) {
    const [opened, { toggle }] = useDisclosure(false);

    return (
        <AppShell
            header={{ height: 60 }}
            navbar={{ width: 300, breakpoint: "sm", collapsed: { desktop: true, mobile: !opened } }}
            padding="md"
            withBorder={false}
        >
            <AppShellHeader>
                <Header
                    opened={opened}
                    toggle={toggle}
                />
            </AppShellHeader>
            <AppShellMain>
                {children}
            </AppShellMain>
        </AppShell>
    );
};