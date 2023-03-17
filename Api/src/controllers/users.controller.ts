import { Controller, Get, Param } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { TestService } from "src/services/test.service";

@Controller("/users")
export class UsersController {
    constructor(private testService: TestService) {}

    @Get("")
    getUsers() {
        return this.testService.findUsers();
    }
    @Get("/:id")
    getUserById(@Param("id") id: string) {
        return this.testService.findUserById(id);
    }
}
