"use client";


import { Container, Notification, SimpleGrid } from "@mantine/core";
import { useEffect, useState } from "react"

import DashbaordStatCard from "./DashboardStatCard";

import axios from "axios";
import { IconCategory, IconPackage, IconQuestionMark, IconUsers } from "@tabler/icons-react";

export default function DashbaordStats() {

    const [users, setUsers] = useState<any[]>([]);
    const [categories, setCategories] = useState<any[]>([]);
    const [products, setProducts] = useState<any[]>([]);

    const [fetchedUsers, setFetchedUsers] = useState(false);
    const [fetchedCategories, setFetchedCategories] = useState(false);
    const [fetchedProducts, setFetchedProducts] = useState(false);

    const fetchUsers = async () => {
        setFetchedUsers(false);

        const response = await axios
            .get("/api/v1/admin/users");

        if (response.data.ok)
            setUsers(response.data.data);

        setFetchedUsers(true);
    };

    const fetchCategories = async () => {
        setFetchedCategories(false);

        const response = await axios
            .get("/api/v1/categories");

        if (response.data.ok)
            setCategories(response.data.data);

        setFetchedCategories(true);
    };

    const fetchProducts = async () => {
        setFetchedProducts(false);

        const response = await axios
            .get("/api/v1/admin/products");

        if (response.data.ok)
            setProducts(response.data.data);

        setFetchedProducts(true);
    };

    useEffect(() => {
        fetchProducts();
        fetchUsers();
        fetchCategories();
    }, []);

    return (
        <Container size="xl" my="xl">
            {(!fetchCategories || !fetchedProducts || !fetchedUsers)
                ? (
                    <Notification
                        title="Loading Data!"
                        loading
                        withBorder
                        withCloseButton={false}
                    >
                        Fetching Data...
                    </Notification>
                )
                : (
                    <SimpleGrid cols={{ base: 1, sm: 2, md: 4 }}>
                        <DashbaordStatCard
                            title="Total Customers"
                            value={users.length}
                            Icon={IconUsers}
                        />
                        <DashbaordStatCard
                            title="Total Categories"
                            value={categories.length}
                            Icon={IconCategory}
                        />
                        <DashbaordStatCard
                            title="Total Products"
                            value={products.length}
                            Icon={IconPackage}
                        />
                        <DashbaordStatCard
                            title="Total ..."
                            value={0}
                            Icon={IconQuestionMark}
                        />
                    </SimpleGrid>
                )
            }
        </Container>
    );
};