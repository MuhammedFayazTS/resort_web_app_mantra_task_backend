import PackageModel from "../src/models/Package.model.js";

export async function packageSeed() {
    try {
        const packages = [
            {
                title: "Family Staycation",
                description: "A classic family staycation package including accommodation.",
                price: { adult: 1500, child: 1000 }
            },
            {
                title: "Refresh with us",
                description: "Access to all spa facilities along with accommodation.",
                price: { adult: 1800, child: 1800 }
            },
            {
                title: "Ultimate Fun",
                description: "Access to all adventure activities along with accommodation.",
                price: { adult: 2000, child: 2000 }
            }
        ];

        await PackageModel.deleteMany({});
        await PackageModel.insertMany(packages);

        console.log("Package packageSeeding completed successfully");
    } catch (err) {
        console.error("Package packageSeeding failed:", err);
        throw err
    }
}
