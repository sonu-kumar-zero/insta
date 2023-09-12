import express from 'express';
import {
    getUser,
    getUserFriend,
    addRemoveFriend,
    getUserFromUsername
} from '../controllers/user.js';

import {verifyToken} from '../middleware/auth.js'
const router = express.Router();

// read
router.get('/:id',verifyToken,getUser);
router.get('/find/:username',verifyToken,getUserFromUsername);
router.get('/:id/friend',verifyToken,getUserFriend);

// update
router.patch('/:id/:friendid',verifyToken, addRemoveFriend);

export default router;