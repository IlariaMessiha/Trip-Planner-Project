import { Controller, Get, Query } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { SearchService } from "src/services/search.service";

@Controller("")
export class SearchController {
    constructor(private configService: ConfigService, private searchService: SearchService) {
        console.log(configService.get("IMAGES_PATH"));
    }

    @Get("/search")
    getSearch(@Query() params: any) {
        return this.searchService.search({
            label: params.q,
            type: params.filter,
        });
    }
}
