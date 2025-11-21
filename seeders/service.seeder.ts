import ServiceModel from '../src/models/Services.model.js';

export async function serviceSeed() {
  try {
    const services = [
      {
        title: 'Accommodation',
        description: 'Accommodation for guests.',
      },
      {
        title: 'Adventure Activities',
        description: 'Adventure activities for guests.',
      },
      {
        title: 'Wellness Spa',
        description: 'Access to all spa facilities for guests.',
      },
      {
        title: 'Food & Beverages',
        description: 'Food and beverage services for guests.',
      },
    ];


    const existing = await ServiceModel.find(
      { title: { $in: services.map(s => s.title) } },
      { title: 1 }
    );

    const existingTitles = new Set(existing.map(e => e.title));

    const newServices = services.filter(service => !existingTitles.has(service.title));

    if (newServices.length === 0) {
      console.log("All services already exist. Skipping insert.");
      return;
    }

    await ServiceModel.insertMany(newServices);

    console.log('Service Seeding completed successfully');
  } catch (err) {
    console.error('Service seeding failed:', err);
    throw err;
  }
}
