import { Card, CardActionArea, CardContent, Typography } from "@mui/material";

import { FC, ReactNode } from "react";

interface LocationTravelAdviceCardProps {
    text: string;
    children: ReactNode;
}
export const LocationTravelAdviceCard: FC<LocationTravelAdviceCardProps> = ({ children, text }) => {
    return (
        <Card sx={{ width: 250, height: 60 }}>
            <CardActionArea
                sx={{
                    display: "flex",
                    alignItems: "center",
                    height: "100%",
                    width: "100%",
                    gap: 2,
                }}
            >
                {children}
                <CardContent>
                    <Typography variant="body1">{text}</Typography>
                </CardContent>
            </CardActionArea>
        </Card>
    );
};
