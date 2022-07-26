import { Activity } from "../models/Activity";
import { Location } from "../models/Location";

export type SearchResult = {
    type: "location" | "activity";
    item: Location | Activity
}