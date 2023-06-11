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
}
