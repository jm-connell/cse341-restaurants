import express from 'express';
import { getRestaurants, addRestaurant } from '../controllers/restaurants';

const router = express.Router();

router.get('/', getRestaurants);
router.post('/add', addRestaurant);

export default router;
