import React, { useContext, useState, useEffect } from "react";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import SwipeableDrawer from "@material-ui/core/SwipeableDrawer";
import Button from "@material-ui/core/Button";
import List from "@material-ui/core/List";
//context
import { PinContext } from "../../Context/PinContext";

import PinMenuItems from "./PinMenuItems";

const useStyles = makeStyles((theme) => ({
  list: {
    width: 450,
    [theme.breakpoints.down("sm")]: {
      width: 320,
    },
  },
  fullList: {
    width: "auto",
  },
  List: {
    width: "100%",
    backgroundColor: theme.palette.background.paper,
  },
}));

export default function PinMenu({ children, toggleDrawer, type }) {
  const classes = useStyles();
  const { setPinList, pinList } = useContext(PinContext);

  const handleDelete = (productName) => {
    let newPinList = pinList.filter((product) => productName !== product.productName);
    localStorage.setItem("pins", JSON.stringify(newPinList));
    setPinList(newPinList);
  };

  const iOS = process.browser && /iPad|iPhone|iPod/.test(navigator.userAgent);
  const [state, setState] = React.useState({
    right: false,
  });

  const list = (anchor) => (
    <div
      className={clsx(classes.list, {
        [classes.fullList]: anchor === "top" || anchor === "bottom",
      })}
      role="presentation"
    >
      <List className={classes.List}>
        {pinList.map((product, index) => {
          return (
            <PinMenuItems
              key={index}
              productName={product.productName}
              website={product.website}
              availability={product.availability}
              productPrice={product.productPrice}
              isUknown={product.isUknown}
              handleDelete={handleDelete}
            />
          );
        })}
      </List>
    </div>
  );

  return (
    <div>
      {["right"].map((anchor) => (
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
