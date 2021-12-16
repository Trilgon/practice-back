const Router = require("express");
const express = require("express");

const urlencodedParser = express.urlencoded({ extended: false });

const router = new Router();

const userController = require("../controllers/user.controllers");

router.post("/auth", userController.userAuth);
router.post("/selTask", userController.selTask);
// router.post("/adminAddTask", userController.adminAddTask);
// router.post("/adminAddEmp", userController.adminAddEmp);

module.exports = router;
