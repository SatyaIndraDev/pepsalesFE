import React from 'react';
import SwimlaneContainer from './components/SwimlaneContainer';
import BlockDetailModal from './components/BlockDetailModal';
import FilterBar from './components/FilterBar';

const App = () => {
  return (
    <div style={{ padding: '2rem' }}>
      <FilterBar />
      <SwimlaneContainer />
      <BlockDetailModal />
    </div>
  );
};

export default App;
