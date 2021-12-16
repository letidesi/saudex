const express = require("express");
const router = express.Router();
const { checkToken } = require("../middlewares/auth");
const controllerPharmacy = require("../controllers/pharmacyController");

router.get("/pharmacy", checkToken, controllerPharmacy.findAllPharmacies);
router.get("/pharmacy/search/name", checkToken, controllerPharmacy.searchAllPharmaciesByName);
router.get("/pharmacy/search/municipality", checkToken, controllerPharmacy.searchPharmaciesByMunicipality);
router.post("/pharmacy/register", checkToken, controllerPharmacy.registeringPharmacies);
router.get("/pharmacy/search/:id", checkToken, controllerPharmacy.searchPharmacyById);
router.put("/pharmacy/update/:id", checkToken, controllerPharmacy.updatePharmacyById);
router.delete("/pharmacy/delete/:id", checkToken, controllerPharmacy.deletePharmacyById);

module.exports = router


