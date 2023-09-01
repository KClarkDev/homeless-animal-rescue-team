const router = require("express").Router();
const { Dogs, User } = require("../models");
const withAuth = require("../utils/auth");
const fs = require("fs");

// router.get('/', async (req, res) => {
//   res.render('home');
// });

router.get("/", async (req, res) => {
  try {
    // Get all dog data
    const dogData = await Dogs.findAll();

    // Serialize data so the template can read it
    const dogs = dogData.map((post) => post.get({ plain: true }));

    // Pass serialized data and session flag into the homepage template
    res.render("home", {
      // dogs,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

function getSeedData() {
  return new Promise((resolve, reject) => {
      fs.readFile('seeds/dog.json', (err, data) => {
          if (err) {
              reject(err);
              return;
          }
          const parsedData = JSON.parse(data);
          resolve(parsedData);
      });
  });
}

router.get("/available_dogs", async (req, res) => {
  try {
    console.log("Template rendering is working!");
    const seedData = await getSeedData();
    console.log(seedData);
    
    // const dogData = await Dog.findAll();

    // const dogTemplate = dogData.map((dog) => dog.get({ plain: true }));

    res.render("available_dogs", {seedData});
  } catch (err) {
    res.status(500).json(err);
  }
});

// Use withAuth middleware to prevent access to route
router.get("/application", withAuth, async (req, res) => {
  try {
    // Find the logged in user based on the session ID
    const userData = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ["password"] },
    });

    const user = userData.get({ plain: true });

    res.render("application", {
      ...user,
      logged_in: true,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});


router.get("/login", (req, res) => {
  // If the user is already logged in, redirect the request to another route
  if (req.session.logged_in) {
    res.redirect("/home");
    return;
  }

  res.render("login");
});

router.get("/application", (req, res) => {
 

  res.render("application");
});

router.get("/sponsors", (_req, res) => {
  res.render("future_dev");
});

router.get("/volunteers", (_req, res) => {
  res.render("future_dev");
});

module.exports = router;
