export type Media = {
  id: number;
  title?: string;
  name?: string;
  poster_path: string | null;
  media_type?: "movie" | "tv" | "person";
};

export type TMDBListResponse = {
  page: number;
  results: Media[];
  total_pages: number;
  total_results: number;
};

export type MediaDetail = {
  id: number;
  title?: string;
  name?: string;
  overview: string;
  backdrop_path: string | null;
  poster_path: string | null;
  media_type?: string;
};
