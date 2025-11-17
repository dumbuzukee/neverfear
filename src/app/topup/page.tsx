
import SectionHeader from "@/components/HeaderSection/HeaderSection";
import TopupForm from "./components/Form"
import { IconWallet } from "@tabler/icons-react";

export default function TopupPage() {
    return (
        <>
        <SectionHeader
            title="Topup (Under Development)"
            description="Top-up your account by using PromptPay QrCode, and upload your slip."
            Icon={IconWallet}
        ></SectionHeader>
        <TopupForm />
        </>
    );
};