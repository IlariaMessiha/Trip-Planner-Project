import { AttractionReviewDto } from "../common/AttractionReviewDto";
import { RestaurantReviewDto } from "../common/RestaurantReviewDto";

export interface ReviewDto {
    review: AttractionReviewDto | RestaurantReviewDto;
    type: "attractionReview" | "restaurantReview";
}

export interface CreateReviewDto {
    review: Omit<ReviewDto["review"], "id">;
    type: "attractionReview" | "restaurantReview";
}
