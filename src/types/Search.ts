import { Activity } from "../models/Activity";
import { Location } from "../models/Location";

export type SearchResult = {
  type: SearchResultType;
  item: Location | Activity;
};

export type SearchQuery = {
  label: string;
  type?: SearchResultType;
};

export type SearchResultType = "location" | "activity";
