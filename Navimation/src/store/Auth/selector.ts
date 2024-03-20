import {RootState, useAppSelector} from '../store';

export const selectAuth = (state: RootState) => state.auth;
export const useAuth = () => useAppSelector(selectAuth);
