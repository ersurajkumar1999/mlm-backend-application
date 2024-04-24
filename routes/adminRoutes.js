const router = require("express").Router();
const { getProfile } = require("../controllers/AdminController");
const { auth } = require("../middlewares/authMiddleware");

router.post('/profile', auth, getProfile);


module.exports = router;