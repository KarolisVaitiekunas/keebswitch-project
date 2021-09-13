import React, { useState, useContext, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import MenuItem from "@material-ui/core/MenuItem";
import { Typography } from "@material-ui/core";
import Slider from "@material-ui/core/Slider";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import ListItemText from "@material-ui/core/ListItemText";
import Select from "@material-ui/core/Select";
import Checkbox from "@material-ui/core/Checkbox";
import Chip from "@material-ui/core/Chip";
import FormLabel from "@material-ui/core/FormLabel";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormHelperText from "@material-ui/core/FormHelperText";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";

import fetch from "isomorphic-fetch";

//context
import { FilterContext } from "../../Context/FilterContext";
import { PartDataContext } from "../../Context/PartDataContext";

const avalibilities = [
  {
    value: "IN-STOCK",
    label: "In Stock",
  },
  {
    value: "PRE-ORDER",
    label: "Pre order",
  },
  {
    value: "OUT OF STOCK",
    label: "Out Of Stock",
  },
];

const useStyles = makeStyles((theme) => ({
  root: {
    height: "1350px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "column",
  },

  section: {
    width: "100%",
    // "& > :nth-of-type(1)": {
    //   border: "1px solid red",
    // },
  },

  slider: {
    marginLeft: "auto",
    marginRight: "auto",
    display: "block",
    width: "90%",
  },
  sliderValue: {
    textAlign: "center",
  },
  selector: {
    width: "90%",
    display: "block",
    marginLeft: "auto",
    marginRight: "auto",
  },
  selectLabel: {
    ...theme.typography.filterLabel,
  },
  formControl: {
    margin: theme.spacing(1),
    display: "block",
  },
  vendorSelectors: {
    maxHeight: "400px",
    overflow: "auto",
  },
  grid: {
    width: "100%",
    marginLeft: "auto",
    marginRight: "auto",
  },
  gridItem: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  regionTitle: {
    [theme.breakpoints.down("md")]: {
      fontSize: "1rem",
    },
  },
  applyButton: {
    marginBottom: "5px",
  },
}));
function Selector() {
  const classes = useStyles();

  //CONTEXT
  const { filterObject, setFilterObject } = useContext(FilterContext);
  const { partData, setPartData } = useContext(PartDataContext);

  //AVAILABILITY
  const [availability, setAvailability] = React.useState(filterObject.availability || "");

  const handleChangeAvailability = (event) => {
    console.log(event.target.value);
    setFilterObject({ ...filterObject, availability: event.target.value });

    setAvailability(event.target.value);
  };

  //PRICE
  const [prices, setPrices] = React.useState([filterObject.productPrice.$gte, filterObject.productPrice.$lte] || [0, 1000]);
  const handlePriceChange = (event, newValue) => {
    console.log(newValue);
    setFilterObject({ ...filterObject, productPrice: { $gte: newValue[0], $lte: newValue[1] } });
    setPrices(newValue);
  };
  function valuetext(prices) {
    return `${prices}°C`;
  }

  //SHOP

  const [Vendors, setVendors] = useState([
    // { Region: "Oceania", selected: true, shop: "switchkeys" },
    // { Region: "Asia", selected: true, shop: "mechkey" },
    // { Region: "China", selected: true, shop: "kbdfans" },
    // { Region: "Europe", selected: true, shop: "candykeys" },
    // { Region: "Europe", selected: true, shop: "keebwerk" },
    // { Region: "Europe", selected: true, shop: "kat koil" },
    // { Region: "UK", selected: true, shop: "mechbox" },
    // { Region: "USA", selected: true, shop: "cannonkeys" },
    // { Region: "Canada", selected: true, shop: "ashkeebs" },
    // { Region: "Latin America", selected: true, shop: "neonkeys" },
    // { Region: "Africa", selected: true, shop: "ctrlshiftesc" },

    {
      Region: "USA",
      selected: Array.isArray(filterObject.website)
        ? Array.isArray(filterObject.website) && filterObject.website.includes("divinikey")
          ? true
          : false
        : true,
      shop: "divinikey",
    },
    {
      Region: "Asia",
      selected: Array.isArray(filterObject.website)
        ? Array.isArray(filterObject.website) && filterObject.website.includes("eloquentclicks")
          ? true
          : false
        : true,
      shop: "eloquentclicks",
    },
  ]);

  const handleChangeVendor = (event, index) => {
    let vendors = [...Vendors];
    vendors[index].selected = event.target.checked;
    setVendors(vendors);

    let allowedWebsites = [];

    vendors.map((website) => {
      if (website.selected === true) {
        allowedWebsites.push(website.shop);
      }
    });
    setFilterObject({ ...filterObject, website: allowedWebsites });
  };

  //REGION
  let _region = ["Oceania", "Asia", "China", "Europe", "UK", "USA", "Canada", "Latin America", "Africa"];

  const [regions, setRegions] = useState(
    _region.map((_region) => {
      return {
        region: _region,
        selected: Array.isArray(filterObject.region)
          ? Array.isArray(filterObject.region) && filterObject.region.includes(_region)
            ? true
            : false
          : true,
      };
    })
  );

  const handleChangeRegion = (event, index) => {
    let newregions = [...regions];
    newregions[index].selected = event.target.checked;
    setRegions(newregions);

    let allowedRegions = [];

    newregions.map((region) => {
      if (region.selected === true) {
        allowedRegions.push(region.region);
      }
    });

    setFilterObject({ ...filterObject, region: allowedRegions });
  };

  //fetch- get filtered parts

  const getFilteredParts = async () => {
    const response = await fetch("/api/data", { method: "POST", body: JSON.stringify(filterObject) });
    const data = await response.json();
    setPartData(data.data);
  };

  return (
    <div className={classes.root}>
      <section className={classes.section}>
        <Typography className={classes.selectLabel}>Select availability</Typography>
        <TextField
          className={classes.selector}
          select
          label={<Typography>Select availability</Typography>}
          value={availability}
          onChange={handleChangeAvailability}
          SelectProps={{
            native: true,
          }}
          helperText="Select the field you want items to be sorted by."
        >
          {avalibilities.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </TextField>
      </section>

      <section className={classes.section}>
        <Typography className={classes.selectLabel}>Select price range</Typography>
        <Slider
          className={classes.slider}
          value={prices}
          onChange={handlePriceChange}
          aria-labelledby="range-slider"
          getAriaValueText={valuetext}
          min={0}
          max={1000}
        />
        <Typography className={classes.sliderValue} variant="h5" color="primary">{`$${prices[0]} - $${prices[1]}`}</Typography>
      </section>

      <section className={classes.section}>
        <Typography className={classes.selectLabel}>Select region</Typography>
        <Grid className={classes.grid} container justify="center" spacing={2}>
          {regions.map((region, index) => {
            return (
              <Grid className={classes.gridItem} xs={6} item key={index}>
                <Typography className={classes.regionTitle}>{region.region}</Typography>
                <Checkbox
                  checked={region.selected}
                  onChange={(event) => handleChangeRegion(event, index)}
                  inputProps={{ "aria-label": "primary checkbox" }}
                />
              </Grid>
            );
          })}
        </Grid>
      </section>

      <section className={classes.section}>
        <Typography className={classes.selectLabel}>Select vendors</Typography>
        <Grid className={classes.grid} container justify="center" spacing={2}>
          {Vendors.map((vendor, index) => {
            return (
              <Grid className={classes.gridItem} xs={6} item key={index}>
                <Typography className={classes.regionTitle}>{vendor.shop}</Typography>
                <Checkbox checked={Vendors[index].selected} onChange={(event) => handleChangeVendor(event, index)} name={vendor.shop} />
              </Grid>
            );
          })}
        </Grid>
      </section>
      <Button className={classes.applyButton} onClick={getFilteredParts} color="primary" variant="contained">
        Apply filters
      </Button>
    </div>
  );
}

export default Selector;
