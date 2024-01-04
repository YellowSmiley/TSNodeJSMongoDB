import { ObjectId } from "mongodb";

export type TMovie = {
  _id: ObjectId;
  plot: string;
  genres: string[];
  runtime: number;
  cast: string[];
  poster: string;
  title: string;
  fullplot: string;
  languages: string[];
  released: Date;
  directors: string[];
  rated: string;
  awards: {
    wins: number;
    nominations: number;
    text: string;
  };
  lastupdated: Date;
  year: number;
  imdb: {
    rating: number;
    votes: number;
    id: number;
  };
  countries: string[];
  type: string;
  tomatoes: {
    viewer: {
      rating: number;
      numReviews: number;
      meter: number;
    };
    critic: {
      rating: number;
      numReviews: number;
      meter: number;
    };
    dvd: Date;
    fresh: number;
    rotten: number;
    lastUpdated: Date;
  };
  num_mflix_comments: number;
};
