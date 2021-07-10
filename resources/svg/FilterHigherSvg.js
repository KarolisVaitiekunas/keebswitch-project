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
    <svg className={classes.svg} viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
      <path
        fill={selectedButton === type ? "#007CC7" : "black"}
        d="M3 0v18l-3-3v1.5L3.5 20 7 16.5V15l-3 3V0H3zm7 1v7h5V1h-5zm1 1h3v5h-3V2zm-1 9v4h4v2h-4v1h5v-7h-5zm1 1h3v2h-3v-2z"
      />
    </svg>
  );
}

export default SvgComponent;
