
import { activities } from "../mocks/activities";
import { locations } from "../mocks/locations";
import { Activity } from "../models/Activity";

import { Location } from "../models/Location"
import { SearchResult } from "../types/SearchResult";

export class ApiCalls {
    public getLocations() {
        return locations
    }

    public getLocationById(id: string) {
        return locations.find((obj) => {
            return obj.id === id;
        });
    }
    public getActivities() {
        return activities
    }
    public getActivitiesForLocation(location: Location) {
        return activities.filter((activity) => activity.location.name === location.name);
    }

    public getActivityById(id: string) {
        return activities.find((obj) => {
            return obj.id === id;
        })
    }

    public search(query: string): SearchResult[] {
        const searchResults: SearchResult[] = []
        const filteredLocations = locations.filter((value) => {
            return (
                value.name.toLowerCase().includes(query.toLowerCase()) ||
                value.continent.toLowerCase().startsWith(query.toLowerCase()) ||
                value.country.toLowerCase().startsWith(query.toLowerCase())
            )
        });

        filteredLocations.forEach((filteredLocation) => {
            searchResults.push(
                {
                    type: "location",
                    item: filteredLocation
                }
            )


        })

        const filteredActivities = activities.filter((value) => {
            return (
                value.name.toLowerCase().includes(query.toLowerCase()) ||
                value.location.name.toLowerCase().startsWith(query.toLowerCase()) ||
                value.location.country.toLowerCase().startsWith(query.toLowerCase())

            )
        });
        filteredActivities.forEach((filteredActivity) => {
            searchResults.push(
                {
                    type: "activity",
                    item: filteredActivity
                }
            )


        })
        return searchResults

    }
}
export const apiCalls = new ApiCalls()




