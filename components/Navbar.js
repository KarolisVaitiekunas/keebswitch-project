//next
import { useRouter } from "next/router";
import Link from "next/link";

//material ui
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
  },
  Toolbar: {
    display: "flex",
    justifyContent: "flex-start",
    minHeight: "8vh",
  },
  links: {
    display: "flex",
    justifyContent: "space-between",
    width: "7%",
    cursor: "pointer",
  },

  appbarTitle: {
    cursor: "pointer",
  },

  toolbarMargin: {
    // border: "1px solid red",
    // ...theme.mixins.toolbar,
    // paddingBottom: "4.7em",
    minHeight: "8vh",

    // [theme.breakpoints.down("xs")]: {
    //   paddingBottom: "4em",
    // },
  },
}));

function Navbar() {
  const classes = useStyles();
  const router = useRouter();
  return (
    <div className={classes.root}>
      <AppBar color="secondary" position="fixed">
        <Toolbar className={classes.Toolbar}>
          <Typography className={classes.appbarTitle} variant="h4" onClick={() => router.push("/")}>
            Keebswitch
          </Typography>
        </Toolbar>
      </AppBar>
      <div className={classes.toolbarMargin} />
    </div>
  );
}

export default Navbar;
