import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Button, CardActionArea, CardActions } from "@mui/material";
import { Link } from "react-router-dom";
import { Grid } from "@mui/material";

const AppItem = (app) => {
  return (
    <Grid item xs={3}>
      <Card sx={{ maxWidth: 345 }}>
        <CardActionArea>
          <CardMedia
            component="img"
            height="140"
            image={app.app.src}
            alt="green iguana"
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              {app.app.name}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {app.app.description}
            </Typography>
          </CardContent>
        </CardActionArea>
        <CardActions>
          <Link to={app.app.url}>
            <Button size="small" color="primary">
              Открыть
            </Button>
          </Link>
        </CardActions>
      </Card>
    </Grid>
  );
};

export default AppItem;
