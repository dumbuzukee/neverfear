
import { Container, Group, Stack, Text, ThemeIcon, Title } from "@mantine/core";
import { Icon, IconProps } from "@tabler/icons-react";
import { ForwardRefExoticComponent, RefAttributes } from "react";

interface SectionHeaderProps {
    title: string;
    description: string;
    Icon: ForwardRefExoticComponent<IconProps & RefAttributes<Icon>>;
    children?: React.ReactNode;
};

export default function SectionHeader({ title, description, Icon, children }: SectionHeaderProps) {
    return (
        <Container size="lg" mb="md" style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <Group gap="sm">
                <ThemeIcon size={52} radius="md" variant="light">
                    <Icon size={36} />
                </ThemeIcon>
                <Stack gap={0}>
                    <Title c="gray" fz="lg">
                        {title}
                    </Title>
                    <Text c="dimmed" fz="sm">
                        {description}
                    </Text>
                </Stack>
            </Group>
            <Group>
                {children}
            </Group>
        </Container>
    );
};