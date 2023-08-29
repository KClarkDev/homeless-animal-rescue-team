const router = require("express").Router();
const { Dogs } = require("../../models");

router.get("/dogs", async (req, res) => {
    try {
      const dbDogsData = await Dog.findAll(); // Retrieve all dog data from the database
      res.json(dbDogsData);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "An error occurred while fetching dog data." });
    }
  });

  // router.get("/dogs/name", async (req, res) => {

  // router.get("/dogs/breed", async (req, res) => {

  // router.get("/dogs/age", async (req, res) => {
  
  // router.get("/dogs/gender", async (req, res) => {
  

