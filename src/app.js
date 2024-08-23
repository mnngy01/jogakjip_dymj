// Back-End
import express from 'express';

import groupController from './controllers/groupController.js';
import postController from './controllers/postController.js';


// ***************************************************************
// Back-End
const app = express();
app.use(express.json());


app.use('/groups', groupController);
app.use('/posts', postController);


// const port = process.env.PORT ?? 3000;
//app.listen(port, () => {
//  console.log(`Server is running on port ${port}`);
//});
app.listen(3000, () => console.log('Server Started'));