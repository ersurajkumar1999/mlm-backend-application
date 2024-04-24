const router = require("express").Router();
const { createDummyUsers } = require("../controllers/AuthController");
const { deleteUser, updateUser, getUserById, getAllUsers, getProfile, updateProfile, updateSocialMedia } = require("../controllers/UserController");
const { auth, isAdmin } = require("../middlewares/authMiddleware");

router.post('/users', auth, isAdmin, getAllUsers);
router.get('/get-user-by-id/:id', auth, isAdmin, getUserById);
router.delete('/delete-user/:id', auth, isAdmin, deleteUser);
router.put('/update-user/:id', auth, isAdmin, updateUser);
router.post('/profile', auth, getProfile);
router.post('/update-profile', auth, updateProfile);
router.post('/update-social-media', auth, updateSocialMedia);
router.post('/create-dummy-users', createDummyUsers);
module.exports = router;