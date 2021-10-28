import React from "react";
import classes from "./HeaderComp.module.css";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

const HeaderComp = () => {
  return (
    <Box>
      <AppBar position="relative" color="primary">
        <Toolbar>
          <Typography variant="h6">Учим English!</Typography>
        </Toolbar>
      </AppBar>
      <div className="wrapper"></div>
    </Box>
  );
};

export default HeaderComp;
