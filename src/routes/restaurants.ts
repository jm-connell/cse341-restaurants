import express from 'express';
import {
  getRestaurants,
  getRestaurantById,
  addRestaurant,
  deleteRestaurant,
  updateRestaurant,
} from '../controllers/restaurants';

const router = express.Router();

router.get('/', getRestaurants);
router.get('/:id', getRestaurantById);
router.post('/add', addRestaurant);
router.delete('/:id', deleteRestaurant);
router.put('/:id', updateRestaurant);

export default router;
