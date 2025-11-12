import SectionHeader from "@/components/SectionHeader/SectionHeader";
import { IconHistory } from "@tabler/icons-react";
import HistoryTabs from "./components/HistoryTabs";


export default function HistoryPage() {
    return (
        <>
        <SectionHeader
            title="Purchase History"
            description="Lorem ipsum dolor sit amet consectetur adipiscing elit."
            Icon={IconHistory}
        ></SectionHeader>
        <HistoryTabs />
        </>
    );
};