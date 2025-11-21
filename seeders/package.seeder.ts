import PackageModel from '../src/models/Package.model.js';

export async function packageSeed() {
  try {
    const packages = [
      {
        title: 'Family Staycation',
        description:
          'A classic family staycation package including accommodation.',
        price: { adult: 1500, child: 1000 },
      },
      {
        title: 'Refresh with us',
        description: 'Access to all spa facilities along with accommodation.',
        price: { adult: 1800, child: 1800 },
      },
      {
        title: 'Ultimate Fun',
        description:
          'Access to all adventure activities along with accommodation.',
        price: { adult: 2000, child: 2000 },
      },
    ];

    const existing = await PackageModel.find(
      { title: { $in: packages.map(p => p.title) } },
      { title: 1 }
    );

    const existingTitles = new Set(existing.map(e => e.title));

    const newPackages = packages.filter(pkg => !existingTitles.has(pkg.title));

    if (newPackages.length === 0) {
      console.log("All packages already exist. Skipping insert.");
      return;
    }

    await PackageModel.insertMany(newPackages);

    console.log('Package packageSeeding completed successfully');
  } catch (err) {
    console.error('Package packageSeeding failed:', err);
    throw err;
  }
}
