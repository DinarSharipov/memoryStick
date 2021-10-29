import React from "react";
import classes from "./HeaderComp.module.css";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { IconButton, Button } from "@mui/material";
import { HomeOutlined } from "@mui/icons-material";
import { NavLink } from "react-router-dom";
import LearnedWords from "../MemorizedGame/LearnedWords/LearnedWords";
import ViewListOutlinedIcon from "@mui/icons-material/ViewListOutlined";

// Этот компонент надо переделать под классовый и засунуть сюда автозапуск функции для показа количества слов в базе, иначе он не запускается при обновлении на других страницах
const HeaderComp = () => {
  return (
    <Box>
      <AppBar position="relative" color="primary">
        <Toolbar>
          <Typography variant="h6">Учим English!</Typography>
          <NavLink to="/" style={{ marginLeft: 20 }}>
            <IconButton>
              <HomeOutlined color="inherit" />
            </IconButton>
          </NavLink>

          <LearnedWords />
          <NavLink to="/wordslist" style={{ marginLeft: 20, color: "white" }}>
            <Button variant="outlined" color="inherit">
              Показать все слова
              <ViewListOutlinedIcon sx={{ ml: 2 }} />
            </Button>
          </NavLink>
        </Toolbar>
      </AppBar>
      <div className="wrapper"></div>
    </Box>
  );
};

export default HeaderComp;
