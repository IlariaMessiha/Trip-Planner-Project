import { Controller, Get } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { CommonService } from "src/services/common.service";

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
}
