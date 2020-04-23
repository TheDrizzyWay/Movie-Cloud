import { Resource } from './Resource';

export interface TvShowInterface {
    results: TvShow[];
}
export interface TvShow extends Resource {
    original_name: string;
    genre_ids: number[];
    name: string;
    popularity: number;
    origin_country: string[];
    vote_count: number;
    first_air_date: string;
    backdrop_path: string | null;
    original_language: string;
    vote_average: number;
    overview: string;
    poster_path: string | null;
}