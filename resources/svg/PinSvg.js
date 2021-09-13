import * as React from "react";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  svg: {
    height: "29px",
  },
}));

function SvgComponent({ selectedButton, type }) {
  const classes = useStyles();
  return (
    <svg className={classes.svg} viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <style>{`.prefix__cls-1{fill:${selectedButton === type ? "#007CC7" : "black"}}`}</style>
      </defs>
      <title />
      <g data-name="Layer 22" id="prefix__Layer_22">
        <path
          className="prefix__cls-1"
          d="M16 28.53a1 1 0 01-.71-.29L3.76 16.71a1 1 0 010-1.42l1.52-1.51a6.06 6.06 0 016.37-1.43l5.41-5.41-.94-.94a1 1 0 010-1.41l3.29-3.3a1 1 0 011.41 0l9.89 9.89a1 1 0 010 1.41l-3.3 3.29a1 1 0 01-1.41 0l-.94-.94-5.41 5.41a6.08 6.08 0 01-1.43 6.37l-1.51 1.52a1 1 0 01-.71.29zM5.88 16L16 26.12l.81-.81a4.12 4.12 0 00.77-4.75 1 1 0 01.18-1.15l6.59-6.59a1 1 0 011.42 0l.94.94 1.88-1.88-8.47-8.47-1.88 1.88.94.94a1 1 0 010 1.42l-6.59 6.59a1 1 0 01-1.15.18 4.12 4.12 0 00-4.75.77z"
        />
        <path
          className="prefix__cls-1"
          d="M2 31a1 1 0 01-.71-.29 1 1 0 010-1.42l8.24-8.23a1 1 0 011.41 1.41l-8.23 8.24A1 1 0 012 31zM25.06 14.53a1 1 0 01-.71-.29l-2.47-2.47a1 1 0 111.42-1.42l2.47 2.47a1 1 0 010 1.42 1 1 0 01-.71.29z"
        />
      </g>
    </svg>
  );
}

export default SvgComponent;
