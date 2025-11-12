import "@mantine/core/styles.css";
import "@mantine/notifications/styles.css";

import { ColorSchemeScript, MantineProvider, mantineHtmlProps } from "@mantine/core";
import { ModalsProvider } from "@mantine/modals";
import { Notifications } from "@mantine/notifications";
import { AuthProvider } from "@/context/AuthContext";
import { theme } from "../../theme";

import AppLayout from "@/components/AppLayout/AppLayout";

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en" {...mantineHtmlProps}>
            <head>
                <ColorSchemeScript
                    defaultColorScheme="dark"
                    forceColorScheme="dark"
                />
                <link rel="preconnect" href="https://challenges.cloudflare.com" />
                <script
                    src="https://challenges.cloudflare.com/turnstile/v0/api.js"
                    async
                    defer
                ></script>
            </head>
            <body>
                <MantineProvider
                    defaultColorScheme="dark"
                    forceColorScheme="dark"
                    theme={theme}
                >
                    <ModalsProvider>
                        <Notifications />
                        <AuthProvider>
                            <AppLayout>
                                {children}
                            </AppLayout>
                        </AuthProvider>
                    </ModalsProvider>
                </MantineProvider>
            </body>
        </html>
    );
};