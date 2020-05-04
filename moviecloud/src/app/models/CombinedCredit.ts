export interface Cast {
    id: number;
    character: string;
    original_title: string;
    overview: string;
    vote_count: number;
    video: boolean;
    media_type: string;
    release_date: string;
    vote_average: number;
    title: string;
    popularity: number;
    original_language: string;
    genre_ids: number[];
    backdrop_path: string;
    adult: boolean;
    poster_path: string;
    credit_id: string;
    episode_count?: number;
    origin_country: string[];
    original_name: string;
    name: string;
    first_air_date: string;
}

export interface Crew {
    id: number;
    department: string;
    original_language: string;
    original_title: string;
    job: string;
    overview: string;
    vote_count: number;
    video: boolean;
    media_type: string;
    release_date: string;
    vote_average: number;
    title: string;
    popularity: number;
    genre_ids: number[];
    backdrop_path: string;
    adult: boolean;
    poster_path: string;
    credit_id: string;
}

export interface CombinedCredit {
    cast: Cast[];
    crew: Crew[];
    id: number;
}
