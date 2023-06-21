import { Card, CardContent, Typography } from "@mui/material";

import { FC, ReactNode } from "react";

interface LocationTravelAdviceCardProps {
    text: string;
    children: ReactNode;
}
export const LocationTravelAdviceCard: FC<LocationTravelAdviceCardProps> = ({ children, text }) => {
    return (
        <Card
            sx={{
                width: 250,
                height: 60,
                display: "flex",
                alignItems: "center",
                gap: 2,
            }}
        >
            {children}
            <CardContent>
                <Typography variant="body1">{text}</Typography>
            </CardContent>
        </Card>
    );
};
