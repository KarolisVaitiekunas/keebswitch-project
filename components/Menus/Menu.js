import { useState, useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Badge from "@material-ui/core/Badge";
import MailIcon from "@material-ui/icons/Mail";

//menus
import FilterMenu from "./FilterMenu";
import PinMenu from "./PinMenu";
import FilterLowerMenu from "./FilterLowerMenu";
import FilterHigherMenu from "./FilterHigherMenu";
//menu svg
import PinSvg from "../../resources/svg/PinSvg";
import FilterSvg from "../../resources/svg/FilterSvg";
import FilterLowerSvg from "../../resources/svg/FilterLowerSvg";
import FilterHigherSvg from "../../resources/svg/FilterHigherSvg";

//context
import { PinContext } from "../../Context/PinContext";
import { PartDataContext } from "../../Context/PartDataContext";
import { FilterContext } from "../../Context/FilterContext";

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
  },
  AppBar: {
    flexGrow: "1",
    backgroundColor: "white",
  },
  tab: {
    minWidth: "70px",
    width: "70px",
    padding: 0,
  },
}));

export default function Menu() {
  const classes = useStyles();

  //pins
  const { pinList } = useContext(PinContext);
  const { filterObject, setFilterObject } = useContext(FilterContext);
  const { partData, setPartData } = useContext(PartDataContext);

  //handle tab change
  const [value, setValue] = useState(0);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  //menu tabs change
  const [selectedButton, setSelectedButton] = useState("higher");
  const types = ["lower", "higher"];
  const [selectedButton2, setSelectedButton2] = useState("none");
  const types2 = ["filter", "pin"];

  //open/close drawer
  const toggleDrawer = (anchor, open, state, setState, type) => (event) => {
    if (event && event.type === "keydown" && (event.key === "Tab" || event.key === "Shift")) {
      return;
    }
    if (open) {
      //if drawer opens it will light up the button that corresponds with type
      setSelectedButton2(type);
    } else {
      //if it closes it will de-light the corresponding type button
      setSelectedButton2("none");
    }
    setState({ ...state, [anchor]: open });
  };

  return (
    <div className={classes.root}>
      <AppBar elevation={0} className={classes.AppBar} position="static" color="default">
        <Tabs
          value={value}
          onChange={handleChange}
          TabIndicatorProps={{
            style: {
              display: "none",
            },
          }}
          indicatorColor="primary"
          textColor="primary"
          centered
        >
          <Tab
            className={classes.tab}
            label={
              <FilterMenu toggleDrawer={toggleDrawer} type={types2[0]}>
                <FilterSvg selectedButton={selectedButton2} type={types2[0]} />
              </FilterMenu>
            }
            {...a11yProps(1)}
          />
          <Tab
            className={classes.tab}
            label={
              <PinMenu toggleDrawer={toggleDrawer} type={types2[1]}>
                <Badge badgeContent={pinList.length} color="primary">
                  <PinSvg selectedButton={selectedButton2} type={types2[1]} />
                </Badge>
              </PinMenu>
            }
            {...a11yProps(2)}
          />
          <Tab
            onClick={() => setSelectedButton(types[0])}
            className={classes.tab}
            label={
              <FilterLowerMenu filterObject={filterObject} setFilterObject={setFilterObject} partData={partData} setPartData={setPartData}>
                <FilterLowerSvg selectedButton={selectedButton} type={types[0]} />
              </FilterLowerMenu>
            }
            {...a11yProps(3)}
          />
          <Tab
            onClick={() => setSelectedButton(types[1])}
            className={classes.tab}
            label={
              <FilterHigherMenu filterObject={filterObject} setFilterObject={setFilterObject} partData={partData} setPartData={setPartData}>
                <FilterHigherSvg selectedButton={selectedButton} type={types[1]} />
              </FilterHigherMenu>
            }
            {...a11yProps(4)}
          />
        </Tabs>
      </AppBar>
    </div>
  );
}
