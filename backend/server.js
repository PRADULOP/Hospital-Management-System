const express = require('express');

const cors = require('cors');
require('dotenv').config();
require('./db/connection');

const doctorRoutes = require("./routes/doctorRoutes");

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/doctors", doctorRoutes);



// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));