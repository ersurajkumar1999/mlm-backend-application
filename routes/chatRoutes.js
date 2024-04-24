const router = require("express").Router();
const { auth } = require("../middlewares/authMiddleware");
const { searchUsers, fetchAllChats } = require("../controllers/ChatController");

router.post('/search-users', auth, searchUsers);
router.post('/fetch-all-chats', auth, fetchAllChats);

router.post('/search-users', auth, searchUsers);
router.post('/fetch-all-chats', auth, fetchAllChats);


module.exports = router;