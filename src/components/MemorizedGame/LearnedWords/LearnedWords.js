import { Chip } from "@mui/material";
import React from "react";
import { connect } from "react-redux";

const LearnedWords = (props) => {
  return (
    <Chip
      color="info"
      sx={{
        borderRadius: 1,
        p: "17px",
        border: "1px solid white",
        fontSize: 20,
      }}
      label={
        "Ваш словарный запас: " +
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
