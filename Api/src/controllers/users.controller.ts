import { Controller, Get, UseGuards } from "@nestjs/common";
import { AuthGuard } from "src/auth/auth.guard";
import { AuthUserPayload } from "src/auth/authUser.decorator";
import { mapUserToDto } from "src/helpers/mappingDtos";
import { UsersService } from "src/services/users.service";
import { AuthUser } from "src/types/AuthUser";

@UseGuards(AuthGuard)
@Controller("/api/users")
export class UsersController {
    constructor(private usersService: UsersService) {}

    @Get("/me")
    async getMe(@AuthUserPayload() authUser: AuthUser) {
        const user = await this.usersService.findUserById(authUser.id);
        return mapUserToDto(user);
    }
}
