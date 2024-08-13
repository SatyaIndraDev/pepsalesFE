import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setFilter } from '../redux/filterSlice';

const FilterBar = () => {
  const dispatch = useDispatch();
  const filters = useSelector(state => state.filters);

  const handleFilterChange = (event) => {
    const { name, value } = event.target;
    dispatch(setFilter({ ...filters, [name]: value }));
  };

  return (
    <div style={{ marginBottom: '1rem' }}>
      <label>
        Status:
        <select name="status" value={filters.status} onChange={handleFilterChange}>
          <option value="all">All</option>
          <option value="todo">To Do</option>
          <option value="inprogress">In Progress</option>
          <option value="done">Done</option>
        </select>
      </label>
      {/* Add more filters as needed */}
    </div>
  );
};

export default FilterBar;
