
import { IconCategory } from "@tabler/icons-react";

import HeaderSection from "@/components/HeaderSection/HeaderSection";
import Categories from "./components/Categories";

export default function CategoriesPage() {
    return (
        <>
        <HeaderSection
            title="Categories"
            description="View all NeverFear categories."
            Icon={IconCategory}
        ></HeaderSection>
        <Categories />
        </>
    );
};