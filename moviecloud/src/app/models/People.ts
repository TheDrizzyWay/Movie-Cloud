import { Movie } from './Movie';
import { TvShow } from './TvShow';

export interface People {
    adult: boolean;
    gender: number;
    id: number;
    known_for: Array<Movie | TvShow>;
    known_for_department: string;
    name: string;
    popularity: number;
    profile_path: string;
}

 export interface PeopleDetails {
        birthday: string;
        known_for_department: string;
        deathday?: any;
        id: number;
        name: string;
        also_known_as: string[];
        gender: number;
        biography: string;
        popularity: number;
        place_of_birth: string;
        profile_path: string;
        adult: boolean;
        imdb_id: string;
        homepage?: any;
    }
