const express = require("express");
const router = express.Router();
const controllerAdm = require("../controllers/admController");

router.get("/message", controllerAdm.checkToken, controllerAdm.message_one);
router.get("/adm", controllerAdm.checkToken, controllerAdm.findAllAdm);
router.post("/register/admin", controllerAdm.createAdm);
router.post("/login/admin", controllerAdm.loginAdm);
router.get("/admin/:id", controllerAdm.checkToken, controllerAdm.searchAdminById);
router.put("/update/admin/:id", controllerAdm.checkToken, controllerAdm.updateAdmById);
router.delete("/delete/admin/:id", controllerAdm.checkToken, controllerAdm.deleteAdmById);

module.exports = router;

