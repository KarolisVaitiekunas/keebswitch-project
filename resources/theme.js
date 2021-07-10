import { createMuiTheme } from "@material-ui/core/styles";

const switchyDarkBlue = "#12232E";
const switchyBlue = "#007CC7";
const switchyLightBlue = "#4DA8DA";

const switchyShadowDarkBlue = "#203647";
const switchyShadowLightBlue = "#EEFBFB";

export default createMuiTheme({
  palette: {
    common: {
      darkBlue: `${switchyDarkBlue}`,
      blue: `${switchyBlue}`,
      lightBlue: `${switchyLightBlue}`,

      shadowDark: `${switchyShadowDarkBlue}`,
      shadowLight: `${switchyShadowLightBlue}`,
    },
    primary: {
      main: `${switchyBlue}`,
    },
    secondary: {
      main: `${switchyDarkBlue}`,
    },
  },
  typography: {
    tab: {
      fontFamily: "Raleway",
      textTransform: "none",
      fontWeight: 700,
      fontSize: "1rem",
    },
    estimate: {
      fontFamily: "Pacifico",
      fontSize: "1rem",
      textTransform: "none",
      color: "white",
    },
  },
  typography: {
    filterLabel: {
      color: "rgba(0, 0, 0, 0.54)",
      fontSize: "1.4rem",
      display: "flex",
      justifyContent: "center",
    },
  },
});
