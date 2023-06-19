import Axios from "axios";
import { AutoCompleteResult } from "../types/dto/autocompleteType";
const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

export class AutoCompleteGet {
    public async autoCompleteSearch(searchQuery: string) {
        const res: any = await Axios.get<AutoCompleteResult[]>(
            `${API_BASE_URL}/autocomp/${searchQuery}`
        );
        return res.data;
    }
}
export const autoCompleteData = new AutoCompleteGet();
