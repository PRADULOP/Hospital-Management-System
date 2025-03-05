const express = require("express");
const bcrypt = require("bcryptjs");
const mongoose = require("mongoose");
const Doctor = require("../model/Doctor");
const Login = require("../model/Login");
const Role = require("../model/Role");

const router = express.Router();

// Create a new doctor (store login details separately)
router.post("/", async (req, res) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const { email, password, name, specialization, experience, phone, role_id } = req.body;

    // Check if the role exists
    const role = await Role.findById(role_id);
    if (!role) {
      return res.status(400).json({ message: "Invalid role ID" });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Save login details
    const login = new Login({
      email,
      password: hashedPassword,
      role_id,
    });
    const savedLogin = await login.save({ session });

    // Save doctor details
    const doctor = new Doctor({
      name,
      specialization,
      experience,
      phone,
      login_id: savedLogin._id, // Reference to Login table
    });
    const savedDoctor = await doctor.save({ session });

    // Commit transaction
    await session.commitTransaction();
    session.endSession();

    res.status(201).json(savedDoctor);
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    res.status(500).json({ message: error.message });
  }
});

// Get all doctors
router.get("/", async (req, res) => {
  try {
    const doctors = await Doctor.find().populate("login_id", "email role_id");
    res.status(200).json(doctors);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get a doctor by ID
router.get("/:id", async (req, res) => {
  try {
    const doctor = await Doctor.findById(req.params.id).populate("login_id", "email role_id");
    if (!doctor) return res.status(404).json({ message: "Doctor not found" });
    res.status(200).json(doctor);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update a doctor
router.put("/:id", async (req, res) => {
  try {
    const { name, specialization, experience, phone } = req.body;

    const updatedDoctor = await Doctor.findByIdAndUpdate(
      req.params.id,
      { name, specialization, experience, phone },
      { new: true, runValidators: true }
    );

    if (!updatedDoctor) return res.status(404).json({ message: "Doctor not found" });

    res.status(200).json(updatedDoctor);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Delete a doctor
router.delete("/:id", async (req, res) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const doctor = await Doctor.findById(req.params.id);
    if (!doctor) return res.status(404).json({ message: "Doctor not found" });

    // Delete login details
    await Login.findByIdAndDelete(doctor.login_id, { session });

    // Delete doctor record
    await Doctor.findByIdAndDelete(req.params.id, { session });

    await session.commitTransaction();
    session.endSession();

    res.status(200).json({ message: "Doctor deleted successfully" });
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
