import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  salaryMin: null,
  salaryMax: null,
  type: null,
  city: null,
  homeOffice: null
};

const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    setSalaryMin(state, action) {
      state.salaryMin = action.payload;
    },
    setSalaryMax(state, action) {
      state.salaryMax = action.payload;
    },
    setEmploymentType(state, action) {
      state.type = action.payload;
    },
    setCity(state, action) {
      state.city = action.payload;
    },
    setHomeOffice(state, action) {
      state.homeOffice = action.payload
    }
  },
});

export const { setSalaryMin, setSalaryMax, setEmploymentType, setCity, setHomeOffice } = filterSlice.actions;

export default filterSlice.reducer;
