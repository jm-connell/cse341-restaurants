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
import { isAuthenticated } from '../middleware/authMiddleware';

const router = express.Router();

router.get('/', getRestaurants);
router.get('/:id', validateRestaurantId, getRestaurantById);

/* Protected Routes */
router.post('/add', isAuthenticated, validateNewRestaurantData, addRestaurant);
router.delete('/:id', isAuthenticated, validateRestaurantId, deleteRestaurant);
router.put(
  '/:id',
  isAuthenticated,
  validateRestaurantId,
  validateUpdateRestaurantData,
  updateRestaurant
);

export default router;
