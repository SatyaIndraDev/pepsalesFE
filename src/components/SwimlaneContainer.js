import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Swimlane from './Swimlane';
import { fetchLanes } from '../redux/lanesSlice';

const SwimlaneContainer = () => {
  const dispatch = useDispatch();
  const lanes = useSelector(state => state.lanes.lanes);
  const status = useSelector(state => state.lanes.status);
  const error = useSelector(state => state.lanes.error);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchLanes());
    }
  }, [status, dispatch]);

  if (status === 'loading') {
    return <div>Loading...</div>;
  }

  if (status === 'failed') {
    return <div>Error: {error}</div>;
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'row', gap: '1rem' }}>
      {lanes.map(lane => (
        <Swimlane key={lane.id} lane={lane} />
      ))}
    </div>
  );
};

export default SwimlaneContainer;
