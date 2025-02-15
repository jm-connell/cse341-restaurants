"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const routes_1 = __importDefault(require("./routes"));
const restaurants_1 = __importDefault(require("./routes/restaurants"));
const dotenv_1 = __importDefault(require("dotenv"));
const swaggerUi = require('swagger-ui-express');
const swaggerFile = require('../swagger-output.json');
const errorHandler_1 = require("./middleware/errorHandler");
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use(express_1.default.json());
const uri = process.env.MONGODB_URI || 'invalid uri';
mongoose_1.default.set('strictQuery', true);
mongoose_1.default
    .connect(uri)
    .then(() => {
    console.log('Connected to MongoDB');
})
    .catch((err) => {
    console.error('Failed to connect to MongoDB', err);
});
// Serve Swagger UI
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerFile));
// Define routes
app.use('/', routes_1.default);
app.use('/restaurants', restaurants_1.default);
// Error handling middleware
app.use(errorHandler_1.errorHandler);
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server is running on PORT ${PORT}`));
