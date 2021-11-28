const express = require("express");
const controllerSaudex = require("../controllers/saudexController");
const router = express.Router();

router.get("/search/endocrinologists", controllerSaudex.searchByAllEndocrinologists);
router.get("/search/supplies", controllerSaudex.searchAllMedicalCentersThatHaveSupplies);
router.get("/search/quantysupplies", controllerSaudex.searchForMedicalCentersByNumberOfServiceTickets);
router.get("/search/healthcenter/name", controllerSaudex.searchAllHealthCentersByName);
router.get("/search/hospital/name", controllerSaudex.searchAllHospitalsByName);
router.get("/search/pharmacy/name", controllerSaudex.searchAllPharmaciesByName);
router.get("/search/healthcenter/municipality", controllerSaudex.searchAllHealthCentersByMunicipality);
router.get("/search/hospital/municipality", controllerSaudex.searchAllHospitalsByMunicipality);
router.get("/search/pharmacy/municipality", controllerSaudex.searchPharmaciesByMunicipality);



module.exports = router