const express = require('express');
const router = express.Router();
const { auth, isAdmin } = require('../middlewares/authMiddleware');
const { create, getStates } = require('../controllers/StateController');

router.post('/state/create', auth, isAdmin, create);
router.get('/states/', auth, isAdmin, getStates);
// router.get('/state/:id', checkHome);
// router.put('/state/:id', checkHome);
// router.delete('/state/:id', checkHome)

module.exports = router;