import express from "express";
import db from "../db/conn.mjs";
import { ObjectId } from "mongodb";

const router = express.Router();

// Get all user records
router.get("/", async (req, res) => {
  let collection = db.collection("user");
  let results = await collection.find({}).toArray();
  res.send(results).status(200);
});

// Get a single user record by id
router.get("/:id", async (req, res) => {
  let collection = db.collection("user");
  let query = { _id: new ObjectId(req.params.id) };
  let result = await collection.findOne(query);

  if (!result) {
    res.send("Not found").status(404);
  } else {
    res.send(result).status(200);
  }
});

// Create a new user record
router.post("/", async (req, res) => {
  let newDocument = {
    name: req.body.name,
    email: req.body.email,
    skills: req.body.skills
  };
  let collection = db.collection("user");
  let result = await collection.insertOne(newDocument);
  res.send(result).status(204);
});

// Update a user record by id
router.patch("/:id", async (req, res) => {
  const query = { _id: new ObjectId(req.params.id) };
  const updates = {
    $set: {
      email: req.body.email,
      name: req.body.name,
      skills: req.body.skills
    }
  };

  let collection = db.collection("user");
  let result = await collection.updateOne(query, updates);
  res.send(result).status(200);
});

// Delete a user record by id
router.delete("/:id", async (req, res) => {
  const query = { _id: new ObjectId(req.params.id) };
  const collection = db.collection("user");
  let result = await collection.deleteOne(query);
  res.send(result).status(200);
});


export default router;
