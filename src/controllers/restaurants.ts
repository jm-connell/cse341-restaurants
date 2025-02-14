import { Request, Response } from 'express';
import Restaurant from '../models/restaurant';

export async function getRestaurants(req: Request, res: Response): Promise<void> {
    try {
        const restaurants = await Restaurant.find();
        res.json(restaurants);
    } catch (err) {
        res.status(500).json({ error: (err as Error).message });
    }
}