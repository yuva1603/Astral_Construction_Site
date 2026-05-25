import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

export const submitEnquiry = createAsyncThunk(
  'enquiry/submitEnquiry',
  async (enquiryData, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${API_URL}/enquiries`, enquiryData);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || 'Failed to submit enquiry');
    }
  }
);

const enquirySlice = createSlice({
  name: 'enquiry',
  initialState: {
    isOpen: false,
    selectedProjectName: '',
    loading: false,
    success: false,
    error: null
  },
  reducers: {
    openEnquiryModal: (state, action) => {
      state.isOpen = true;
      state.selectedProjectName = action.payload || '';
      state.success = false;
      state.error = null;
    },
    closeEnquiryModal: (state) => {
      state.isOpen = false;
      state.selectedProjectName = '';
      state.success = false;
      state.error = null;
    },
    resetEnquiryState: (state) => {
      state.loading = false;
      state.success = false;
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(submitEnquiry.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(submitEnquiry.fulfilled, (state) => {
        state.loading = false;
        state.success = true;
      })
      .addCase(submitEnquiry.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.success = false;
      });
  }
});

export const { openEnquiryModal, closeEnquiryModal, resetEnquiryState } = enquirySlice.actions;
export default enquirySlice.reducer;
