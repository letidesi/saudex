const express = require("express");
const router = express.Router();
const controllerPharmacy = require("../controllers/pharmacyController");

router.get("/pharmacy", controllerPharmacy.checkToken, controllerPharmacy.findAllPharmacies);
router.get("/pharmacy/search/name", controllerPharmacy.checkToken, controllerPharmacy.searchAllPharmaciesByName);
router.get("/pharmacy/search/municipality", controllerPharmacy.checkToken, controllerPharmacy.searchPharmaciesByMunicipality);
router.post("/pharmacy/register", controllerPharmacy.checkToken, controllerPharmacy.registeringPharmacies);
router.get("/pharmacy/search/:id", controllerPharmacy.checkToken, controllerPharmacy.searchPharmacyById);
router.put("/pharmacy/update/:id", controllerPharmacy.checkToken, controllerPharmacy.updatePharmacyById);
router.delete("/pharmacy/delete/:id", controllerPharmacy.checkToken, controllerPharmacy.deletePharmacyById);

module.exports = router