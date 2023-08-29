const router = require("express").Router();
const { Dogs, User } = require("../models");
const withAuth = require("../utils/auth");

// router.get('/', async (req, res) => {
//   res.render('home');
// });

router.get("/", async (req, res) => {
  try {
    // Get all blog posts and JOIN with user data
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

// Use withAuth middleware to prevent access to route
router.get("/dashboard", withAuth, async (req, res) => {
  try {
    // Find the logged in user based on the session ID
    const userData = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ["password"] },
      include: [{ model: BlogPost }],
    });

    const user = userData.get({ plain: true });

    res.render("dashboard", {
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
    res.redirect("/dashboard");
    return;
  }

  res.render("login");
});

router.get("/application", (req, res) => {
 

  res.render("application");
});

module.exports = router;
