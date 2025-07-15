const express = require("express");
const router = express.Router();
const authGuard = require("../middleware/user-guard");
const UserController = require("../controllers/usercontroller");

router.post("/login", authGuard, UserController.userLogin);
router.post("/register", authGuard, UserController.registerUser);

module.exports = router;
