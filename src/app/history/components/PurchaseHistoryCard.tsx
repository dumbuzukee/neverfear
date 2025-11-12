import { Card, CopyButton, Group, Stack, Text, Textarea } from "@mantine/core";


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
                    <Text fz="md" fw={700}>
                        {purchase.productName}
                    </Text>
                    <Text fz="md" fw={500}>
                        {purchase.productTotalAmount}฿
                    </Text>
                </Group>
                <Textarea
                    label="Here is your item(s):"
                    value={purchase.productValue.join("\n")}
                    radius="md"
                    variant="filled"
                    autosize
                    minRows={purchase.productValue.length}
                    maxRows={purchase.productValue.length}
                    readOnly
                />
            </Stack>
        </Card>
    );
};