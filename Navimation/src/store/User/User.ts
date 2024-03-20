import {createSlice} from '@reduxjs/toolkit';
import {IUser, IAuthor, ICourse, IEpisode} from './types';

const initialState: IUser = {
  firstName: '',
  lastName: '',
  favoriteAuthors: [],
  favoriteCourses: [],
  favoriteEpisode: [],
  purchased: [],
};

const userSlice = createSlice({
  name: 'user',
  initialState: initialState,
  reducers: {
    setFirstName(state, action: {payload: string}) {
      state.firstName = action.payload;
    },
    setLastName(state, action: {payload: string}) {
      state.lastName = action.payload;
    },
    addFavoriteAuthor(state, action: {payload: IAuthor}) {
      state.favoriteAuthors.push(action.payload);
    },
    removeAuthorFromFavorites(state, action: {payload: IAuthor}) {
      if (state.favoriteAuthors.length > 0) {
        state.favoriteAuthors = state.favoriteAuthors.filter(
          author => author?.authorId !== action.payload.authorId,
        );
      }
    },
    addFavoriteCourse(state, action: {payload: ICourse}) {
      state.favoriteCourses.push(action.payload);
    },
    removeCourseFromFavorites(state, action: {payload: ICourse}) {
      if (state.favoriteCourses.length > 0) {
        state.favoriteCourses = state.favoriteCourses.filter(
          course => course?.courseId !== action.payload.courseId,
        );
      }
    },
    addFavoriteEpisode(state, action: {payload: IEpisode}) {
      state.favoriteEpisode.push(action.payload);
    },
    removeEpisodeFromFavorites(state, action: {payload: IEpisode}) {
      if (state.favoriteEpisode.length > 0) {
        state.favoriteEpisode = state.favoriteEpisode.filter(
          episode => episode?.episodeId !== action.payload.episodeId,
        );
      }
    },
    addPurchasedCourse(state, action: {payload: ICourse}) {
      state.purchased.push(action.payload);
    },
    removePurchasedCourse(state, action: {payload: ICourse}) {
      if (state.purchased.length > 0) {
        state.purchased = state.purchased.filter(
          course => course?.courseId !== action.payload.courseId,
        );
      }
    },
  },
});

export const {
  setFirstName,
  setLastName,
  addFavoriteAuthor,
  removeAuthorFromFavorites,
  addFavoriteCourse,
  removeCourseFromFavorites,
  addFavoriteEpisode,
  removeEpisodeFromFavorites,
  addPurchasedCourse,
  removePurchasedCourse,
} = userSlice.actions;

const userReducer = userSlice.reducer;
export default userReducer;
