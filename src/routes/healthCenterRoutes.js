const express = require("express");
const router = express.Router();
const controllerHealthCenter = require("../controllers/healthCenterController");

router.get("/healthcenter", controllerHealthCenter.checkToken, controllerHealthCenter.findAllHealthCenters);
router.get("/healthcenter/search/name", controllerHealthCenter.checkToken, controllerHealthCenter.searchAllHealthCentersByName);
router.get("/healthcenter/search/municipality", controllerHealthCenter.checkToken, controllerHealthCenter.searchAllHealthCentersByMunicipality);
router.post("/healthcenter/register", controllerHealthCenter.checkToken, controllerHealthCenter.registerHealthCenter);
router.get("/healthcenter/search/:id", controllerHealthCenter.checkToken, controllerHealthCenter.searchHealthCenterById);
router.put("/healthcenter/update/:id", controllerHealthCenter.checkToken, controllerHealthCenter.updateHealthCenterById);
router.delete("/healthcenter/delete/:id",controllerHealthCenter.checkToken, controllerHealthCenter.deleteHealthCenterById);



module.exports = router;
