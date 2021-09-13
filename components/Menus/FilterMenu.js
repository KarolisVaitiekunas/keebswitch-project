import React from "react";

import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import SwipeableDrawer from "@material-ui/core/SwipeableDrawer";

import Selector from "../Selectors/Selector";

const useStyles = makeStyles((theme) => ({
  root: {
    height: "100%",
    width: "100%",
  },

  list: {
    height: "100%",
    width: 450,
    overflow: "auto",
    "&::-webkit-scrollbar": {
      width: "4px",
      height: "8px",
    },

    "&::-webkit-scrollbar-thumb": {
      background: "linear-gradient(13deg, #007CC7 31%,#12232E 76%)",
      borderRadius: "17px",
    },

    "&::-webkit-scrollbar-thumb:hover": {
      background: "linear-gradient(13deg, #007CC7 32%,#12232E 75%)",
    },

    "&::webkit-scrollbar-track": {
      background: "#FFFFFF",
      borderRadius: "10px",
      boxShadow: "inset 7px 10px 12px 0px #F0F0F0",
    },

    [theme.breakpoints.down("sm")]: {
      width: 320,
    },
  },
  fullList: {
    width: "auto",
  },
}));

export default function FilterMenu({ children, toggleDrawer, type }) {
  const classes = useStyles();
  const iOS = process.browser && /iPad|iPhone|iPod/.test(navigator.userAgent);
  const [state, setState] = React.useState({
    left: false,
  });

  const list = (anchor) => (
    <div
      className={clsx(classes.list, {
        [classes.fullList]: anchor === "top" || anchor === "bottom",
      })}
      role="presentation"
      // onClick={toggleDrawer(anchor, false, state, setState, type)}
      // onKeyDown={toggleDrawer(anchor, false, state, setState, type)}
    >
      <Selector />
    </div>
  );

  return (
    <div className={classes.root}>
      {["left"].map((anchor) => (
        <React.Fragment key={anchor}>
          <div className={classes.icon} onClick={toggleDrawer(anchor, true, state, setState, type)}>
            {children}
          </div>
          <SwipeableDrawer
            anchor={anchor}
            open={state[anchor]}
            onClose={toggleDrawer(anchor, false, state, setState, type)}
            onOpen={toggleDrawer(anchor, true, state, setState, type)}
            disableBackdropTransition={!iOS}
            disableDiscovery={iOS}
          >
            {list(anchor)}
          </SwipeableDrawer>
        </React.Fragment>
      ))}
    </div>
  );
}
