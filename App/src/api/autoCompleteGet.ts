import Axios from "axios";
import { AutoCompleteResult } from "../types/dto/autocompleteType";
const API_BASE_URL = "http://localhost:3333";

export class AutoCompleteGet {

    public async autoCompleteSearch(searchQuery: string) {
        console.log("auto complete query: ", searchQuery);
        const res: any = await Axios.get<AutoCompleteResult[]>(`${API_BASE_URL}/autocomp/${searchQuery}`);
        console.log("auto complete result: ", res);
        return (await Axios.get<AutoCompleteResult[]>(`${API_BASE_URL}/autocomp/${searchQuery}`)).data;
    }
}
export const autoCompleteData = new AutoCompleteGet();
