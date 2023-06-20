import { Typography } from "@mui/material";
import CardContent from "@mui/material/CardContent";
import { FC } from "react";

import { CityDto } from "../../../types/dto/common/CityDto";
import { CardBase } from "./CardBase";

interface CardCityProps {
    city: CityDto;
}

export const CardCity: FC<CardCityProps> = ({ city }) => {
    return (
        <CardBase navigateTo={`/city/${city.id}`} imageAlt={city.label} imageUrl={city.imageUrl}>
            <CardContent>
                <Typography variant="body1">{city.label}</Typography>
                {city.country && <Typography variant="body2">{city.country.label}</Typography>}
            </CardContent>
        </CardBase>
    );
};
