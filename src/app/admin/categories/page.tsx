"use client";

import { Button } from "@mantine/core";
import { IconCategory } from "@tabler/icons-react";

import Link from "next/link";
import Categories from "./components/Categories";
import CreateCategoryModal from "./components/CreateModal";
import SectionHeader from "@/components/SectionHeader/SectionHeader";

import { useDisclosure } from "@mantine/hooks";

export default function AdminCategoriesPage() {

    const [openedCreateModal, { open: openCreateModal, close: closeCreateModal }] = useDisclosure(false);

    return (
        <>
        <CreateCategoryModal
            opened={openedCreateModal}
            close={closeCreateModal}
        />
        <SectionHeader
            title="Manage Categories"
            description="Add, edit, delete categories."
            Icon={IconCategory}
        >
            <Button
                radius="md"
                variant="gradient"
                gradient={{ from: "violet", to: "grape" }}
                onClick={openCreateModal}
            >
                Create Category
            </Button>
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
        <Categories />
        </>
    );
};