"use client";

import { Blockquote, Button, Group, Modal, NumberInput, Stack, Text, Title } from "@mantine/core";
import { notifications } from "@mantine/notifications";
import axios from "axios";
import { useState } from "react";


export default function PurchaseModal({ opened, close, product }: { opened: boolean, close: () => void, product: any }) {
    const [quantity, setQuantity] = useState<number | string>("1");
    const [purchasing, setPurchasing] = useState(false);

    const handlePurchaseItem = async () => {
        setPurchasing(true);

        const response = await axios
            .post(`/api/v1/users/purchase/${product._id}`, {
                quantity,
            });

        if (response.data.ok) {
            notifications.show({
                message: response.data.message,
                color: "green",
                autoClose: true,
            });
            window.location.reload();
        } else {
            notifications.show({
                message: response.data.message,
                color: "red",
                autoClose: true,
            });
        };

        setPurchasing(false);
    };

    return (
        <Modal
            title={product.name}
            size="lg"
            radius="md"
            shadow="sm"
            opened={opened}
            onClose={close}
            centered
        >
            <Stack>
                <Blockquote cite="Description!" radius="md">
                    {product.description}
                </Blockquote>
                <Group justify="space-between">
                    <NumberInput
                        label="Select Quantity"
                        placeholder="1"
                        value={quantity}
                        onChange={setQuantity}
                        allowDecimal={false}
                        radius="md"
                        min={1}
                        max={100}
                    />
                    <Text c="green" >
                        {product.price * Number(quantity || 1)}
                    </Text>
                </Group>
                <Button
                    radius="md"
                    variant="gradient"
                    gradient={{ from: "violet", to: "grape" }}
                    onClick={handlePurchaseItem}
                    loading={purchasing}
                >
                    Confirm Purchase
                </Button>
            </Stack>
        </Modal>
    );
};