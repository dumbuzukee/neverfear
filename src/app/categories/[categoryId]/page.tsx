"use client"

import { useDisclosure } from "@mantine/hooks";
import { IconShoppingBag } from "@tabler/icons-react";
import { use } from "react";

import SectionHeader from "@/components/SectionHeader/SectionHeader";
import Products from "./components/Products";

export default function CategoryPage({ params }: { params: Promise<{ categoryId: string }> }) {
    const { categoryId } = use(params);

    return (
        <>
        <SectionHeader
            title="Products"
            description="Lorem ipsum dolor sit amet consectetur adipiscing elit."
            Icon={IconShoppingBag}
        ></SectionHeader>
        <Products
            categoryId={categoryId}
        />
        </>
    );
};