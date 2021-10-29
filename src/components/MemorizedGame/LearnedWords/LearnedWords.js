import { Chip } from "@mui/material";
import React from "react";
import { connect } from "react-redux";

const LearnedWords = (props) => {
  return <Chip label={"Количество слов в базе: " + props.length} />;
};

function mapStateToProps(state) {
  return {
    length: state.words.length,
  };
}

export default connect(mapStateToProps)(LearnedWords);
