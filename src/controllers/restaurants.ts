import { Request, Response, NextFunction } from 'express';
import Restaurant from '../models/restaurant';

export async function getRestaurants(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const restaurants = await Restaurant.find();
    res.json(restaurants);
  } catch (err) {
    next(err);
  }
}

export async function getRestaurantById(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const { id } = req.params;
    const restaurant = await Restaurant.findById(id);
    if (!restaurant) {
      const error = new Error('Restaurant not found');
      (error as any).status = 404;
      return next(error);
    }
    res.status(200).json(restaurant);
  } catch (err) {
    next(err);
  }
}

export async function addRestaurant(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const newRestaurant = new Restaurant(req.body);
    const addResponse = await newRestaurant.save();
    res.status(201).json(addResponse);
  } catch (err) {
    next(err);
  }
}

export async function deleteRestaurant(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const { id } = req.params;
    const deleteResponse = await Restaurant.findByIdAndDelete(id);
    if (!deleteResponse) {
      const error = new Error('Restaurant not found');
      res.status(404);
      throw error;
    }
    res.status(200).json(deleteResponse);
  } catch (err) {
    next(err);
  }
}

export async function updateRestaurant(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const { id } = req.params;
    const updateData = req.body;
    const updatedRestaurant = await Restaurant.findByIdAndUpdate(
      id,
      updateData,
      { new: true }
    );
    if (!updatedRestaurant) {
      res.status(404).json({ error: 'Restaurant not found' });
      return;
    }
    res.status(200).json(updatedRestaurant);
  } catch (err) {
    next(err);
  }
}
