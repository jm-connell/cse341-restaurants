import express from 'express';
import { getRestaurants } from '../controllers/restaurants';

const router = express.Router();

router.get("/", (req, res) => {
    return res.json({ message: "Hello World" });
});

router.get("/restaurants", getRestaurants);

export default router;