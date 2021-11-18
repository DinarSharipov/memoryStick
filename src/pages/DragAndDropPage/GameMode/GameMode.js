import {
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Grid,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import LoaderComp from "../../../components/UI/Loader/LoaderComp";
import { fetchDragAndDropApp } from "../../../store/actions/draganddrop";

class GameMode extends Component {
  state = {};
  imagesListRender() {
    let renderList = [];
    let images = this.props.images;
    for (let [imgName, imgData] of Object.entries(images)) {
      let item = (
        <Grid item xs="auto">
          <Card>
            <CardActionArea>
              <CardMedia
                component="img"
                height="200"
                image={imgData.fullimageurl}
                alt={imgName}
              />
              <CardContent>
                <Typography variant="h4">{imgName}</Typography>
              </CardContent>
            </CardActionArea>
            <CardActions>
              <Link to={"drag&dropApp/" + imgName}>
                <Button color="success" variant="outlined">
                  Играть
                </Button>
              </Link>
            </CardActions>
          </Card>
        </Grid>
      );
      renderList.push(item);
    }
    return renderList;
  }

  componentDidMount() {
    this.props.fetchDragAndDropApp();
    console.log(this.props.images);
  }

  render() {
    return (
      <div>
        {this.props.images ? (
          <>
            <Box sx={{ textAlign: "center", mb: 2 }}>
              <Typography variant="h3">Собери пазл</Typography>
              <Typography variant="body1">
                Ниже представлены картикни которые нужно будет собрать из
                маленьких кусочков
              </Typography>
            </Box>

            <Grid container spacing={2}>
              {this.imagesListRender()}
            </Grid>
          </>
        ) : (
          <LoaderComp />
        )}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    images: state.dragAndDrop.images,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    fetchDragAndDropApp: () => dispatch(fetchDragAndDropApp()),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(GameMode);
