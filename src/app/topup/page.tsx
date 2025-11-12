
import SectionHeader from "@/components/SectionHeader/SectionHeader";
import TopupForm from "./components/Form"
import { IconWallet } from "@tabler/icons-react";

export default function TopupPage() {
    return (
        <>
        <SectionHeader
            title="Topup"
            description="Lorem ipsum dolor sit amet consectetur adipiscing elit."
            Icon={IconWallet}
        ></SectionHeader>
        <TopupForm />
        </>
    );
};