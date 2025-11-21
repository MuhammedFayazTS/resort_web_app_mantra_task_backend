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

    await ServiceModel.deleteMany({});
    await ServiceModel.insertMany(services);

    console.log('Service Seeding completed successfully');
  } catch (err) {
    console.error('Service seeding failed:', err);
    throw err;
  }
}
