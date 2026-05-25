import { createSlice } from '@reduxjs/toolkit';

const filterSlice = createSlice({
  name: 'filters',
  initialState: {
    category: 'all', // 'all', 'residential', 'commercial', 'plot'
    status: 'all'     // 'all', 'ongoing', 'completed', 'upcoming', 'ready'
  },
  reducers: {
    setCategory: (state, action) => {
      state.category = action.payload;
    },
    setStatus: (state, action) => {
      state.status = action.payload;
    },
    resetFilters: (state) => {
      state.category = 'all';
      state.status = 'all';
    }
  }
});

export const { setCategory, setStatus, resetFilters } = filterSlice.actions;
export default filterSlice.reducer;
