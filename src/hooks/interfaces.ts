export interface Cast {
  birthday: string | null;
  known_for_department: string;
  deathday: null | string;
  id: number;
  name: string;
  also_known_as: Array<string>;
  gender: number;
  biography: string;
  popularity: number;
  place_of_birth: string | null;
  profile_path: string | null;
  adult: boolean;
  imdb_id: string;
  homepage: null | string;
};

export interface Movie {
  id: number;
  poster_path: string | null;
  adult: boolean;
  overview: string;
  release_date: string;
  genre_ids: Array<number>;
  original_title: string;
  original_language: string;
  title: string;
  backdrop_path: string | null;
  popularity: number;
  vote_count: number;
  video: boolean;
  vote_average: number;
};

export interface Genre {
  id: number;
  name: string;
};