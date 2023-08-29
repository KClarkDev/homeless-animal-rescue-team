const bcrypt = require('bcrypt');
const sequelize = require('../config/connection');
const User = require('../models/User'); 
const Dog = require('../models/Dog');
const userData = require('./user.json'); 
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
