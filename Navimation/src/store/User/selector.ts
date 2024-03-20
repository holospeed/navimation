import {RootState, useAppSelector} from '../store';

export const selectUser = (state: RootState) => state.user;
export const useUser = () => useAppSelector(selectUser);
