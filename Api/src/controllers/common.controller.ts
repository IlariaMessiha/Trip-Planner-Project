import { Controller, Get } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { CommonService } from "src/services/common.service";

@Controller("/dashboard")
export class CommonController {
    constructor(private configService: ConfigService, private commonService: CommonService) {}
    @Get("")
    getDashboard() {
        return this.commonService.findDashboardContent();
    }
}
