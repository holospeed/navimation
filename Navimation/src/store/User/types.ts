export interface IUser {
  firstName: string;
  lastName: string;
  favoriteAuthors: IAuthor[];
  favoriteCourses: ICourse[];
  favoriteEpisode: IEpisode[];
  purchased: ICourse[];
}

export interface IAuthor {
  authorId: number;
}

export interface ICourse extends IAuthor {
  courseId: number;
}

export interface IEpisode extends ICourse {
  episodeId: number;
}
