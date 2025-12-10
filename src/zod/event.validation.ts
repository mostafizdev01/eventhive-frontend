import { z } from "zod";

export const createEventValidationZodSchema = z.object({
  title: z.string()
    .min(3, { message: "Title must be at least 3 characters long" })
    .max(200, { message: "Title must be less than 200 characters" }),

  description: z.string()
    .min(10, { message: "Description must be at least 10 characters long" })
    .max(5000, { message: "Description must be less than 5000 characters" }),

  location: z.string()
    .min(3, { message: "Location is required" })
    .max(500, { message: "Location must be less than 500 characters" }),

  eventDate: z.string()
    .min(1, { message: "Event date is required" }),

  startTime: z.string()
    .min(1, { message: "Start time is required" }),

  endTime: z.string()
    .min(1, { message: "End time is required" }),

  ticketPrice: z.number()
    .min(0, { message: "Ticket price cannot be negative" })
    .optional()
    .default(0),

  totalSeats: z.number()
    .min(1, { message: "Total seats must be at least 1" }),

  availableSeats: z.number()
    .min(0, { message: "Available seats cannot be negative" }),

  category: z.string()
    .min(1, { message: "Please select a category" }),

  status: z.enum(["OPEN", "CLOSED", "CANCELLED"])
    .default("OPEN"),

  bannerImage: z.string().optional(),
})
.refine((data) => {
  if (data.startTime && data.endTime) {
    return data.startTime < data.endTime;
  }
  return true;
}, {
  message: "End time must be after start time",
  path: ["endTime"],
})
.refine((data) => {
  return data.availableSeats <= data.totalSeats;
}, {
  message: "Available seats cannot exceed total seats",
  path: ["availableSeats"],
});