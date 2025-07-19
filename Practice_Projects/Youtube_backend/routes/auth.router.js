const express = require("express");
const router = express.Router();
const controller = require("../controllers");
const authenticate = require("../middlewares/authenticate");

router.post('/register', controller.authController.register);
router.post('/login', controller.authController.login);
router.get('/profile', authenticate, controller.authController.profileController);
module.exports = router;
