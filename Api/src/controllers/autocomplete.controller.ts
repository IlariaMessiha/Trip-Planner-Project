import { Controller, Get, Param } from "@nestjs/common";
import { AutoCompleteService } from "src/services/autocomplete.service";


@Controller("/autocomp")
export class AutoCompleteController {
    constructor(private autoCompleteService: AutoCompleteService) {}


    @Get("/:label")
    search(@Param("label") searchQuery: string) {
        return this.autoCompleteService.search(searchQuery);
    }
}
