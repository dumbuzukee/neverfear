"use client";

import { Button } from "@mantine/core";
import { IconSettings } from "@tabler/icons-react";

import Link from "next/link";
import DashbaordStats from "./components/DashboardStats";
import SectionHeader from "@/components/HeaderSection/HeaderSection";

export default function AdminPage() {
    return (
        <>
        <SectionHeader
            title="Admin Panel"
            description="Dashboard for administrators."
            Icon={IconSettings}
        >
            <Button
                component={Link}
                href="/admin/users"
                radius="md"
                variant="gradient"
                gradient={{ from: "violet", to: "grape" }}
            >
                Manage Users
            </Button>
            <Button
                component={Link}
                href="/admin/categories"
                radius="md"
                variant="gradient"
                gradient={{ from: "violet", to: "grape" }}
            >
                Manage Categories
            </Button>
        </SectionHeader>
        <DashbaordStats />
        </>
    );
};