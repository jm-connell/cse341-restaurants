import { check, validationResult } from 'express-validator';
import { Request, Response, NextFunction } from 'express';

// Check if id is a valid MongoDB ObjectId
export const validateRestaurantId = [
  check('id').isMongoId().withMessage('Invalid restaurant ID'),
  (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];

// Check every field is present and valid
export const validateNewRestaurantData = [
  check('name').notEmpty().withMessage('Name is required'),
  check('address').notEmpty().withMessage('Address is required'),
  check('cuisine').notEmpty().withMessage('Cuisine is required'),
  check('phone')
    .matches(/^\d{3}-\d{3}-\d{4}$/)
    .withMessage('Phone must be in the format 123-456-7890'),
  check('rating').notEmpty().withMessage('Rating is required'),
  check('priceRange')
    .isIn(['$', '$$', '$$$'])
    .withMessage('Price Range must be one of $, $$, $$$'),
  check('specialty').notEmpty().withMessage('Specialty is required'),
  (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];

// Same validation rules as new restaurant, but all fields are optional
export const validateUpdateRestaurantData = [
  check('name').optional().notEmpty().withMessage('Name cannot be empty'),
  check('address').optional().notEmpty().withMessage('Address cannot be empty'),
  check('cuisine').optional().notEmpty().withMessage('Cuisine cannot be empty'),
  check('phone')
    .optional()
    .matches(/^\d{3}-\d{3}-\d{4}$/)
    .withMessage('Phone must be in the format 123-456-7890'),
  check('rating')
    .optional()
    .matches(/^\d\.\d$/)
    .withMessage('Rating must be in the format X.X'),
  check('priceRange')
    .optional()
    .isIn(['$', '$$, $$$'])
    .withMessage('Price Range must be one of $, $$, $$$'),
  check('specialty')
    .optional()
    .notEmpty()
    .withMessage('Specialty cannot be empty'),
  (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    if (!Object.keys(req.body).length) {
      return res.status(400).json({ error: 'At least one field is required' });
    }
    next();
  },
];
