const sequilize = require('../config/connection');



// Commenting this out for now. This will seed the database.
    // const seedDatabase = async () => {
    //     await sequelize.sync({ force: true });
    
    //     await User.bulkCreate(userData, {
    //     individualHooks: true,
    //     returning: true,
    //     });
    
    //     process.exit(0);
    // };
    
    // seedDatabase();