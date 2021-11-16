import { Chip } from "@mui/material";
import React, { useEffect } from "react";
import { connect } from "react-redux";

const LearnedWords = (props) => {
  return (
    <Chip
      color="info"
      sx={{
        borderRadius: 1,
        fontSize: 18,
      }}
      label={"Количество слов: " + props.userWordsLength}
    />
  );
};

function mapStateToProps(state) {
  return {
    userWordsLength: Object.keys(state.words.userBase.words).length,
  };
}

export default connect(mapStateToProps)(LearnedWords);
