import { Body, Controller, Get, Param, ParseIntPipe, Post, UseGuards } from "@nestjs/common";
import { AuthGuard } from "src/auth/auth.guard";
import { AuthUserPayload } from "src/auth/authUser.decorator";
import { mapUserToDto } from "src/helpers/MappingDtos";
import { UsersService } from "src/services/users.service";
import { AuthUser } from "src/types/AuthUser";
import { LikedItem } from "src/types/dto/likes/LikedItemDto";
import { ReviewDto } from "src/types/dto/reviews/ReviewDto";

@UseGuards(AuthGuard)
@Controller("/api/users")
export class UsersController {
    constructor(private usersService: UsersService) {}

    @Get("/me")
    async getMe(@AuthUserPayload() authUser: AuthUser) {
        const user = await this.usersService.findUserById(authUser.id);
        return mapUserToDto(user);
    }
    @Get("/:userId/reviews")
    getUserReview(@Param("userId", ParseIntPipe) id: number) {
        return this.usersService.findUserReviews(id);
    }
    @Get("/:userId/favorites")
    getUserFavorites(@Param("userId", ParseIntPipe) id: number) {
        return this.usersService.findUserFavorites(id);
    }
    @Post("/like")
    like(@Body() likedItem: LikedItem) {
        return this.usersService.like(likedItem);
    }

    @Post("/dislike")
    dislike(@Body() likedItem: LikedItem) {
        return this.usersService.dislike(likedItem);
    }
    @Post("/review")
    writeReview(@Body() reviewDto: ReviewDto) {
        return this.usersService.writeReview(reviewDto);
    }
}
