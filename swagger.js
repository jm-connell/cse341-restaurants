const swaggerAutogen = require('swagger-autogen')();

const isProduction = process.env.NODE_ENV === 'production';

const doc = {
  info: {
    title: 'CSE341 Restaurants API',
    description: 'Documentation for Restaurants Project',
  },
  host: isProduction ? 'cse-341-rgdc.onrender.com' : 'localhost:3333',
  schemes: isProduction ? ['https'] : ['http'],
};

const outputFile = './swagger-output.json';
const endpointsFiles = ['./src/controllers/restaurants.ts'];

swaggerAutogen(outputFile, endpointsFiles, doc);
