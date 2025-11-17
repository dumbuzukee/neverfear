import { Card, Group, Paper, Text } from "@mantine/core";
import { Icon, IconProps } from "@tabler/icons-react";
import { ForwardRefExoticComponent, RefAttributes } from "react";

interface StatProps {
    title: string;
    value: number;
    Icon: ForwardRefExoticComponent<IconProps & RefAttributes<Icon>>;
}

export default function DashbaordStatCard({ title, value, Icon }: StatProps) {
    return (
        <Paper p="md" radius="md" withBorder>
            <Group justify="space-between">
                <Text c="dimmed" fz="xs" fw={700} tt="uppercase">
                    {title}
                </Text>
                <Icon
                    size={22}
                    stroke={1.5}
                />
            </Group>
            <Group>
                <Text
                    fz="xl"
                    fw={700}
                    variant="gradient"
                    gradient={{ from: "violet", to: "grape" }}
                >
                    {value}
                </Text>
            </Group>
        </Paper>
    );
};