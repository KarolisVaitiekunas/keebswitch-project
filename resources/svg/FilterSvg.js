import * as React from "react";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  svg: {
    height: "30px",
  },
}));

function SvgComponent({ selectedButton, type }) {
  const classes = useStyles();
  return (
    <svg className={classes.svg} data-name="Layer 1" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
      <title />
      <path
        fill={selectedButton === type ? "#007CC7" : "black"}
        d="M47 12a2 2 0 00-2-2H24a2 2 0 000 4h21a2 2 0 002-2zM3 14h5.35a6 6 0 100-4H3a2 2 0 000 4zm11-4a2 2 0 11-2 2 2 2 0 012-2zM45 22h-7.35a6 6 0 100 4H45a2 2 0 000-4zm-13 4a2 2 0 112-2 2 2 0 01-2 2zM22 22H3a2 2 0 000 4h19a2 2 0 000-4zM45 34H28a2 2 0 000 4h17a2 2 0 000-4zM18 30a6 6 0 00-5.65 4H3a2 2 0 000 4h9.35A6 6 0 1018 30zm0 8a2 2 0 112-2 2 2 0 01-2 2z"
      />
    </svg>
  );
}

export default SvgComponent;
