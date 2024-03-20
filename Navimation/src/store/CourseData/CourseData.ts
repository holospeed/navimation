import {createSlice} from '@reduxjs/toolkit';
import {ICourseDataInitialState} from './types';

const initialState: ICourseDataInitialState = {
  data: [],
};

const courseDataSlice = createSlice({
  name: 'courseData',
  initialState,
  reducers: {
    setCourseData(state, action) {
      state.data = action.payload;
    },
  },
});

export const {setCourseData} = courseDataSlice.actions;
const courseDataReducer = courseDataSlice.reducer;
export default courseDataReducer;
