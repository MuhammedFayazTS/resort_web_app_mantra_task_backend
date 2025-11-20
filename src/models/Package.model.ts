import mongoose from "mongoose";

const packageSchema = new mongoose.Schema({
    title: { type: String, required: true, index: true },
    description: { type: String },
    price: {
        // TODO: currently price is per day, can be scaled with duration in package itself
        adult: { type: Number, required: true },
        child: { type: Number, required: true }
    },
    services: [{ type: mongoose.Schema.Types.ObjectId, ref: "Service" }]
});

export default mongoose.model("Package", packageSchema);