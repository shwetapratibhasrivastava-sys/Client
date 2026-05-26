import express from "express";
import {
  createClient,
  deleteClient,
  getClient,
  getClientById,
  updateClient,
} from "../controllers/clientController.js";

const clientRoute = express.Router();

clientRoute.post("/", createClient);
clientRoute.get("/", getClient);
clientRoute.get("/:id", getClientById);
clientRoute.put("/:id", updateClient);
clientRoute.delete("/:id", deleteClient);

export default clientRoute;