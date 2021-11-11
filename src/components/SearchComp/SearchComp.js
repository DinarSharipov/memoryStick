import React from "react";
import { TextField } from "@mui/material";
import { Box } from "@mui/system";

const SearchComp = (props) => {
  return (
    <div>
      <Box>
        <TextField
          size="small"
          onChange={(e) => props.searchFunc(e.target.value)}
          sx={{ width: "100%" }}
          label="Какое слово потеряли?"
        />
      </Box>
    </div>
  );
};

export default SearchComp;
