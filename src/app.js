import express from 'express';
import routes from './routes.js';
import path from 'path';
import cors from 'cors';


const app = express();

app.use(cors());
app.use(express.json());

// 전송된 파일을 담기 위한 폴더
app.use('/uploads', express.static(path.join('uploads', "attachments")));

app.use(routes);


// const port = process.env.PORT ?? 3000;
//app.listen(port, () => {
//  console.log(`Server is running on port ${port}`);
//});
app.listen(3000, () => console.log('Server Started'));