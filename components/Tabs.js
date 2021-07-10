import { useState } from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import useMediaQuery from "@material-ui/core/useMediaQuery";

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `scrollable-auto-tab-${index}`,
    "aria-controls": `scrollable-auto-tabpanel-${index}`,
  };
}

function TabPanel(props) {
  const { children, value, index, filterObject, setFilterObject, partData, setPartData, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`scrollable-auto-tabpanel-${index}`}
      aria-labelledby={`scrollable-auto-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: "1400px",
    marginLeft: "auto",
    marginRight: "auto",
  },
  AppBar: {
    flexGrow: "1",
    backgroundColor: "white",
  },
  tabs: {},
}));

function TabsPanel({ filterObject, setFilterObject, partData, setPartData }) {
  const classes = useStyles();
  const [value, setValue] = useState(0);
  const tabs = ["SWITCHES", "STABILIZERS", "KEYCAPS", "PLATES", "PCBS", "CASES", "ACCESORIES", "DIY KITS"];

  // const handleChangeType = async (newValue) => {
  //   const temporaryFilterObject = { ...filterObject, type: newValue.toString() };
  //   setFilterObject(temporaryFilterObject);
  //   const response = await fetch("/api/data", { method: "POST", body: JSON.stringify(temporaryFilterObject) });
  //   const data = await response.json();
  //   setPartData(data.data);
  // };

  const handleChange = async (event, newValue) => {
    setValue(newValue);

    let type = tabs[newValue];
    const temporaryFilterObject = { ...filterObject, type: type.toLowerCase() };
    setFilterObject(temporaryFilterObject);
    const response = await fetch("/api/data", { method: "POST", body: JSON.stringify(temporaryFilterObject) });
    const data = await response.json();
    setPartData(data.data);
  };
  const matches = useMediaQuery("(min-width:1250px)");
  return (
    <div className={classes.root}>
      <AppBar elevation={0} className={classes.AppBar} position="static" color="default">
        {matches ? (
          <Tabs value={value} onChange={handleChange} indicatorColor="primary" textColor="primary" centered>
            {tabs.map((tab, index) => (
              <Tab key={index} label={tab} {...a11yProps(index)} />
            ))}
          </Tabs>
        ) : (
          <Tabs
            className={classes.tabs}
            value={value}
            onChange={handleChange}
            indicatorColor="primary"
            textColor="primary"
            variant="scrollable"
            scrollButtons="auto"
            aria-label="scrollable auto tabs example"
          >
            {tabs.map((tab, index) => (
              <Tab key={index} label={tab} {...a11yProps(index)} />
            ))}
          </Tabs>
        )}
      </AppBar>
    </div>
  );
}

export default TabsPanel;
