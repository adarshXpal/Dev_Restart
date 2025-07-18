const express = require("express");
const router = express.Router();
const { register, login, profileController } = require("../controllers/auth.controller");
const authenticate = require("../middlewares/authenticate");

router.post('/register', register);
router.post('/login', login);
router.get('/profile', authenticate, profileController);
module.exports = router;
