import Client from "../models/clientModel.js";

// CREATE
export const createClient = async (req, res) => {
  try {
    const { name, email, phone } = req.body;

    if (!name || !email || !phone) {
      return res.status(400).json({
        message: "All fields are required",
      });
    }

    const existingClient = await Client.findOne({ email });

    if (existingClient) {
      return res.status(400).json({
        message: "Client already exists",
      });
    }

    const client = await Client.create({ name, email, phone });

    res.status(201).json({
      message: "Client created successfully",
      data: client,
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET ALL
export const getClient = async (req, res) => {
  try {
    const clients = await Client.find();
    res.status(200).json(clients);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET BY ID
export const getClientById = async (req, res) => {
  try {
    const client = await Client.findById(req.params.id);

    if (!client) {
      return res.status(404).json({ message: "Client not found" });
    }

    res.status(200).json(client);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// UPDATE
export const updateClient = async (req, res) => {
  try {
    const client = await Client.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!client) {
      return res.status(404).json({ message: "Client not found" });
    }

    res.status(200).json({
      message: "Client updated",
      data: client,
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// DELETE
export const deleteClient = async (req, res) => {
  try {
    const client = await Client.findByIdAndDelete(req.params.id);

    if (!client) {
      return res.status(404).json({ message: "Client not found" });
    }

    res.status(200).json({
      message: "Client deleted",
      data: client,
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};