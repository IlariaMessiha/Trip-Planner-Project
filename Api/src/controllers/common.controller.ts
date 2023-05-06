import { Body, Controller, Get, Param, ParseIntPipe, Post } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { CommonService } from "src/services/common.service";
import { TChatbotSubmission } from "src/types/TChatbot";

@Controller("")
export class CommonController {
    constructor(private configService: ConfigService, private commonService: CommonService) {}
    @Get("/dashboard")
    getDashboard() {
        return this.commonService.findDashboardContent();
    }
    @Get("/destinations")
    getDestinations() {
        return this.commonService.findDestinations();
    }
    @Get("/chatbotFlow")
    getChatbotFlow() {
        return this.commonService.findChatbotFlow();
    }

    @Post("/submissions")
    postSubmissions(@Body() submissions: TChatbotSubmission[]) {
        const filters = this.commonService.deduceFiltersFromSubmissions(submissions);

        return this.commonService.findFilteredAttractionAndRestaurants(filters);
    }
}
