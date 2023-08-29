const router = require("express").Router();
const { User, Dog } = require("../models");
const withAuth = require("../utils/auth");

// Render the homepage
router.get("/", async (req, res) => {
  res.render("home");
});

// Route for passing in dog data to be rendered in the homepage
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

router.get("/available_dogs", async (req, res) => {
  try {
    console.log("Template rendering is working!");
    // const dogData = await Dog.findAll();

    // const dogTemplate = dogData.map((dog) => dog.get({ plain: true }));

    res.render("available_dogs", {
      // dogTemplate,
      // logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// Renders the adoption form application page
// Use withAuth middleware to prevent access to route if user is not logged in
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

// Renders the login page. If a route uses authentication to only render a page if the user is logged in, the withAuth function will redirect to this route
router.get("/login", (req, res) => {
  // If the user is already logged in, redirect the request to another route
  if (req.session.logged_in) {
    res.redirect("/home");
    return;
  }

  res.render("login");
});

module.exports = router;
