//react
import { useContext, useState, useEffect } from "react";

//material ui
import { makeStyles } from "@material-ui/core/styles";
import TabsPanel from "../components/Tabs";
import Menu from "../components/Menus/Menu";
import Products from "../components/Products/Products";

//other
import { getParts } from "../helper/index";
//context
import { PinContext } from "../Context/PinContext";
import { FilterContext } from "../Context/FilterContext";
import { PartDataContext } from "../Context/PartDataContext";

//fetch
import fetch from "isomorphic-fetch";

const useStyles = makeStyles((theme) => ({
  root: {
    height: "92vh",
  },
}));

function Search({ data }) {
  const classes = useStyles();
  const [pinList, setPinList] = useState([]);
  const [partData, setPartData] = useState(data || []);
  const [filterObject, setFilterObject] = useState({
    productName: { $regex: "" },
    availability: { $exists: true },
    productPrice: { $gte: 0, $lte: 100000 },
    website: { $exists: true },
    type: "switches",
    region: { $exists: true },
  });

  const getPinsFromDb = async () => {
    let localPinList = localStorage.getItem("pins");
    const response = await fetch("/api/byId", { method: "POST", body: localPinList });
    const data = await response.json();
    localPinList = await JSON.parse(localPinList);

    data.data.forEach((pin, index) => {
      if (pin === null) {
        data.data[index] = localPinList[index];
        data.data[index].isUknown = true;
      }
    });

    setPinList(data.data);
    //localStorage.setItem("pins", JSON.stringify(data.data));
  };

  useEffect(() => {
    //since we cannot access localstorage in server side rendering, we put it in useEffect
    if (localStorage.getItem("pins") !== null) {
      getPinsFromDb();
    }
  }, []);

  return (
    <PinContext.Provider value={{ pinList, setPinList }}>
      <FilterContext.Provider value={{ filterObject, setFilterObject }}>
        <PartDataContext.Provider value={{ partData, setPartData }}>
          <div className={classes.root}>
            <TabsPanel partData={partData} setPartData={setPartData} filterObject={filterObject} setFilterObject={setFilterObject} />
            <Menu />
            <Products partData={partData} setPartData={setPartData} pinList={pinList} setPinList={setPinList} />
          </div>
        </PartDataContext.Provider>
      </FilterContext.Provider>
    </PinContext.Provider>
  );
}

export const getStaticProps = async () => {
  let data = await getParts({
    productName: { $regex: "" },
    availability: "IN-STOCK",
    productPrice: { $gte: 0, $lte: 100000 },
    website: { $exists: true },
    type: "switches",
    region: { $exists: true },
  });

  return {
    props: {
      data: data.map((part) => ({
        productName: part.productName,
        productPrice: part.productPrice,
        availability: part.availability,
        website: part.website,
        region: part.region,
        url: part.url,
        _id: part._id.toString(),
      })),
    },
  };
};

export default Search;
