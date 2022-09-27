import { Card, CardActionArea, CardContent } from "@mui/material";

import { FC, ReactNode } from "react";

import { Typography } from "./Typography";

interface LocationTravelAdviceCard {
  text: string;
  children: ReactNode;
}
export const LocationTravelAdviceCard: FC<LocationTravelAdviceCard> = ({
  children,
  text,
}) => {
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
          <Typography text={text} variant="h3" />
        </CardContent>
      </CardActionArea>
    </Card>
  );
};
