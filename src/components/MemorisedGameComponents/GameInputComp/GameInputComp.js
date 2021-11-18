import React from "react";
import { Stack, Chip, TextField, Collapse } from "@mui/material";

const GameInputComp = (props) => {
  return (
    <Stack alignItems="center" sx={{ mt: 2 }}>
      <Stack
        direction="row"
        spacing={1}
        sx={{
          height: "50px",
          m: 2,
          display: "flex",
          flexWrap: "wrap",
          alignItems: "center",
          justifyContent: "flex-start",
        }}
      >
        <Chip
          sx={{ fontSize: 18, p: 1 }}
          color="primary"
          label={props.word.eng}
        />
        <Collapse in={!props.checked}>
          <Chip
            sx={{
              fontSize: 18,
              p: 1,
            }}
            color="success"
            label={props.word.rus}
          />
        </Collapse>
        <Collapse in={props.checked}>
          <TextField
            sx={{ minWidth: "300px", mt: 1 }}
            size="small"
            label="Напишите перевод слова"
            onChange={(e) =>
              props.checkWord(
                e.target.value.toLowerCase(),
                props.word,
                props.wordId
              )
            }
          />
        </Collapse>
      </Stack>
    </Stack>
  );
};

export default GameInputComp;
