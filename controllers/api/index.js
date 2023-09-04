const router = require("express").Router();
const userRoutes = require("./userRoutes");
const dogRoutes = require("./dogRoutes");
const adoptionFormRoutes = require("./adoptionFormRoutes");

router.use("/users", userRoutes);
router.use("/dogs", dogRoutes);
router.use("/adoption-form", adoptionFormRoutes);

module.exports = router;
