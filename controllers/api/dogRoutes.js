const router = require("express").Router();
const { Dogs } = require("../../models");
//Get's all the dogs
router.get("/dogs", async (req, res) => {
  try {
    const dbDogsData = await Dogs.findAll();
    res.json(dbDogsData);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "An error occurred while fetching dog data." });
  }
});
//Get's the Name
router.get("/dogs/name", async (req, res) => {
  try {
    const dogsByName = await Dogs.findAll({
      order: [["name", "ASC"]],
    });
    res.json(dogsByName);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "An error occurred while fetching dog data by name." });
  }
});
//Get's the Breed
router.get("/dogs/breed", async (req, res) => {
  try {
    const dogsByBreed = await Dogs.findAll({
      order: [["breed", "ASC"]],
    });
    res.json(dogsByBreed);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "An error occurred while fetching dog data by breed." });
  }
});
//Get's the Age
router.get("/dogs/age", async (req, res) => {
  try {
    const dogsByAge = await Dogs.findAll({
      order: [["age", "ASC"]],
    });
    res.json(dogsByAge);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "An error occurred while fetching dog data by age." });
  }
});
//Gets the Gender
router.get("/dogs/gender", async (req, res) => {
  try {
    const dogsByGender = await Dogs.findAll({
      order: [["gender", "ASC"]],
    });
    res.json(dogsByGender);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "An error occurred while fetching dog data by gender." });
  }
});

module.exports = router;


