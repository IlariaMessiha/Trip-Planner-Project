import { activities } from "../mocks/activities";
import { locations } from "../mocks/locations";
import { Activity } from "../models/Activity";
import { Location } from "../models/Location"

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

    public search(query: string): (Location | Activity)[] {
        const filteredLocations = locations.filter((value) => {
            return (
                value.name.toLowerCase().includes(query.toLowerCase()) ||
                value.continent.toLowerCase().startsWith(query.toLowerCase()) ||
                value.country.toLowerCase().startsWith(query.toLowerCase())
            )
        });
        const filteredActivities = activities.filter((value) => {
            return (
                value.name.toLowerCase().includes(query.toLowerCase()) ||
                value.location.name.toLowerCase().startsWith(query.toLowerCase())
            )
        });
        return [...filteredActivities, ...filteredLocations]
    }
}
export const apiCalls = new ApiCalls()




