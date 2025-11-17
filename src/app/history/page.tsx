import SectionHeader from "@/components/HeaderSection/HeaderSection";
import { IconHistory } from "@tabler/icons-react";
import HistoryTabs from "./components/HistoryTabs";


export default function HistoryPage() {
    return (
        <>
        <SectionHeader
            title="Purchase History"
            description="See your recent purchases."
            Icon={IconHistory}
        ></SectionHeader>
        <HistoryTabs />
        </>
    );
};