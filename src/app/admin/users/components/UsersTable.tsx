"use client";

import { Container, Notification, Table, TableScrollContainer, TableTbody, TableTh, TableThead, TableTr, TextInput } from "@mantine/core";
import { useEffect, useState } from "react";

import UserTable from "./UserTable";

import axios from "axios";
import { IconSearch } from "@tabler/icons-react";

export default function UsersTable() {
    const [users, setUsers] = useState<any[]>([]);
    const [fetchedUsers, setFetchedUsers] = useState(false);

    const [search, setSearch] = useState<string>("");

    const fetchUsers = async () => {
        setFetchedUsers(false);

        const response = await axios
            .get("/api/v1/admin/users");

        if (response.data.ok)
            setUsers(response.data.data);

        setFetchedUsers(true);
    };

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = event.currentTarget;
        setSearch(value);
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    const rows = users.map((user) => (
        <UserTable
            key={user._id}
            user={user}
        />
    ));

    return (
        <Container size="xl" my="xl">
            {fetchedUsers
                ? (
                    <TableScrollContainer minWidth={800}>
                        <Table verticalSpacing="sm">
                            <TableThead>
                                <TableTr>
                                    <TableTh>Username</TableTh>
                                    <TableTh>Email</TableTh>
                                    <TableTh>Role</TableTh>
                                    <TableTh>Balance</TableTh>
                                    <TableTh>Total Balance</TableTh>
                                    <TableTh>Actions</TableTh>
                                </TableTr>
                            </TableThead>
                            <TableTbody>
                                {rows}
                            </TableTbody>
                        </Table>
                    </TableScrollContainer>
                )
                : (
                    <Notification
                        title="Loading Data!"
                        loading
                        withBorder
                        withCloseButton={false}
                    >
                        Fetching users...
                    </Notification>
                )
            }
        </Container>
    );
};