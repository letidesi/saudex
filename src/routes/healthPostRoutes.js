const express = require("express");
const router = express.Router();
const { checkToken } = require("../middlewares/auth");
const controllerHealthPost = require("../controllers/healthPostController");

router.get("/healthpost", checkToken, controllerHealthPost.findAllHealthPosts);
router.get("/healthpost/search/name", checkToken, controllerHealthPost.searchAllHealthPostsByName);
router.get("/healthpost/search/municipality", checkToken, controllerHealthPost.searchAllHealthPostsByMunicipality);
router.post("/healthpost/register", checkToken, controllerHealthPost.registerHealthPost);
router.get("/healthpost/search/:id", checkToken, controllerHealthPost.searchHealthPostById);
router.put("/healthpost/update/:id", checkToken, controllerHealthPost.updateHealthPostById);
router.delete("/healthpost/delete/:id",checkToken, controllerHealthPost.deleteHealthPostById);



module.exports = router;

