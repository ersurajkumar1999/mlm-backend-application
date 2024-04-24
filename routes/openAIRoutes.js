const express = require('express');
const router = express.Router();
const { auth } = require('../middlewares/authMiddleware');
const { getContentOpenAI } = require('../controllers/OpenAIController');


router.post('/open-ai', getContentOpenAI);

module.exports = router;