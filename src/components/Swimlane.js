import React from 'react';
import { useDrop } from 'react-dnd';
import { useDispatch } from 'react-redux';
import Block from './Block';
import { moveBlockToServer } from '../redux/lanesSlice';

const Swimlane = ({ lane }) => {
  const dispatch = useDispatch();
  const [{ isOver }, drop] = useDrop({
    accept: 'BLOCK',
    drop: (item) => dispatch(moveBlockToServer({ blockId: item.id, sourceLaneId: item.sourceLaneId, targetLaneId: lane.id })),
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  });

  return (
    <div ref={drop} style={{ width: '300px', minHeight: '400px', backgroundColor: isOver ? '#e0e0e0' : '#f5f5f5', padding: '1rem' }}>
      <h3>{lane.title}</h3>
      {lane.blocks.map(block => (
        <Block key={block.id} block={block} laneId={lane.id} />
      ))}
    </div>
  );
};

export default Swimlane;
