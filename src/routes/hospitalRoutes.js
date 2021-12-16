const express = require("express");
const router = express.Router();
const { checkToken } = require("../middlewares/auth");
const controllerHospital = require("../controllers/hospitalController");

router.get("/hospital", checkToken, controllerHospital.findAllHospitals);
router.get("/hospital/search/name", checkToken, controllerHospital.searchAllHospitalsByName);
router.get("/hospital/search/municipality", checkToken, controllerHospital.searchAllHospitalsByMunicipality);
router.post("/hospital/register", checkToken, controllerHospital.registeringHospitals);
router.get("/hospital/search/:id", checkToken, controllerHospital.searchHospitalById);
router.put("/hospital/update/:id", checkToken, controllerHospital.updateHospitalById);
router.delete("/hospital/delete/:id", checkToken, controllerHospital.deleteHospitalById);


module.exports = router



