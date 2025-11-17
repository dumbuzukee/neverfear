
import { Badge, Button, Group, NumberFormatter, TableTd, TableTr, Text } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { notifications } from "@mantine/notifications";
import { modals } from "@mantine/modals";
import { IconPencil, IconTrash, IconWallet } from "@tabler/icons-react";

import EditUserModal from "./EditRoleModal";

import axios from "axios";
import AddBalanceModal from "./AddBalanceModal";

export default function UserTable({ user }: { user: any }) {
    const roleColors: Record<string, string> = {
        dev: "grape",
        admin: "violet",
        user: "blue",
        guest: "gray",
    };

    const [openedEditModal, { open: openEditModal, close: closeEditModal }] = useDisclosure(false);
    const [openedAddModal, { open: openAddModal, close: closeAddModal }] = useDisclosure(false);

    const handleDeleteUser = async () => {
        const response = await axios
            .delete(`/api/v1/admin/users/${user._id}`);

        if (response.data.ok) {
            notifications.show({
                message: response.data.message,
                color: "green",
                autoClose: 3000,
            });
            setTimeout(() => {
                window.location.reload();
            }, 2000);
        } else {
            notifications.show({
                message: response.data.message,
                color: "red",
                autoClose: 3000,
            });
        };
    }
    
    return (
        <>
        <EditUserModal
            opened={openedEditModal}
            close={closeEditModal}
            user={user}
            color={roleColors[user.role]}
        />
        <AddBalanceModal
            opened={openedAddModal}
            close={closeAddModal}
            user={user}
        />
        <TableTr>
            <TableTd>
                <Text fz="sm" fw={500}>
                    {user.username}
                </Text>
            </TableTd>
            <TableTd>
                <Text fz="sm" fw={400}>
                    {user.email}
                </Text>
            </TableTd>
            <TableTd>
                <Badge color={roleColors[user.role].toLowerCase()} variant="light">
                    {user.role}
                </Badge>
            </TableTd>
            <TableTd>
                <NumberFormatter value={user.balance} thousandSeparator />
            </TableTd>
            <TableTd>
                <NumberFormatter value={user.totalBalance} thousandSeparator />
            </TableTd>
            <TableTd>
                <Group>
                    <Button
                        leftSection={<IconPencil size={16} stroke={1.5} />}
                        size="xs"
                        radius="md"
                        color="gray"
                        variant="subtle"
                        onClick={openEditModal}
                    >
                            Edit Role
                    </Button>
                    <Button
                        leftSection={<IconWallet size={16} stroke={1.5} />}
                        size="xs"
                        radius="md"
                        color="gray"
                        variant="subtle"
                        onClick={openAddModal}
                    >
                            Add Balance
                    </Button>
                    <Button
                        leftSection={<IconTrash size={16} stroke={1.5} />}
                        size="xs"
                        radius="md"
                        color="red"
                        variant="subtle"
                        onClick={() => modals.openConfirmModal({
                            title: "Confirm Delete User",
                            children: (
                                <Text>
                                    Are you certain you want to delete this user? This action is destructive.
                                </Text>
                            ),
                            labels: { confirm: "Delete User", cancel: "Cancel" },
                            confirmProps: { color: "red" },
                            onConfirm: handleDeleteUser
                        })}
                    >
                            Delete User
                    </Button>
                </Group>
            </TableTd>
        </TableTr>
        </>
    );
};