import { Body, Controller, Get, Param, Post, Query } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { SearchService } from "src/services/search.service";
import { SearchQuery } from "src/types/dto/search/searchDto";

@Controller("")
export class SearchController {
    constructor(private configService: ConfigService, private searchService: SearchService) {
        console.log(configService.get("IMAGES_PATH"));
    }
    @Post("/search")
    search(@Body() searchQuery: SearchQuery) {
        return this.searchService.search(searchQuery);
    }

    @Get("/search")
    getSearchResults(@Query("q") q: string, @Query("filter") filter: string) {
        if (!q) {
            return { label: "unexpected q" };
        }

        if (!filter) {
            //const defaultFilter = ["attractions", "hotels", "restaurants"];
            return this.searchService.findSearchWithoutFilter(q, []);
        } else {
            const filterArr = filter ? filter.split(",") : null;
            const expectedFilter = ["country", "city", "attraction", "hotel", "restaurant"];
            if (
                filterArr.length > 5 ||
                (filterArr && filterArr.some(value => !expectedFilter.includes(value)))
            ) {
                // filterArr contains at least one value that is not in expectedFilter
                return { label: "unexpected filter" };
            }

            // we have to handle repetition of filters
            // to be done in frontend and backend

            return this.searchService.findSearchWithoutFilter(q, filterArr);
        }
    }
}
