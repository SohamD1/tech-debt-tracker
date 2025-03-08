import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import { Low } from "lowdb";
import { JSONFile } from "lowdb/node";

const router = express.Router();

// set up __dirname for ES Modules (since it's not available by default)
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Setting up lowDB using the JSONFile adapter for db.json in this folder
const file = path.join(__dirname, "db.json");
const adapter = new JSONFile(file);
const db = new Low(adapter, { defaultData: { debts: [] } });

await db.read();
db.data = db.data || { debts: [] };
await db.write();

// GET /api/debt to get all tech debt entries
router.get("/", async (req, res) => {
  try {
    await db.read();
    const debts = db.data.debts;
    res.status(200).json(debts);
  } catch (error) {
    console.error("Error fetching tech debt entries:", error);
    res.status(500).json({ error: "Server Error" });
  }
});

// GET /api/debt/:id to get entry by id
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    await db.read();
    const debt = db.data.debts.find((d) => d.id === id);
    if (!debt) {
      return res.status(404).json({ error: "Tech debt entry not found" });
    }
    res.status(200).json(debt);
  } catch (error) {
    console.error(`Error fetching tech debt with id ${req.params.id}:`, error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// POST /api/debt  create a new tech debt entry. Expected payload: { title, description, category, severity }
router.post("/", async (req, res) => {
  try {
    const { title, description, category, severity } = req.body;
    if (!title || !description || !category || !severity) {
      return res.status(400).json({ error: "Ensure no fields are empty" });
    }
    const newDebt = {
      id: Date.now().toString(),
      title,
      description,
      category,
      severity,
      status: "open",
      createdAt: new Date().toISOString(),
    };
    await db.read();
    db.data.debts.push(newDebt);
    await db.write();
    res.status(201).json(newDebt);
  } catch (error) {
    console.error("Error creating new tech debt entry:", error);
    res.status(500).json({ error: "Server Error" });
  }
});

// PUT /api/debt/:id updates entry by the id
router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    await db.read();
    const existingDebt = db.data.debts.find((d) => d.id === id);
    if (!existingDebt) {
      return res.status(404).json({ error: "Tech debt entry not found" });
    }
    // Merge existing entry with new data
    Object.assign(existingDebt, req.body);
    await db.write();
    res.status(200).json(existingDebt);
  } catch (error) {
    console.error(`Error updating tech debt with id ${req.params.id}:`, error);
    res.status(500).json({ error: "Server Error" });
  }
});

// DELETE /api/debt/:id - Deletes tech debt entry by the ID
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    await db.read();
    const index = db.data.debts.findIndex((d) => d.id === id);
    if (index === -1) {
      return res.status(404).json({ error: "Tech debt entry not found" });
    }
    db.data.debts.splice(index, 1);
    await db.write();
    res.status(200).json({ message: "Tech debt entry deleted successfully" });
  } catch (error) {
    console.error(`Error deleting tech debt with id ${req.params.id}:`, error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

export default router;
