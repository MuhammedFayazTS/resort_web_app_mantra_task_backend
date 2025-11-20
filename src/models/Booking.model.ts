import mongoose from "mongoose";

const BookingSchema = new mongoose.Schema(
    {
        name: { type: String, required: true },
        email: { type: String, required: true },
        phone: { type: String, required: true },
        address: { type: String, required: true },

        checkInDate: { type: Date, required: true },
        checkOutDate: { type: Date, required: true },

        adults: { type: Number, required: true },
        children: { type: Number, required: true },

        packageType: { type: String },
        status: { type: String, enum: ["booked", "checkedIn", "checkedOut", "cancelled"], default: "booked" },

        accommodation: { type: Boolean, default: false },
        adventureActivities: { type: Boolean, default: false },
        wellnessSpa: { type: Boolean, default: false },

        specialRequest: { type: String }
    },
    { timestamps: true }
);

export default mongoose.model("Booking", BookingSchema);
