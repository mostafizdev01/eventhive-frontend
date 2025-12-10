/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { serverFetch } from "@/src/lib/server-fetch";

interface FormState {
    success: boolean;
    message: string;
    errors: Record<string, string[]>;
}

export const createEventAction = async (
    prevState: FormState,
    formData: FormData
): Promise<FormState> => {
    try {
        const jsonData = formData.get("data") as string;
        const parsed = JSON.parse(jsonData);

        const payload = {
            title: formData.get("title") as string,
            description: formData.get("description") as string,
            location: formData.get("location") as string,
            eventDate: parsed.eventDate,
            startTime: formData.get("startTime") as string,
            endTime: formData.get("endTime") as string,
            ticketPrice: Number(formData.get("ticketPrice")),
            totalSeats: Number(formData.get("totalSeats")),
            availableSeats: Number(formData.get("availableSeats")),
            category: parsed.category,
            status: parsed.status,
            hostId: "cmiucy7050001tsut5tnmba5g",
        };

        const newForm = new FormData();

        newForm.append("data", JSON.stringify(payload));

        if(formData?.get("file")){
            newForm.append("file", formData.get("file") as Blob);
        }


        const res = await serverFetch.post("/event/create-event", {
            body: newForm,
        });

        const result = await res.json();
        console.log("result", result)

        if (!result.success) {
            return {
                success: false,
                message: result.message,
                errors: result.errors || {},
            };
        }

        return {
            success: true,
            message: "Event created successfully!",
            errors: {},
        };
    } catch (err: any) {
        console.error("EVENT ERROR:", err);

        return {
            success: false,
            message: err.message || "Something went wrong",
            errors: {},
        };
    }
};
