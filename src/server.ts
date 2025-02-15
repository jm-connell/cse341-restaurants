import express from 'express';
import mongoose from 'mongoose';
import routes from './routes';
import restaurantRoutes from './routes/restaurants';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
app.use(express.json());

const uri = process.env.MONGODB_URI || 'invalid uri';
mongoose.set('strictQuery', true);

mongoose
  .connect(uri)
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((err) => {
    console.error('Failed to connect to MongoDB', err);
  });

app.use('/', routes);
app.use('/restaurants', restaurantRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server is running on PORT ${PORT}`));
