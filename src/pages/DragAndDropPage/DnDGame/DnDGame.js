import { ImageList, ImageListItem } from "@mui/material";
import React, { Component } from "react";
import { connect } from "react-redux";

class DnDGame extends Component {
  componentDidMount() {}

  puzzlesRender() {
    let renderList = [];
    let image = this.props.images[this.props.match.params.id];
    let puzzles = image.pazlimages;
    console.log(puzzles);
    puzzles.forEach((puzzle, index) => {
      let html = (
        <ImageListItem key={index}>
          <img
            style={{ borderRadius: "5px" }}
            src={puzzle}
            alt={index}
            loading="lazy"
          />
        </ImageListItem>
      );
      renderList.push(html);
    });
    return renderList;
  }

  render() {
    return (
      <ImageList sx={{ maxWidth: 500 }} cols={3} rowHeight="auto">
        {this.puzzlesRender()}
      </ImageList>
    );
  }
}

function mapStateToProps(state) {
  return {
    images: state.dragAndDrop.images,
  };
}

export default connect(mapStateToProps)(DnDGame);
