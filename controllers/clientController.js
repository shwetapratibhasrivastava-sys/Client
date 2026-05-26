import Client from "../models/clientModel.js";

export const createClient = async (req, res) => {
  try {
    const { name, email, phone } = req.body;

    if (!name || !email || !phone) {
      return res.json({
        message: "All fields are required",
      });
    }

    const existingClient = await Client.findOne({ email });

    if (existingClient) {
      return res.json({
        message: "Client already exists",
        data: existingClient,
      });
    }

    const client = await Client.create({ name, email, phone });

    res.status(200).json({
      message: "Client created successfully",
      data: client,
    });
  } catch (error) {
    res.json({
      message: error.message,
    });
  }
};

export const getClient = async (req, res) => {
  try {
    const client = await Client.find();
    res.json(client);
  } catch (error) {
    res.json(error.message);
  }
};

export const getClientById = async (req, res) => {
  try {
    const client = await Client.findById(req.params.id);
    res.json(client);
  } catch (error) {
    res.json(error.message);
  }
};

export const updateClient = async (req, res) => {
  try {
    const client = await Client.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json({ message: "Client updated", data: client });
  } catch (error) {
    res.json(error.message);
  }
};

export const deleteClient = async (req, res) => {
  try {
    const client = await Client.findByIdAndDelete(req.params.id);
    res.json({ message: "Client deleted", data: client });
  } catch (error) {
    res.json(error.message);
  }
};