import z from "zod";

export const bookingValidationSchema = z.object({
    name: z.string().min(2, "Name is required"),
    email: z.email("Invalid email address"),
    phone: z.string().min(7, "Phone number is too short"),

    checkInDate: z.string().min(1, "Check-in date is required"),
    checkOutDate: z.string().min(1, "Check-out date is required"),

    adults: z.coerce.number().min(1, "At least 1 adult required"),
    children: z.coerce.number().min(0),

    roomType: z.string().min(1, "Select a room type"),

    accommodation: z.boolean().optional(),
    adventureActivities: z.boolean().optional(),
    wellnessSpa: z.boolean().optional(),

    specialRequest: z.string().optional()
})