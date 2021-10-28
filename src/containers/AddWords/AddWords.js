import React, { Component } from "react";
import { Add } from "@mui/icons-material";
import { Container, Button, Typography, TextField } from "@mui/material";
import { Box } from "@mui/system";

class AddWords extends Component {
  render() {
    return (
      <>
        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <TextField
            sx={{ flexGrow: 1, mr: 1, mt: 2 }}
            size="small"
            id="1"
            label="Напишите слово на английском"
          />
          <TextField
            sx={{ flexGrow: 1, mr: 1, mt: 2 }}
            size="small"
            id="1"
            label="Напишите перевод слова"
          />
          <Button sx={{ p: 0.9, mt: 2 }} variant="outlined" color="primary">
            Добавить новое слово
            <Add></Add>
          </Button>
        </Box>
      </>
    );
  }
}

export default AddWords;
