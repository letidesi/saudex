const express = require("express");
const cors = require("cors");

require("dotenv-safe").config();
const db = require("./database/mongoConfig");

const admRoutes = require("./routes/admRoutes");
const hospitalRoutes = require("./routes/hospitalRoutes");
const healthCenterRoutes = require("./routes/healthCenterRoutes");
const pharmacyRoutes = require("./routes/pharmacyRoutes");
const saudexRoutes = require("./routes/saudexRoutes");

const app = express();
app.use(cors());
app.use(express.json());


app.use("/saudex", admRoutes);
app.use("/saudex", hospitalRoutes);
app.use("/saudex", healthCenterRoutes);
app.use("/saudex", pharmacyRoutes);
app.use("/saudex", saudexRoutes);

db.connect();
module.exports = app;
