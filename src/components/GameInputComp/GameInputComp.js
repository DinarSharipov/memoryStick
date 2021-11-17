import React from "react";
import {
  Button,
  Stack,
  Chip,
  FormControlLabel,
  Switch,
  TextField,
  Collapse,
} from "@mui/material";

const GameInputComp = (props) => {
  return (
    <Stack alignItems="center" spacing={1}>
      <Stack
        direction="row"
        spacing={1}
        sx={{
          height: "50px",
          width: "100%",
          m: 2,
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-start",
        }}
      >
        <Chip
          sx={{ fontSize: 24, p: 2 }}
          color="primary"
          label={props.word.eng}
        />
        <Collapse in={!props.checked}>
          <Chip
            sx={{
              fontSize: 24,
              p: 2,
            }}
            color="success"
            label={props.word.rus}
          />
        </Collapse>
        <Collapse in={props.checked}>
          <TextField
            sx={{ width: 300 }}
            size="small"
            label="Напишите перевод слова"
            onChange={(e) =>
              props.checkWord(e.target.value.toLowerCase(), props.word, props.wordId)
            }
          />
        </Collapse>
      </Stack>
    </Stack>
  );
};

export default GameInputComp;
