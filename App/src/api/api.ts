import { activities } from "../mocks/activities";
import { locations } from "../mocks/locations";

import { Location } from "../models/Location";
import { SearchQuery, SearchResult } from "../types/Search";

export class ApiCalls {
    public getLocations() {
        return locations;
    }

    public getLocationById(id: string) {
        return locations.find(obj => {
            return obj.id === id;
        });
    }

    public getActivitiesForLocation(location: Location) {
        return activities.filter(activity => activity.location.name === location.name);
    }

    public getActivityById(id: string) {
        return activities.find(obj => {
            return obj.id === id;
        });
    }

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
