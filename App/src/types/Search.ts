export type SearchResult<V = any> = {
    type: SearchResultType;
    item: V;
};

export type SearchQuery = {
    label: string;
    type?: SearchResultType[];
};

export type SearchResultType = "City" | "Country" | "Attraction" | "Restaurant" | "Hotel" | "";
