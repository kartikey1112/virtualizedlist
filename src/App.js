import React from 'react';
import {VirtualizedList} from './virtualizedList';

const App = () => {
  const data = Array.from({ length: 1000 }, (_, index) => `Item ${index + 1}`);

  return (
    <div>
      <h1>Virtualized List (Without react-window)</h1>
      <VirtualizedList data={data} />
    </div>
  );
};

export default App;
