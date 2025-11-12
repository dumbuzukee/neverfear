"use client";

import { Container, Notification, Paper, ScrollArea, Tabs, TabsList, TabsPanel, TabsTab, Title } from "@mantine/core";
import { useEffect, useState } from "react";

import axios from "axios";
import PurchaseHistoryCard from "./PurchaseHistoryCard";

export default function HistoryTabs() {

    const [purchases, setPurchases] = useState<any[]>([]);
    const [fetchedPurchases, setFetchedPurchases] = useState(false);

    const fetchPurchases = async () => {
        setFetchedPurchases(false);
        
        const response = await axios
            .get("/api/v1/users/purchaseHistory");

        if (response.data.ok)
            setPurchases(response.data.data);

        setFetchedPurchases(true);
    };

    useEffect(() => {
        fetchPurchases();
    }, []);

    const purchaseCards = purchases.map((purchase) => (
        <PurchaseHistoryCard
            key={purchase._id}
            purchase={purchase}
        />
    ));

    return (
        <Container size="lg" my="xl">
            <Paper p="md" radius="md" shadow="sm" withBorder>
                {!fetchedPurchases
                    ? (
                        <Notification
                            title="Loading Data!"
                            loading
                            withBorder
                            withCloseButton={false}
                        >
                            Fetching purchased history...
                        </Notification>
                    )
                    : (
                        <ScrollArea h={400} >
                            {purchaseCards}
                        </ScrollArea>
                    )
                }
            </Paper>
        </Container>
    );
};