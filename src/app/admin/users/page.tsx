"use client";

import { Box, Button, Container, Group } from "@mantine/core";
import { IconUsers } from "@tabler/icons-react";

import Link from "next/link";
import SectionHeader from "@/components/SectionHeader/SectionHeader";
import UsersTable from "./components/Users";

export default function AdminPage() {

    return (
        <>
        <SectionHeader
            title="Manage Users"
            description="Edit, remove user"
            Icon={IconUsers}
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