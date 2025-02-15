import express from 'express';
import {
  getRestaurants,
  getRestaurantById,
  addRestaurant,
  deleteRestaurant,
  updateRestaurant,
} from '../controllers/restaurants';
import {
  validateRestaurantId,
  validateNewRestaurantData,
  validateUpdateRestaurantData,
} from '../middleware/validators';

const router = express.Router();

router.get('/', getRestaurants);
router.get('/:id', validateRestaurantId, getRestaurantById);
router.post('/add', validateNewRestaurantData, addRestaurant);
router.delete('/:id', validateRestaurantId, deleteRestaurant);
router.put(
  '/:id',
  validateRestaurantId,
  validateUpdateRestaurantData,
  updateRestaurant
);

export default router;
