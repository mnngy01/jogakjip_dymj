// Front-End
import React from 'react';

import GroupForm from './components/GroupForm';
import Layout from './components/Layout';  // Layout 컴포넌트를 import

// Back-End
import express from 'express';

import groupController from './controllers/groupController.js';
import postController from './controllers/postController.js'


// ***************************************************************
// Front-End
function App() {
  return (
    <div className="App">
      <Layout>
        <GroupForm />
      </Layout>
    </div>
  );
}


// ***************************************************************
// Back-End
const app = express();
app.use(express.json());


app.use('/groups', groupController);
app.use('/posts', postController);


const port = process.env.PORT ?? 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});


// ***************************************************************
export default App;
