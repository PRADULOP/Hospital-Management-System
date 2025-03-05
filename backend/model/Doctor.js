const mongoose = require("mongoose");

const doctorSchema = new mongoose.Schema({
  loginId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Login", // Reference to the Login table
    required: true,
    unique: true,
  },
  name: {
    type: String,
    required: true,
  },
  specialty: {
    type: String,
    required: true,
  },
  experience: {
    type: Number,
    required: true,
    min: 0,
  },
  availability: [
    {
      day: {
        type: String,
        enum: [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
          "Sunday",
        ],
      },
      timeSlots: [
        {
          startTime: String, // Example: "09:00 AM"
          endTime: String,   // Example: "11:00 AM"
        },
      ],
    },
  ],
  contactInfo: {
    phone: {
      type: String,
      required: true,
      trim: true,
    },
    address: {
      type: String,
    },
  },
  profileImage: {
    type: String, // URL of the profile picture
  },
  bio: {
    type: String, // Short introduction about the doctor
  },
  consultationFee: {
    type: Number,
    required: true,
    min: 0,
  },
  isVerified: {
    type: Boolean,
    default: false, // Admin can verify doctors before they start consultations
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Doctor = mongoose.model("Doctor", doctorSchema);
module.exports = Doctor;
