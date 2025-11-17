"use client"

import { useDisclosure } from "@mantine/hooks";
import { IconShoppingBag } from "@tabler/icons-react";
import { use } from "react";

import SectionHeader from "@/components/HeaderSection/HeaderSection";
import Products from "./components/Products";

export default function CategoryPage({ params }: { params: Promise<{ categoryId: string }> }) {
    const { categoryId } = use(params);

    return (
        <>
        <SectionHeader
            title="Products"
            description="View all products from this category."
            Icon={IconShoppingBag}
        ></SectionHeader>
        <Products
            categoryId={categoryId}
        />
        </>
    );
};