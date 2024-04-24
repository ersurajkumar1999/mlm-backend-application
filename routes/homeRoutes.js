const express = require('express');
const router = express.Router();
const { checkHome } = require('../controllers/HomeController');


router.get('/', checkHome);

module.exports = router;