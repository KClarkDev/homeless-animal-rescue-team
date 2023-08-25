const sequelize = require('../config/connection');
const User = require('../models/User'); // Assuming you have a User model
const Dog = require('../models/Dog');
const userData = require('./user.json'); // Assuming you have user data
const dogData = require('./dog.json');

const seedDatabase = async () => {
  try {
    await sequelize.sync({ force: true });

    await User.bulkCreate(userData, {
      individualHooks: true,
      returning: true,
    });

    await Dog.bulkCreate(dogData);

    console.log('Database seeded successfully.');
  } catch (error) {
    console.error('Error seeding database:', error);
  }

  process.exit(0);
};

seedDatabase();
