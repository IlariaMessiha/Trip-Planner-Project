import { Controller, Get, Param } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { UserService } from "src/services/user.service";

@Controller("/users")
export class UsersController {
    constructor(private userService: UserService) {}

    @Get("")
    getUsers() {
        return this.userService.findUsers();
    }
    @Get("/:id")
    getUserById(@Param("id") id: string) {
        return this.userService.findUserById(id);
    }
}
