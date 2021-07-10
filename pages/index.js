import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";

const useStyles = makeStyles((theme) => ({
  root: {
    // height: "100vh",
    // background: "rgb(18,35,46)",
    // background: "radial-gradient(circle, rgba(18,35,46,1) 15%, rgba(32,54,71,1) 94%)",
  },
}));

export default function Home() {
  const classes = useStyles();
  return <div className={classes.root}></div>;
}
