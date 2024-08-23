import express from 'express';
import routes from './routes.js';


const app = express();
app.use(express.json());


app.use(routes);


// const port = process.env.PORT ?? 3000;
//app.listen(port, () => {
//  console.log(`Server is running on port ${port}`);
//});
app.listen(3000, () => console.log('Server Started'));