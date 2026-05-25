import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// API Base URL config
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

export const fetchProjects = createAsyncThunk(
  'projects/fetchProjects',
  async (filters = {}, { rejectWithValue }) => {
    try {
      const { type, status } = filters;
      let queryParams = [];
      if (type && type !== 'all') queryParams.push(`type=${type}`);
      if (status && status !== 'all') queryParams.push(`status=${status}`);
      
      const queryString = queryParams.length ? `?${queryParams.join('&')}` : '';
      const response = await axios.get(`${API_URL}/projects${queryString}`);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || 'Failed to fetch projects');
    }
  }
);

export const fetchProjectBySlug = createAsyncThunk(
  'projects/fetchProjectBySlug',
  async (slug, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API_URL}/projects/${slug}`);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || 'Failed to fetch project details');
    }
  }
);

const projectSlice = createSlice({
  name: 'projects',
  initialState: {
    items: [],
    selectedProject: null,
    loading: false,
    selectedLoading: false,
    error: null,
    selectedError: null
  },
  reducers: {
    clearSelectedProject: (state) => {
      state.selectedProject = null;
      state.selectedError = null;
    }
  },
  extraReducers: (builder) => {
    builder
      // Fetch all projects
      .addCase(fetchProjects.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProjects.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchProjects.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Fetch single project by slug
      .addCase(fetchProjectBySlug.pending, (state) => {
        state.selectedLoading = true;
        state.selectedError = null;
      })
      .addCase(fetchProjectBySlug.fulfilled, (state, action) => {
        state.selectedLoading = false;
        state.selectedProject = action.payload;
      })
      .addCase(fetchProjectBySlug.rejected, (state, action) => {
        state.selectedLoading = false;
        state.selectedError = action.payload;
      });
  }
});

export const { clearSelectedProject } = projectSlice.actions;
export default projectSlice.reducer;
