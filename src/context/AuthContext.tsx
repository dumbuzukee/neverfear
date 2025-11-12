"use client";

import { UserResponse } from "@/models/users.model";
import { createContext, useContext, useEffect, useState } from "react";

import axios from "axios";

export interface AuthContextType {
    user: UserResponse | null;
    loaded: boolean;
    fetchUser: () => Promise<void>;
    logout: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType>({
    user: null,
    loaded: false,
    fetchUser: async () => {},
    logout: async () => {},
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [user, setUser] = useState<UserResponse | null>(null);
    const [loaded, setLoaded] = useState(false);

    const fetchUser = async () => {
        setLoaded(false);
        const response = await axios.get("/api/v1/users/me");
        if (response.data.ok) setUser(response.data.data);
        setLoaded(true);
    };

    const logout = async () => {
        await axios.post("/api/v1/users/logout");
        setUser(null);
        window.location.href = "/";
    };

    useEffect(() => {
        fetchUser();
    }, []);

    return (
        <AuthContext.Provider value={{ user, loaded, fetchUser, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);