import { Request, Response } from 'express';
import Restaurant from '../models/restaurant';

export async function getRestaurants(
  req: Request,
  res: Response
): Promise<void> {
  try {
    const restaurants = await Restaurant.find();
    res.json(restaurants);
  } catch (err) {
    res.status(500).json({ error: (err as Error).message });
  }
}

export async function addRestaurant(
  req: Request,
  res: Response
): Promise<void> {
  try {
    const newRestaurant = new Restaurant(req.body);
    const addResponse = await newRestaurant.save();
    res.status(201).json(addResponse);
  } catch (err) {
    res.status(500).json({ error: (err as Error).message });
  }
}
