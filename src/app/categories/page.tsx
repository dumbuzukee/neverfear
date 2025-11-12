
import { IconCategory } from "@tabler/icons-react";

import SectionHeader from "@/components/SectionHeader/SectionHeader";
import Categories from "./components/Categories";

export default function CategoriesPage() {
    return (
        <>
        <SectionHeader
            title="Categories"
            description="Categories."
            Icon={IconCategory}
        ></SectionHeader>
        <Categories />
        </>
    );
};