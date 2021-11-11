import { Chip } from "@mui/material";
import React from "react";
import { connect } from "react-redux";

const LearnedWords = (props) => {
  return (
    <Chip
      color="info"
      sx={{
        borderRadius: 1,
        fontSize: 20,
      }}
      label={
        "В вашем словарном запасе: " +
        props.length +
        (props.length > 4 ? " слов" : " слова")
      }
    />
  );
};

function mapStateToProps(state) {
  return {
    length: state.words.length,
  };
}

export default connect(mapStateToProps)(LearnedWords);
