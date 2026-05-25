import { configureStore } from '@reduxjs/toolkit';
import projectReducer from './projectSlice';
import filterReducer from './filterSlice';
import enquiryReducer from './enquirySlice';

export const store = configureStore({
  reducer: {
    projects: projectReducer,
    filters: filterReducer,
    enquiry: enquiryReducer
  }
});
export default store;
