import { useState, useContext, useEffect, Fragment, useRef } from "react";

import AddIcon from "@material-ui/icons/Add";
import RadioButtonUncheckedIcon from "@material-ui/icons/RadioButtonUnchecked";
import RadioButtonCheckedIcon from "@material-ui/icons/RadioButtonChecked";

import TransitionsModal from "../TransitionModal";
//context
import { PinContext } from "../../Context/PinContext";

function PinProduct({ productName, website, availability, productPrice, id }) {
  const { setPinList, pinList } = useContext(PinContext);
  const [clicked, setClicked] = useState(false);

  //modal
  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const item = [{ productName: productName, website: website, availability: availability, productPrice: productPrice, id: id }];

  const handleClick = () => {
    setClicked(!clicked);
    if (localStorage.getItem("pins") === null) {
      localStorage.setItem("pins", JSON.stringify(item));
      setPinList(item);
      return;
    }
    let pins = JSON.parse(localStorage.getItem("pins"));

    let modulValue = pins.every((product) => {
      if (product.productName === productName) {
        return false;
      }
      return true;
    });

    if (modulValue === false) {
      handleOpen();
    } else {
      pins.push(...item);
      localStorage.setItem("pins", JSON.stringify(pins));
      setPinList(pins);
    }
  };
  return (
    <Fragment>
      <TransitionsModal handleOpen={handleOpen} setOpen={setOpen} open={open} />
      {clicked ? (
        <AddIcon style={{ cursor: "pointer", marginRight: "10px" }} onClick={handleClick} />
      ) : (
        <AddIcon style={{ cursor: "pointer", marginRight: "10px" }} onClick={handleClick} />
      )}
    </Fragment>
  );
}

export default PinProduct;
