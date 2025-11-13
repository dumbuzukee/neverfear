
import { ActionIcon, Badge, Group, NumberFormatter, TableTd, TableTr, Text } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import EditUserModal from "./EditModal";
import { IconPencil, IconTrash } from "@tabler/icons-react";

export default function UserTable({ user }: { user: any }) {
    const roleColors: Record<string, string> = {
        dev: "orange",
        admin: "violet",
        user: "violet",
        guest: "gray",
    };

    const [openedEditModal, { open: openEditModal, close: closeEditModal }] = useDisclosure(false);
    
    return (
        <>
        <EditUserModal
            opened={openedEditModal}
            close={closeEditModal}
            user={user}
        />
        <TableTr>
            <TableTd>
                <Text fz="sm" fw={500}>
                    {user.username}
                </Text>
            </TableTd>
            <TableTd>
                <Text fz="sm" fw={500}>
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
                <Group>
                    <ActionIcon color="gray" variant="subtle" onClick={openEditModal}>
                        <IconPencil size={16} stroke={1.5} />
                    </ActionIcon>
                    <ActionIcon color="red" variant="subtle">
                        <IconTrash size={16} stroke={1.5} />
                    </ActionIcon>
                </Group>
            </TableTd>
        </TableTr>
        </>
    );
};
