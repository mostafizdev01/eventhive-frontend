/* eslint-disable @typescript-eslint/no-explicit-any */
"use server"
import { serverFetch } from "@/src/lib/server-fetch";
import { getCookie } from "../auth/tokenHandlers";
import jwt from "jsonwebtoken"
import { getUserInfo } from "../auth/getUserInfo";

export const hostEvent = async () => {
    const token = await getCookie("accessToken") || "";
    const decoded: any = jwt.decode(token);
    const hostData = await getUserInfo(decoded?.email)
    const hostId = hostData?.data?.host?.id;
    try {
        const res = await serverFetch.post("/event/my-event", {
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ hostId })
        });

        const data = await res.json();
        return data?.data;

    } catch (error) {
        console.log("Error fetching user info:", error);
        return null;
    }
};
