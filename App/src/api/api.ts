import { activities } from "../mocks/activities";
import { locations } from "../mocks/locations";

import { SearchQuery, SearchResult } from "../types/Search";

export class ApiCalls {
    public search(query: SearchQuery): SearchResult[] {
        console.log("search");
        const filteredLocations = locations.filter(value => {
            return (
                value.name.toLowerCase().includes(query.label.toLowerCase()) ||
                value.continent.toLowerCase().startsWith(query.label.toLowerCase()) ||
                value.country.toLowerCase().startsWith(query.label.toLowerCase())
            );
        });
        const filteredActivities = activities.filter(value => {
            return (
                value.name.toLowerCase().includes(query.label.toLowerCase()) ||
                value.location.name.toLowerCase().startsWith(query.label.toLowerCase()) ||
                value.location.country.toLowerCase().startsWith(query.label.toLowerCase())
            );
        });

        const results = [
            ...filteredLocations.map((item): SearchResult => ({ type: "location", item })),
            ...filteredActivities.map((item): SearchResult => ({ type: "activity", item })),
        ];

        return results.filter(result => !query.type || result.type === query.type);
    }
}
export const apiCalls = new ApiCalls();
