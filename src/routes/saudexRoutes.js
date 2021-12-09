const express = require("express");
const controllerSaudex = require("../controllers/saudexController");
const router = express.Router();

router.get("/search/endocrinologists", controllerSaudex.searchByAllEndocrinologists);
router.get("/search/supplies", controllerSaudex.searchAllMedicalCentersThatHaveSupplies);
router.get("/search/healthpost/quantitysupplies", controllerSaudex.searchForQuantityOfDiabetesSuppliesAtTheHealthPost);
router.get("/search/hospital/quantitysupplies", controllerSaudex.searchForQuantityOfDiabetesSuppliesAtTheHospital);
router.get("/search/healthpost/attendancepassword", controllerSaudex.searchForHealthPostsByNumberOfServiceTickets);
router.get("/search/hospital/attendancepassword", controllerSaudex.searchForHospitalsByNumberOfServiceTickets);
router.get("/search/healthpost/name", controllerSaudex.searchAllHealthPostsByName);
router.get("/search/hospital/name", controllerSaudex.searchAllHospitalsByName);
router.get("/search/pharmacy/name", controllerSaudex.searchAllPharmaciesByName);
router.get("/search/healthpost/municipality", controllerSaudex.searchAllHealthPostsByMunicipality);
router.get("/search/hospital/municipality", controllerSaudex.searchAllHospitalsByMunicipality);
router.get("/search/pharmacy/municipality", controllerSaudex.searchPharmaciesByMunicipality);
router.get("/pharmacy/popularprogram", controllerSaudex.findAllPharmacies);
router.get("/all", controllerSaudex.findAllHealthCenters);




module.exports = router