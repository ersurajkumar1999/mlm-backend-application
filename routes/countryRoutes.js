const express = require('express');
const { create, getCountries, findCountry } = require('../controllers/CountryController');
const { auth, isAdmin } = require('../middlewares/authMiddleware');
const router = express.Router();

router.post('/country/create',auth, isAdmin, create);
router.get('/countries/', auth, isAdmin, getCountries);
router.get('/country/:id', auth, isAdmin, findCountry);
// router.put('/country/:id', auth, isAdmin, create);
// router.delete('/country/:id', auth, isAdmin, create)

module.exports = router;