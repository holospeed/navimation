export interface ICourseDataInitialState {
  data: [ICourseData?];
}

export interface ICourseData {
  id: number;
  author: string;
  authorProfession: string;
  authorDescription: string;
  authorImage: string;
  category_tag: [ICategoryTag];
  tutorials: [ITutorial];
  similar: [ISimilar];
  isPopular: boolean;
  highlightState: IHighlightState;
}

export interface ICategoryTag {
  id: number;
  name: string;
}

export interface ISimilar {
  id: number;
}

export interface ITutorial {
  id: number;
  title: string;
  image: string;
  video: string;
  description: string;
}

export interface IHighlightState {
  isHighlighted: boolean;
  introductionVideo: string;
}
