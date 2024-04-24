const router = require("express").Router();
const { userListForConnections, getMyReceivedConnections, getMySendConnections } = require("../controllers/ConnectionController");
const { auth } = require("../middlewares/authMiddleware");

router.post('/user-list-for-connections', auth, userListForConnections);
router.post('/my-received-connections', auth, getMyReceivedConnections);
router.post('/my-send-connections', auth, getMySendConnections);
module.exports = router;