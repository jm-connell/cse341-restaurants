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

export async function getRestaurantById(
  req: Request,
  res: Response
): Promise<void> {
  try {
    const { id } = req.params;
    const restaurant = await Restaurant.findById(id);
    if (!restaurant) {
      res.status(404).json({ error: 'Restaurant not found' });
      return;
    }
    res.status(200).json(restaurant);
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

export async function deleteRestaurant(
  req: Request,
  res: Response
): Promise<void> {
  try {
    const { id } = req.params;
    const deleteResponse = await Restaurant.findByIdAndDelete(id);
    if (!deleteResponse) {
      res.status(404).json({ error: 'Restaurant not found' });
      return;
    }
    res.status(200).json(deleteResponse);
  } catch (err) {
    res.status(500).json({ error: (err as Error).message });
  }
}

export async function updateRestaurant(
  req: Request,
  res: Response
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
    res.status(500).json({ error: (err as Error).message });
  }
}
