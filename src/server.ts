import express from 'express';
import mongoose from 'mongoose';
import routes from './routes';
import restaurantRoutes from './routes/restaurants';
import dotenv from 'dotenv';
const swaggerUi = require('swagger-ui-express');
const swaggerFile = require('../swagger-output.json');
import { errorHandler } from './middleware/errorHandler';

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
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerFile));

// Use the error handling middleware
app.use(errorHandler);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server is running on PORT ${PORT}`));
