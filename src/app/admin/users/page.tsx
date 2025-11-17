"use client";

import { Box, Button, Container, Group } from "@mantine/core";
import { IconUsers, IconUsersGroup } from "@tabler/icons-react";

import Link from "next/link";
import SectionHeader from "@/components/HeaderSection/HeaderSection";
import UsersTable from "./components/UsersTable";

export default function AdminPage() {

    return (
        <>
        <SectionHeader
            title="Manage Users"
            description="Edit, remove user"
            Icon={IconUsersGroup}
        >
            <Button
                component={Link}
                href="/admin"
                radius="md"
                variant="gradient"
                gradient={{ from: "violet", to: "grape" }}
            >
                Back to Admin Panel
            </Button>
        </SectionHeader>
        <UsersTable />
        </>
    );
};