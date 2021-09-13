import { Button } from "@material-ui/core";
function FilterHigherMenu({ children, filterObject, setFilterObject, partData, setPartData }) {
  const handleSearchByHigher = async () => {
    const response = await fetch("/api/data", { method: "POST", body: JSON.stringify([filterObject, 1]) });
    const data = await response.json();
    setPartData(data.data);
  };
  return (
    <div style={{ width: "100%", height: "100%" }} onClick={handleSearchByHigher}>
      {children}
    </div>
  );
}

export default FilterHigherMenu;
