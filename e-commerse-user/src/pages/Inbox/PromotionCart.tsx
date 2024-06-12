import React from "react";
import { Card, CardContent, Typography, CardMedia } from "@mui/material";

interface NotificationCardProps {
  image: string;
  title: string;
  price: string;
}

const NotificationCard: React.FC<NotificationCardProps> = ({
  image,
  title,
  price,
}) => {
  return (
    <Card sx={{ maxWidth: 345, borderRadius: "12px" }}>
      <CardMedia component="img" height="140" image={image} alt={title} />
      <CardContent>
        <Typography
          variant="body1"
          component="div"
          sx={{
            display: "-webkit-box",
            WebkitBoxOrient: "vertical",
            WebkitLineClamp: 1,
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}
        >
          {title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {price}$
        </Typography>
      </CardContent>
    </Card>
  );
};

export default NotificationCard;
