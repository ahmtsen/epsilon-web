import {
  Box,
  Card,
  CardContent,
  Grid,
  Icon,
  Typography,
} from "@material-ui/core";
import React from "react";

interface CardItemProps {
  cardTitle: string;
  cardContent: string;
  icon: React.ReactNode;
}

export const CardItem: React.FC<CardItemProps> = ({
  cardTitle,
  cardContent,
  icon,
}) => {
  return (
    <Card>
      <CardContent>
        <Grid container justify="space-between" spacing={3}>
          <Grid item>
            <Typography gutterBottom variant="h6">
              {cardTitle}
            </Typography>
            <Typography>{cardContent}</Typography>
          </Grid>
          <Box margin={2}>
            <Icon>{icon}</Icon>
          </Box>
        </Grid>
      </CardContent>
    </Card>
  );
};
