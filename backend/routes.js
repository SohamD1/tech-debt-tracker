const express = require("express");
const router = express.Router();

const path = require("path");
// built-in path module

const low = require("lowdb");
const FileSync = require("lowdb/adapters/FileSync");
const adapter = new FileSync(path.join(__dirname, "db.json"));
const db = low(adapter);
// setting up lowDB

db.defaults({ debts: [] }).write();

//GET /api/debt to get all tech debt entries
router.get("/", (req, res) => {
  try {
    const debts = db.get("debts").value();
    res.status(200).json(debts);
  } catch (error) {
    console.error("Error fetching tech debt entries:", error);
    res.status(500).json({ error: "Server Error" });
  }
});

//GET /api/debt/:id to get entry by id

router.get("/:id", (req, res) => {
  try {
    const { id } = req.params;
    const debt = db.get("debts").find({ id }).value();
    if (!debt) {
      return res.status(404).json({ error: "Tech debt entry not found" });
    }
    res.status(200).json(debt);
  } catch (error) {
    console.error(`Error fetching tech debt with id ${req.params.id}:`, error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

//POST /api/debt Create a new tech debt entry. Expected payload: {title, description, category,severity}
router.post("/", (req, res) => {
  try {
    const { title, description, category, severity } = req.body;
    if (!title || !description || !category || !severity) {
      return res.status(400).json({ error: "Ensure no fields are empty" });
    }
    const newDebt = {
      id: Date.now().toString(), //make id from timestamp
      title,
      description,
      category,
      severity,
      status: "open",
      createdAt: new Date().toISOString(),
    };
    db.get("debts").push(newDebt).write();
    res.status(201).json(newDebt);
  } catch (error) {
    console.error("Error creating new tech debt entry:", error);
    res.status(500).json({ error: "Server Error" });
  }
});

// PUT /api/debt/:id updates entry by the id
router.put("/:id", (req, res) => {
  try {
    const { id } = req.params;
    const existingDebt = db.get("debts").find({ id }).value();
    if (!existingDebt) {
      return res.status(404).json({ error: "Tech debt entry not found" });
    }
    const updatedDebt = db.get("debts").find({ id }).assign(req.body).write();

    res.status(200).json(updatedDebt);
  } catch (error) {
    console.error(`Error updating tech debt with id ${req.params.id}:`, error);
    res.status(500).json({ error: " Server Error" });
  }
});

// DELETE /api/debt/:id Deletes tech debt entry by the ID
router.delete("/:id", (req, res) => {
  try {
    const { id } = req.params;
    const existingDebt = db.get("debts").find({ id }).value();
    if (!existingDebt) {
      return res.status(404).json({ error: "Tech debt entry not found" });
    }
    db.get("debts").remove({ id }).write();
    res.status(200).json({ message: "Tech debt entry deleted successfully" });
  } catch (error) {
    console.error(`Error deleting tech debt with id ${req.params.id}:`, error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
