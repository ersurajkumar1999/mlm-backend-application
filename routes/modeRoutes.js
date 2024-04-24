const express = require('express');
const router = express.Router();
// const { auth } = require('../middlewares/authMiddleware');
const { create, getAllModes } = require('../controllers/ModeController');

router.post('/mode/create', create);
router.post('/modes', getAllModes);

module.exports = router;