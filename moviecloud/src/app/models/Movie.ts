import { Resource } from './Resource';

export interface MovieInterface extends Resource {
    results: Movie[];
}

export interface Movie {
    popularity: number;
    vote_count: number;
    video: boolean;
    poster_path: string | null;
    adult: boolean;
    backdrop_path: string | null;
    original_language: string;
    original_title: string;
    genre_ids: number[];
    title: string;
    vote_average: number;
    overview: string;
    release_date: string;
}