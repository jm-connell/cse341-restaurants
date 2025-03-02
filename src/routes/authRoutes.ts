import express from 'express';
import {
  githubAuth,
  githubAuthCallback,
  logout,
} from '../controllers/authentication';

const router = express.Router();

router.get('/github', githubAuth);
router.get('/github/callback', githubAuthCallback);
router.get('/logout', logout);

export default router;
