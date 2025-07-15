const express = require("express");
const router = express.Router();
const authGuard = require("../middleware/user-guard");
const UserController = require("../controllers/usercontroller");

router.post("/login", UserController.userLogin);
router.post("/register", UserController.registerUser);

module.exports = router;
