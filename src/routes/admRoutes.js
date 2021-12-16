const express = require("express");
const router = express.Router();
const { checkToken } = require("../middlewares/auth");
const controllerAdm = require("../controllers/admController");

router.get("/message", checkToken, controllerAdm.message_one);
router.get("/adm", checkToken, controllerAdm.findAllAdm);
router.post("/register/admin", controllerAdm.createAdm);
router.post("/login/admin", controllerAdm.loginAdm);
router.get("/admin/:id", checkToken, controllerAdm.searchAdminById);
router.put("/update/admin/:id", checkToken, controllerAdm.updateAdmById);
router.delete("/delete/admin/:id", checkToken, controllerAdm.deleteAdmById);

module.exports = router;
