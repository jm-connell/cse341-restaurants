import express from 'express';

const router = express.Router();

router.get('/', (req, res) => {
  return res.json({
    message:
      'If you have not already, please navigate to /auth/github to authenticate with GitHub',
  });
});

export default router;
