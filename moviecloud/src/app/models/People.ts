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