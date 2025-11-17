"use client";

import { Button, PasswordInput, Stack, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { notifications } from "@mantine/notifications";
import { Turnstile } from "@marsidev/react-turnstile";
import { useState } from "react";

import axios from "axios";

export default function LoginForm() {
    const form = useForm({
        initialValues: {
            username: "",
            password: "",
        },
        validate: {
            username: (value) => {
                if (value.length < 3) {
                    return "Username must include at least 3 characters";
                };
                if (!/^[a-zA-Z0-9_]+$/.test(value)) {
                    return "Username can only contain letters, numbers, and underscores";
                };
            },
            password: (value) => (value.length < 6 && "Password must include at least 6 characters"),
        },
    });

    const [loading, setLoading] = useState(false);
    // const [turnstileLoading, setTurnstileLoading] = useState(true);

    const handleLogin = form.onSubmit(
        async (values) => {
            const {
                username,
                password,
            } = values;

            setLoading(true);

            const response = await axios
                .post("/api/v1/users/login", {
                    username,
                    password,
                });

            if (response.data.ok) {
                notifications.show({
                    message: response.data.message,
                    color: "green",
                    autoClose: 3000,
                });
                setTimeout(() => {
                    window.location.href = "/";
                }, 2000);
            } else {
                notifications.show({
                    message: response.data.message,
                    color: "red",
                    autoClose: 3000,
                });
                window.turnstile?.reset();
            };

            setLoading(false);
        }
    );

    return (
        <form onSubmit={handleLogin}>
            <Stack>
                <TextInput
                    required
                    label="Username"
                    placeholder="Enter your username"
                    radius="md"
                    {...form.getInputProps("username")}
                />
                <PasswordInput
                    required
                    label="Password"
                    placeholder="Enter your password"
                    radius="md"
                    {...form.getInputProps("password")}
                />
                <Button
                    type="submit"
                    radius="md"
                    variant="gradient"
                    gradient={{ from: "violet", to: "grape" }}
                    loading={loading}
                >
                    Confirm Login
                </Button>
            </Stack>
        </form>
    );
};