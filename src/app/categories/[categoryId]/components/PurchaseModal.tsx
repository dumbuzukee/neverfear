"use client";

import { Blockquote, Button, Group, Modal, NumberInput, Stack, Text, Title } from "@mantine/core";
import { notifications } from "@mantine/notifications";
import { IconListNumbers } from "@tabler/icons-react";
import { Turnstile } from "@marsidev/react-turnstile";
import { useState } from "react";

import axios from "axios";


export default function PurchaseModal({ opened, close, product }: { opened: boolean, close: () => void, product: any }) {
    const [quantity, setQuantity] = useState<number | string>("1");
    const [purchasing, setPurchasing] = useState(false);
    
    // const [turnstileToken, setTurnstileToken] = useState<string>("");
    // const [turnstileLoading, setTurnstileLoading] = useState(true);

    const handlePurchaseItem = async () => {
        setPurchasing(true);

        const response = await axios
            .post(`/api/v1/users/purchaseItem/${product._id}`, {
                quantity,
            });

        if (response.data.ok) {
            notifications.show({
                message: response.data.message,
                color: "green",
                autoClose: true,
            });
            setTimeout(() => {
                window.location.reload();
            }, 2000);
        } else {
            notifications.show({
                message: response.data.message,
                color: "red",
                autoClose: true,
            });
            window.turnstile?.reset();
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
                <NumberInput
                    leftSection={<IconListNumbers size={16} stroke={1.5} />}
                    label="Quantity"
                    description="How many items would you like to purchase?"
                    placeholder="1"
                    value={quantity}
                    onChange={setQuantity}
                    allowDecimal={false}
                    min={1}
                    max={100}
                    radius="md"
                />
                <Group gap="xs">
                    <Text c="gray" fz="sm">
                        Total Price:
                    </Text>
                    <Text c="green" fz="sm" fw={500}>
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