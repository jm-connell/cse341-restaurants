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
router.get('/success', (req, res) => {
  res.send('Login successful');
});

// Add this route to check if the user is authenticated
router.get('/check-auth', (req, res) => {
  if (req.session.user) {
    res.json({ authenticated: true, user: req.session.user });
  } else {
    res.json({ authenticated: false });
  }
});

export default router;
