const express = require("express");
const router = express.Router();
const controllerHospital = require("../controllers/hospitalController");

router.get("/hospital", controllerHospital.checkToken, controllerHospital.findAllHospitals);
router.get("/hospital/search/name", controllerHospital.checkToken, controllerHospital.searchAllHospitalsByName);
router.get("/hospital/search/municipality", controllerHospital.checkToken, controllerHospital.searchAllHospitalsByMunicipality);
router.post("/hospital/register", controllerHospital.checkToken, controllerHospital.registeringHospitals);
router.get("/hospital/search/:id", controllerHospital.searchHospitalById);
router.put("/hospital/update/:id", controllerHospital.checkToken, controllerHospital.updateHospitalById);
router.delete("/hospital/delete/:id", controllerHospital.checkToken, controllerHospital.deleteHospitalById);


module.exports = router



