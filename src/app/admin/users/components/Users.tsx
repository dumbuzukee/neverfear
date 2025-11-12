"use client";

import { ActionIcon, Badge, Container, Group, Notification, NumberFormatter, Table, TableScrollContainer, TableTbody, TableTd, TableTh, TableThead, TableTr, Text } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconPencil, IconTrash } from "@tabler/icons-react";
import axios from "axios";
import { useEffect, useState } from "react";
import EditUserModal from "./EditModal";
import UserTable from "./UserTable";

export default function UsersTable() {
    const [users, setUsers] = useState<any[]>([]);
    const [fetchedUsers, setFetchedUsers] = useState(false);

    const [openedEditModal, { open: OpenEditModal, close: CloseEditModal }] = useDisclosure(false);

    const fetchUsers = async () => {
        setFetchedUsers(false);

        const response = await axios
            .get("/api/v1/admin/users");

        if (response.data.ok)
            setUsers(response.data.data);

        setFetchedUsers(true);
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    const rows = users.map((user) => (
        <UserTable
            key={user._id}
            opened={openedEditModal}
            open={OpenEditModal}
            close={CloseEditModal}
            user={user}
        />
    ));

    return (
        <Container size="lg" my="xl">
            {!fetchedUsers
                ? (
                    <Notification
                        title="Loading Data!"
                        loading
                        withBorder
                        withCloseButton={false}
                    >
                        Fetching users...
                    </Notification>
                )
                : (
                    <TableScrollContainer minWidth={800}>
                        <Table verticalSpacing="sm">
                            <TableThead>
                                <TableTr>
                                    <TableTh>Username</TableTh>
                                    <TableTh>Email</TableTh>
                                    <TableTh>Role</TableTh>
                                    <TableTh>Balance</TableTh>
                                    <TableTh />
                                </TableTr>
                            </TableThead>
                            <TableTbody>
                                {rows}
                            </TableTbody>
                        </Table>
                    </TableScrollContainer>
                )
            }
        </Container>
    );
};