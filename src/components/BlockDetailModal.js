import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@mui/material';
import { clearBlockDetail } from '../redux/blockDetailSlice';

const BlockDetailModal = () => {
  const dispatch = useDispatch();
  const blockDetail = useSelector(state => state.blockDetail);

  const handleClose = () => {
    dispatch(clearBlockDetail());
  };

  if (!blockDetail) return null;

  return (
    <Dialog open={!!blockDetail} onClose={handleClose}>
      <DialogTitle>Block Details</DialogTitle>
      <DialogContent>
        <p>{blockDetail.content}</p>
        <h4>History:</h4>
        <ul>
          {blockDetail.history.map((entry, index) => (
            <li key={index}>{`From ${entry.from} to ${entry.to} on ${new Date(entry.date).toLocaleString()}`}</li>
          ))}
        </ul>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Close</Button>
      </DialogActions>
    </Dialog>
  );
};

export default BlockDetailModal;
