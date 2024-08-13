import React from 'react';
import { useDrag } from 'react-dnd';
import { useDispatch } from 'react-redux';
import { setBlockDetail } from '../redux/blockDetailSlice';

const Block = ({ block, laneId }) => {
  const dispatch = useDispatch();
  const [{ isDragging }, drag] = useDrag({
    type: 'BLOCK',
    item: { id: block.id, sourceLaneId: laneId },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  });

  return (
    <div
      ref={drag}
      onClick={() => dispatch(setBlockDetail(block))}
      style={{ padding: '10px', margin: '10px 0', backgroundColor: '#fff', cursor: 'pointer', opacity: isDragging ? 0.5 : 1 }}
    >
      {block.content}
    </div>
  );
};

export default Block;
