import { activities } from "../mocks/activities";
import { locations } from "../mocks/locations";
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
}
export const apiCalls = new ApiCalls()




