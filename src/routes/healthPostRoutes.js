const express = require("express");
const router = express.Router();
const controllerHealthPost = require("../controllers/healthPostController");

router.get("/healthpost", controllerHealthPost.checkToken, controllerHealthPost.findAllHealthPosts);
router.get("/healthpost/search/name", controllerHealthPost.checkToken, controllerHealthPost.searchAllHealthPostsByName);
router.get("/healthpost/search/municipality", controllerHealthPost.checkToken, controllerHealthPost.searchAllHealthPostsByMunicipality);
router.post("/healthpost/register", controllerHealthPost.checkToken, controllerHealthPost.registerHealthPost);
router.get("/healthpost/search/:id", controllerHealthPost.checkToken, controllerHealthPost.searchHealthPostById);
router.put("/healthpost/update/:id", controllerHealthPost.checkToken, controllerHealthPost.updateHealthPostById);
router.delete("/healthpost/delete/:id",controllerHealthPost.checkToken, controllerHealthPost.deleteHealthPostById);



module.exports = router;

