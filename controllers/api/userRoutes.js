const router = require("express").Router();
const { User } = require("../../models");
const sendEmail = require("../../utils/courier");

// creates a new user, adds their record to the users table in the database, and starts a user session upon successful creation
router.post("/", async (req, res) => {
  try {
    const userData = await User.create(req.body);

    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.logged_in = true;

      res.status(200).json(userData);
    });
  } catch (err) {
    res.status(400).json(err);
  }
});

//Route to Serve the adoption form.

router.get("/adopt", async (req, res) => {
  try {
    const userId = req.session.user_id; // Get the logged-in user's ID from the session
    if (!userId) {
      res.redirect("/login"); // Redirect to login if not logged in
      return;
    }

    // Fetch user's previous application data
    const user = await User.findByPk(userId);

    res.render("adoption-form", { layout: "application", user }); // Render the Handlebars template and pass user data
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "An error occurred while fetching user data." });
  }
});

// Route to handle adoption form submission - this will update the data in the users record in the database
router.put("/adopt-update", async (req, res) => {
  try {
    console.log("Within PUT request");
    const userId = req.session.user_id; // Get the logged-in user's ID from the session
    if (!userId) {
      res.redirect("/login"); // Redirect to login if not logged in
      return;
    }

    // Extract form data from the request body
    const {
      first_name,
      last_name,
      address,
      email,
      phone,
      previous_adopter,
      pets_owned,
    } = req.body;

    // Construct an object with the fields you want to update
    const updatedUserData = {
      first_name,
      last_name,
      address,
      email,
      phone,
      previous_adopter,
      pets_owned,
    };

    // Use a PUT query to update the user's record in the database
    await User.update(updatedUserData, {
      where: { id: userId }, // Specify the user to update based on their ID
    });
    console.log("User data updated!");
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "An error occurred while saving adoption data." });
  }
});

// validates if email and password exist in the database for logging in, and returns an error 400 if not valid.
router.post("/login", async (req, res) => {
  try {
    const userData = await User.findOne({ where: { email: req.body.email } });

    if (!userData) {
      res
        .status(400)
        .json({ message: "Incorrect email or password, please try again" });
      return;
    }

    const validPassword = await userData.checkPassword(req.body.password);

    if (!validPassword) {
      res
        .status(400)
        .json({ message: "Incorrect email or password, please try again" });
      return;
    }

    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.logged_in = true;

      res.json({ user: userData, message: "You are now logged in!" });
    });
  } catch (err) {
    res.status(400).json(err);
  }
});

router.post("/send-email", async (req, res) => {
  try {
    const emailData = req.body;
    const result = await sendEmail(emailData);
    res.json({ success: true, message: "Email sent successfully", result });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Email sending failed" });
  }
});

router.post("/logout", (req, res) => {
  if (req.session.logged_in) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

module.exports = router;
