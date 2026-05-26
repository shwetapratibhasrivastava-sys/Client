import express from "express";
import {
  createClient,
  deleteClient,
  getClient,
  getClientById,
  updateClient,
} from "../controllers/clientController.js";

const router = express.Router();

router.post("/", createClient);
router.get("/", getClient);
router.get("/:id", getClientById);
router.put("/:id", updateClient);
router.delete("/:id", deleteClient);

export default router;