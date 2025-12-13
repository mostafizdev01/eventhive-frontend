"use server"
import { serverFetch } from "@/src/lib/server-fetch";

export const getUserInfo = async (email: string) => {
    try {
        const res = await serverFetch.post("/user/me", {
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ email })
        });

        const data = await res.json();
        return data;

    } catch (error) {
        console.log("Error fetching user info:", error);
        return null;
    }
};
