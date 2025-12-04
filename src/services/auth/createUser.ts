/* eslint-disable @typescript-eslint/no-explicit-any */
"use server"

import { serverFetch } from "@/src/lib/server-fetch";
// import { zodValidator } from "@/lib/zodValidator";
// import { registerPatientValidationZodSchema } from "@/zod/auth.validation";
import { loginUser } from "./loginUser";


export const createUser = async (_currentState: any, formData: any): Promise<any> => {
    try {
        const payload = {
            name: formData.get('name'),
            address: formData.get('address'),
            email: formData.get('email'),
            password: formData.get('password'),
        }


        // if (zodValidator(payload, registerPatientValidationZodSchema).success === false) {
        //     return zodValidator(payload, registerPatientValidationZodSchema);
        // }

        // const validatedPayload: any = zodValidator(payload, registerPatientValidationZodSchema).data;
        // const userData = {
        //     password: validatedPayload.password,
        //     patient: {
        //         name: validatedPayload.name,
        //         address: validatedPayload.address,
        //         email: validatedPayload.email,
        //     }
        // }

        const newFormData = new FormData();

        newFormData.append("data", JSON.stringify(payload));

        if (formData.get("file")) {
            newFormData.append("file", formData.get("file") as Blob);
        }

        const res = await serverFetch.post("/user/create-user", {
            body: newFormData,
        })

        const result = await res.json();


        if (result.success) {
            await loginUser(_currentState, formData);
        }

        return result;



    } catch (error: any) {
        // Re-throw NEXT_REDIRECT errors so Next.js can handle them
        if (error?.digest?.startsWith('NEXT_REDIRECT')) {
            throw error;
        }
        console.log(error);
        return { success: false, message: `${process.env.NODE_ENV === 'development' ? error.message : "Registration Failed. Please try again."}` };
    }
}