"use client"

import { Button } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconPackage } from "@tabler/icons-react";
import { use } from "react";

import Link from "next/link";
import CreateProductModal from "./components/CreateModal";
import Products from "./components/Products";
import SectionHeader from "@/components/HeaderSection/HeaderSection";

interface ParamsProps {
    categoryId: string;
};

export default function AdminCategoryPage({ params }: { params: Promise<ParamsProps> }) {
    const { categoryId } = use(params);
    const [openedCreateModal, { open: openCreateModal, close: closeCreateModel }] = useDisclosure(false);

    return (
        <>
        <CreateProductModal
            opened={openedCreateModal}
            close={closeCreateModel}
            categoryId={categoryId}
        />
        <SectionHeader
            title="Manage Products"
            description="Add, edit, and delete products."
            Icon={IconPackage}
        >
            <Button
                radius="md"
                variant="gradient"
                gradient={{ from: "violet", to: "grape" }}
                onClick={openCreateModal}
            >
                Create Product
            </Button>
            <Button
                component={Link}
                href="/admin/categories"
                radius="md"
                variant="gradient"
                gradient={{ from: "violet", to: "grape" }}
            >
                Back to Categories
            </Button>
        </SectionHeader>
        <Products
            categoryId={categoryId}
        />
        </>
    );
};