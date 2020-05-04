interface Result {
        author: string;
        content: string;
        id: string;
        url: string;
    }

export interface Review {
        id: number;
        page: number;
        results: Result[];
        total_pages: number;
        total_results: number;
    }
