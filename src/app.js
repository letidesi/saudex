const express = require("express");
const cors = require("cors");

require("dotenv-safe").config();
const db = require("./database/mongoConfig");

const indexRoutes = require("./routes/indexRoutes");
const admRoutes = require("./routes/admRoutes");
const hospitalRoutes = require("./routes/hospitalRoutes");
const healthPostRoutes = require("./routes/healthPostRoutes");
const pharmacyRoutes = require("./routes/pharmacyRoutes");
const saudexRoutes = require("./routes/saudexRoutes");

const app = express();
app.use(cors());
app.use(express.json());

app.use("/", indexRoutes);
app.use("/saudex", admRoutes);
app.use("/saudex", hospitalRoutes);
app.use("/saudex", healthPostRoutes);
app.use("/saudex", pharmacyRoutes);
app.use("/saudex", saudexRoutes);

db.connect();
module.exports = app;
