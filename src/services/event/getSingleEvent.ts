import { serverFetch } from "@/src/lib/server-fetch"

export const getSingleEvent = async () => {
    try {
        const Response = await serverFetch.get(`/event/cmj1zryj90000x4utu0ppi07w`)
        const eventData = await Response.json()
        console.log("res ✅", eventData)
        return eventData;
    } catch (error) {
        console.log("error", error)
    }
}