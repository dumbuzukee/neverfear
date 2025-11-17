import { Card, CopyButton, Divider, Group, Stack, Text, Textarea } from "@mantine/core";
import { IconFileInfo } from "@tabler/icons-react";


export default function PurchaseHistoryCard({ purchase }: { purchase: any }) {

    return (
        <Card
            p="md"
            radius="md"
            shadow="sm"
            my="md"
            withBorder
        >
            <Stack gap="xs">
                <Group justify="space-between">
                    <Text fz="sm" fw={700}>
                        {purchase.productName}
                    </Text>
                    <Text fz="sm" fw={400}>
                        {purchase.productTotalAmount} Baht
                    </Text>
                </Group>
                <Textarea
                    leftSection={<IconFileInfo size={16} stroke={1.5} />}
                    label="Item Info"
                    description="Here is your item(s) info"
                    value={purchase.productValue.join("\n")}
                    radius="md"
                    autosize
                    minRows={purchase.productValue.length}
                    maxRows={purchase.productValue.length}
                    readOnly
                />
            </Stack>
        </Card>
    );
};