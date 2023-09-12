import express from 'express';
import {addcomment, getFeedPosts,getUserPosts,likePost} from '../controllers/post.js';
import { verifyToken } from '../middleware/auth.js';

const router = express.Router();

// read
router.get('/',verifyToken,getFeedPosts);
router.get('/:userid/posts',verifyToken, getUserPosts);

// update
router.patch('/:id/like',verifyToken,likePost);
router.patch('/:id/comment',verifyToken,addcomment);

export default router;