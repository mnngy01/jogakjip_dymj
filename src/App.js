import React from 'react';
import GroupForm from './components/GroupForm';
import Layout from './components/Layout';  // Layout 컴포넌트를 import

function App() {
  return (
    <div className="App">
      <Layout>
        <GroupForm />
      </Layout>
    </div>
  );
}

export default App;
