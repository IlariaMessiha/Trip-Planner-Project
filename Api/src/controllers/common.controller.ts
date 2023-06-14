import { Body, Controller, Get, Post } from "@nestjs/common";
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
    async postSubmissions(@Body() submissions: TChatbotSubmission[]) {
        const filtersByTarget = this.commonService.deduceFiltersByTarget(submissions);
        const attractionPool = await this.commonService.findAttractionPool(
            filtersByTarget.attractions
        );
        const restaurantPool = await this.commonService.findRestaurantPool(
            filtersByTarget.restaurants
        );
        // return this.commonService.createTrip(attractionPool, restaurantPool, filtersByTarget);
    }
}
