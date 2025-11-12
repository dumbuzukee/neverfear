
import { Container } from "@mantine/core";

import Header from "./components/Header";
import MenuManagement from "./components/MenuManagement";
import SectionHeader from "@/components/SectionHeader/SectionHeader";
import { IconSettings } from "@tabler/icons-react";

export default function AdminPage() {

    return (
        <>
        <SectionHeader
            title="Admin Panel"
            description="Dashboard for administrators."
            Icon={IconSettings}
        ></SectionHeader>
        <MenuManagement />
        </>
    );
};