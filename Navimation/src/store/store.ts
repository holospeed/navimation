import {configureStore, combineReducers} from '@reduxjs/toolkit';
import {TypedUseSelectorHook, useDispatch, useSelector} from 'react-redux';

import authReducer from './Auth';
import courseDataReducer from './CourseData';
import userReducer from './User/User';

const reducers = combineReducers({
  auth: authReducer,
  courses: courseDataReducer,
  user: userReducer,
});

export const store = configureStore({
  reducer: reducers,
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
