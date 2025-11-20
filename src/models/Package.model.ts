import mongoose from "mongoose";

const packageSchema = new mongoose.Schema({
    title: { type: String, required: true, index: true },
    description: { type: String, required: true },
    price: {
        // TODO: currently price is per day, can be scaled with duration in package itself
        adult: { type: Number, required: true },
        child: { type: Number, required: true }
    },
});

export default mongoose.model("Package", packageSchema);