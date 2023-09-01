const router = require("express").Router();
const { Dogs, User } = require("../models");
const withAuth = require("../utils/auth");

// Render the homepage
router.get("/", async (req, res) => {
  res.render("home", { logged_in: req.session.logged_in });
});

// Pass the dog db data when rendering the Dogs for Adoption page
router.get("/available_dogs", async (req, res) => {
  try {
    const dogData = await Dogs.findAll();

    const dogs = dogData.map((dog) => dog.get({ plain: true }));

    res.render("available_dogs", {
      dogs,
      logged_in: req.session.logged_in,
    });
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

// Render the login page if the user is NOT logged in. Otherwise, redirect to the homepage
router.get("/login", (req, res) => {
  // If the user is already logged in, redirect the request to the homepage
  if (req.session.logged_in) {
    res.redirect("/home");
    return;
  }
  res.render("login", { logged_in: req.session.logged_in });
});

// Render the "Under Construction" page when clicking on Sponsors in the navbar
router.get("/sponsors", (req, res) => {
  res.render("future_dev", { logged_in: req.session.logged_in });
});

// Render the "Under Construction" page when clicking on Volunteers in the navbar
router.get("/volunteers", (req, res) => {
  res.render("future_dev", { logged_in: req.session.logged_in });
});

module.exports = router;
