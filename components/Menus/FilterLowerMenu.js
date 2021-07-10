import { Button } from "@material-ui/core";
//fetch
import fetch from "isomorphic-fetch";

function FilterLowerMenu({ children, filterObject, setFilterObject, partData, setPartData }) {
  const handleSearchByLower = async () => {
    const response = await fetch("/api/data", { method: "POST", body: JSON.stringify([filterObject, -1]) });
    const data = await response.json();
    setPartData(data.data);
  };
  return <div onClick={handleSearchByLower}>{children}</div>;
}

export default FilterLowerMenu;
