import { FC } from "react";
import { AttractionDto } from "../../types/dto/common/AttractionDto";
import { RestaurantDto } from "../../types/dto/common/RestaurantDto";
import { Card, CardActionArea, CardMedia, Typography } from "@mui/material";

interface tripItemProps {
    item: RestaurantDto | AttractionDto;
}
export const TripItem: FC<tripItemProps> = ({ item }) => {
    return (
        <Card sx={{ maxWidth: "100" }}>
            <CardActionArea>
                {item.imageUrl && (
                    <CardMedia image={item.imageUrl} component="img" height="100" width="100" />
                )}
                <Typography variant="h6">{item.label}</Typography>
            </CardActionArea>
        </Card>
    );
};
