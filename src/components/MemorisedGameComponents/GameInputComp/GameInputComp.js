import React from "react";
import { Stack, Chip, TextField, Collapse, Paper } from "@mui/material";

const GameInputComp = (props) => {
  return (
    <Stack sx={{ mt: 1 }}>
      <Stack direction="row" spacing={1}>
        <Paper sx={{ p: 1, bgcolor: "green", color: "#fff" }}>
          {props.word.eng}
        </Paper>
        <Paper sx={{ display: props.checked ? "none" : "inittial", p: 1 }}>
          {props.word.rus}
        </Paper>
      </Stack>
      <Collapse in={props.checked}>
        <TextField
          sx={{ width: "100%", m: 1 }}
          size="small"
          label="Напишите перевод слова"
          onChange={(e) =>
            props.checkWord(
              e.target.value.toLowerCase().trim(),
              props.word,
              props.wordId
            )
          }
        />
      </Collapse>
    </Stack>
  );
};

export default GameInputComp;
