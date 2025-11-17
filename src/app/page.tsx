"use client";

import { useAuth } from "@/context/AuthContext";

import WelcomeBanner from "@/components/WelcomeBanner/WelcomeBanner";
import WelcomeAnnouncement from "@/components/WelcomeAnnouncement/WelcomeAnnouncement";

export default function HomePage() {
    const { user, loaded } = useAuth();

    return (
        <>
        <WelcomeBanner />
        <WelcomeAnnouncement
            user={user}
            loaded={loaded}
        />
        </>
    );
};