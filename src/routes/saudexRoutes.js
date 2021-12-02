const express = require("express");
const controllerSaudex = require("../controllers/saudexController");
const router = express.Router();

router.get("/search/endocrinologists", controllerSaudex.searchByAllEndocrinologists);
router.get("/search/supplies", controllerSaudex.searchAllMedicalCentersThatHaveSupplies);
router.get("/search/healthcenter/quantitysupplies", controllerSaudex.searchForQuantityOfDiabetesSuppliesAtTheHealthCenter);
router.get("/search/hospital/quantitysupplies", controllerSaudex.searchForQuantityOfDiabetesSuppliesAtTheHospital);
router.get("/search/healthcenter/attendancepassword", controllerSaudex.searchForHealthCentersByNumberOfServiceTickets);
router.get("/search/hospital/attendancepassword", controllerSaudex.searchForHospitalsByNumberOfServiceTickets);
router.get("/search/healthcenter/name", controllerSaudex.searchAllHealthCentersByName);
router.get("/search/hospital/name", controllerSaudex.searchAllHospitalsByName);
router.get("/search/pharmacy/name", controllerSaudex.searchAllPharmaciesByName);
router.get("/search/healthcenter/municipality", controllerSaudex.searchAllHealthCentersByMunicipality);
router.get("/search/hospital/municipality", controllerSaudex.searchAllHospitalsByMunicipality);
router.get("/search/pharmacy/municipality", controllerSaudex.searchPharmaciesByMunicipality);
router.get("/pharmacy/popularprogram", controllerSaudex.findAllPharmacies);




module.exports = router