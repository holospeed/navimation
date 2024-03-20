import {RootState, useAppSelector} from '../store';

export const selectCourses = (state: RootState) => state.courses.data;
export const useCourses = () => useAppSelector(selectCourses);
