import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    experimental: {
        optimizePackageImports: [
            "@mantine/core",
            "@mantine/hooks",
            "@mantine/charts",
            "@mantine/form",
            "@mantine/modals",
            "@mantine/notifications",
            "@marsidev/react-turnstile",
        ],
    },
};

export default nextConfig;
