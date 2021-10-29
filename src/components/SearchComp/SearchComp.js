import React from "react";
import { TextField } from "@mui/material";
import { Box } from "@mui/system";

const SearchComp = (props) => {
  return (
    <div>
      <Box sx={{ width: "100%", p: 2, textAlign: "center" }}>
        <TextField
          onChange={(e) => props.searchFunc(e.target.value)}
          sx={{ width: "60%" }}
          id="1"
          label="Что ищем?"
        />
      </Box>
    </div>
  );
};

export default SearchComp;
