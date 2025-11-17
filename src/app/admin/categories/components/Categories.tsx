"use client";

import { Container, Notification, SimpleGrid } from "@mantine/core";
import { useEffect, useState } from "react";

import CategoryCard from "./CategoryCard";

import axios from "axios";

export default function Categories() {
    const [categories, setCategories] = useState<any[]>([]);
    const [fetchedCategories, setFetchedCategories] = useState(false);

    const fetchCategories = async () => {
        setFetchedCategories(false);

        const response = await axios
            .get("/api/v1/categories");

        if (response.data.ok)
            setCategories(response.data.data);

        setFetchedCategories(true);
    };

    useEffect(() => {
        fetchCategories();
    }, []);

    const cards = categories.map((category) => (
        <CategoryCard
            key={category._id}
            category={category}
        />
    ));

    return (
        <Container size="xl" my="md">
            {fetchedCategories
                ? (
                    <SimpleGrid cols={{ base: 1, sm: 3 }}>
                        {cards}
                    </SimpleGrid>
                )
                : (
                    <Notification
                        title="Loading Data!"
                        loading
                        withBorder
                        withCloseButton={false}
                    >
                        Fetching Categories...
                    </Notification>
                )
            }
        </Container>
    );
};