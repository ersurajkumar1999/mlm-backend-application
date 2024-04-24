const express = require('express');
const { create, getCities } = require('../controllers/CityController');
const router = express.Router();

router.post('/city/create', create);
router.get('/cities/', getCities);
// router.get('/city/:id', checkHome);
// router.put('/city/:id', checkHome);
// router.delete('/city/:id', checkHome)

module.exports = router;