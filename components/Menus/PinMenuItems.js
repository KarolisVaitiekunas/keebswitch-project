import React from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import ImageIcon from "@material-ui/icons/Image";
import WorkIcon from "@material-ui/icons/Work";
import BeachAccessIcon from "@material-ui/icons/BeachAccess";
import Divider from "@material-ui/core/Divider";
import { Fragment } from "react";
import { Button, Typography } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  mainTitle: {
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
    maxWidth: "150px",
    fontSize: "0.8rem",
  },
  button: {
    padding: "1px",
    fontSize: "0.7rem",
    marginTop: "6px",
  },
}));

export default function PinMenuItems({ productName, website, url, availability, productPrice, handleDelete, isUknown }) {
  const classes = useStyles();
  const theme = useTheme();

  return (
    <Fragment>
      <ListItem alignItems="space-between" classes={{ container: classes.listItem }}>
        <ListItemAvatar>
          <Avatar>
            <ImageIcon />
          </Avatar>
        </ListItemAvatar>
        <ListItemText
          primary={
            <Typography
              style={{ color: isUknown ? "red" : theme.palette.primary, cursor: "pointer" }}
              className={classes.mainTitle}
              component="h6"
              onClick={() => window.open(url)}
            >
              {productName}
            </Typography>
          }
          secondary={`${website} | ${productPrice} | ${availability}`}
        />
        <Button color="secondary" className={classes.button} variant="outlined" onClick={() => handleDelete(productName)}>
          Delete
        </Button>
      </ListItem>
      <Divider className={classes.divider} variant="inset" component="li" />
    </Fragment>
  );
}
