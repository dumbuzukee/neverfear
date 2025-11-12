"use client";

import { Container, Notification, SimpleGrid } from "@mantine/core";
import { useEffect, useState } from "react";

import ProductCard from "./ProductCard";

import axios from "axios";

export default function Products({ categoryId }: { categoryId: string }) {
    const [products, setProducts] = useState<any[]>([]);
    const [fetchedProducts, setFetchedProducts] = useState(false);

    const fetchProducts = async () => {
        setFetchedProducts(false);

        const response = await axios
            .get(`/api/categories/${categoryId}`);

        if (response.data.ok)
            setProducts(response.data.data);

        setFetchedProducts(true);
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    const cards = products.map((product) => (
        <ProductCard
            key={product._id}
            product={product}
        />
    ));

    return (
        <Container size="lg" my="xl">
            {fetchedProducts
                ? (
                    <SimpleGrid cols={{ base: 1, sm: 2, md: 4 }}>
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
                        Fetching Products...
                    </Notification>
                )
            }
        </Container>
    );
};