"use client";

import { UserResponse } from "@/models/users.model";
import { Avatar, Menu, MenuDropdown, MenuItem, MenuLabel, MenuTarget, NumberFormatter, UnstyledButton } from "@mantine/core";
import { IconCoin, IconLogout, IconPasswordFingerprint, IconSettings, IconWallet } from "@tabler/icons-react";
import Link from "next/link";

export default function HeaderUserMenu({ user, logout }: { user: UserResponse, logout: () => Promise<void> }) {
    return (
        <Menu
            width={180}
            radius="md"
            shadow="sm"
            withArrow    
        >
            <MenuTarget>
                <UnstyledButton>
                    <Avatar
                        color="violet"
                        radius="xl"
                    />
                </UnstyledButton>
            </MenuTarget>
            <MenuDropdown>
                <MenuLabel>
                    Wallet
                </MenuLabel>
                <MenuLabel c="gray">
                    Balance: <NumberFormatter value={user.balance} thousandSeparator />
                </MenuLabel>
                <MenuLabel c="gray">
                    Total Balance: <NumberFormatter value={user.totalBalance} thousandSeparator />
                </MenuLabel>
                <MenuLabel>
                    Application
                </MenuLabel>
                <MenuItem
                    leftSection={<IconWallet size={18} />}
                    component={Link}
                    href="/topup"
                >
                    Topup Balance
                </MenuItem>
                <MenuItem
                    leftSection={<IconCoin size={18} />}
                    component={Link}
                    href="/history"
                >
                    Purchase History
                </MenuItem>
                <MenuItem
                    leftSection={<IconPasswordFingerprint size={18} />}
                    component={Link}
                    href="/change-password"
                >
                    Change Password
                </MenuItem>
                {(user.role === "dev" || user.role === "admin") && (
                    <>
                    <MenuLabel>
                        Admin Panel
                    </MenuLabel>
                    <MenuItem
                        leftSection={<IconSettings size={18} />}
                        component={Link}
                        href="/admin"
                    >
                        Admin Panel
                    </MenuItem>
                    </>
                )}
                <MenuLabel>
                    Actions
                </MenuLabel>
                <MenuItem
                    leftSection={<IconLogout size={18} />}
                    color="red"
                    onClick={logout}
                >
                    Logout
                </MenuItem>
            </MenuDropdown>
        </Menu>
    );
};