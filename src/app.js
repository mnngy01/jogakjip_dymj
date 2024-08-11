import express from 'express';

import productController from './controllers/groupController.js';
import postController from './controllers/postController.js';


const app = express();
app.use(express.json());


const port = process.env.PORT ?? 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});