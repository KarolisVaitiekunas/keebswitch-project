import { useState, useContext, useEffect } from "react";
import { makeStyles, useTheme, withStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import IconButton from "@material-ui/core/IconButton";
import FirstPageIcon from "@material-ui/icons/FirstPage";
import KeyboardArrowLeft from "@material-ui/icons/KeyboardArrowLeft";
import KeyboardArrowRight from "@material-ui/icons/KeyboardArrowRight";
import LastPageIcon from "@material-ui/icons/LastPage";
import TableHead from "@material-ui/core/TableHead";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

import PinProduct from "../Products/PinProduct";
import TransitionsModal from "../TransitionModal";

//fetch
import fetch from "isomorphic-fetch";

//context
import { FilterContext } from "../../Context/FilterContext";
import { PartDataContext } from "../../Context/PartDataContext";

//table customization
const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.darkBlue,
    color: theme.palette.common.lightBlue,
  },
  body: {
    fontSize: 15,
    fontWeight: 900,
    color: theme.palette.common.lightBlue,
    letterSpacing: "1px",
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);

const useStyles1 = makeStyles((theme) => ({
  root: {
    flexShrink: 0,
    marginLeft: theme.spacing(2.5),
  },
}));

//table pagination

function TablePaginationActions(props) {
  const classes = useStyles1();
  const theme = useTheme();
  const { count, page, rowsPerPage, onChangePage } = props;

  const handleFirstPageButtonClick = (event) => {
    onChangePage(event, 0);
  };

  const handleBackButtonClick = (event) => {
    onChangePage(event, page - 1);
  };

  const handleNextButtonClick = (event) => {
    onChangePage(event, page + 1);
  };

  const handleLastPageButtonClick = (event) => {
    onChangePage(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
  };

  return (
    <div className={classes.root}>
      <IconButton onClick={handleFirstPageButtonClick} disabled={page === 0} aria-label="first page">
        {theme.direction === "rtl" ? <LastPageIcon /> : <FirstPageIcon />}
      </IconButton>
      <IconButton onClick={handleBackButtonClick} disabled={page === 0} aria-label="previous page">
        {theme.direction === "rtl" ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
      </IconButton>
      <IconButton onClick={handleNextButtonClick} disabled={page >= Math.ceil(count / rowsPerPage) - 1} aria-label="next page">
        {theme.direction === "rtl" ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
      </IconButton>
      <IconButton onClick={handleLastPageButtonClick} disabled={page >= Math.ceil(count / rowsPerPage) - 1} aria-label="last page">
        {theme.direction === "rtl" ? <FirstPageIcon /> : <LastPageIcon />}
      </IconButton>
    </div>
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    height: "auto",
    maxWidth: "1400px",
    marginLeft: "auto",
    marginRight: "auto",
    [theme.breakpoints.down("xs")]: {
      width: "85%",
    },
  },
  table: {
    minWidth: 700,
  },

  search: {
    marginBottom: "10px",
    marginLeft: "auto",
    marginRight: "auto",
    width: "300px",
    display: "flex",
    justifyContent: "space-around",
  },
  searchInput: {
    width: "200px",
  },
}));
function Products({ partData, setPartData }) {
  const classes = useStyles();

  // useEffect(() => {
  //   if (JSON.parse(localStorage.getItem("pins")).length > 0) {
  //     let newPartData = [];
  //     let pins = JSON.parse(localStorage.getItem("pins"));

  //     partData.forEach((part) => {
  //       pins.forEach((pinnedItem) => {
  //         if (part._id === pinnedItem.id) {
  //           part.isPinned = true;
  //         }
  //         newPartData.push(part);
  //       });
  //     });

  //     setPartData(newPartData);
  //   }
  // }, []);

  //CONTEXT
  const { filterObject, setFilterObject } = useContext(FilterContext);

  //table pagination
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const emptyRows = rowsPerPage - Math.min(rowsPerPage, partData.length - page * rowsPerPage);
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleSearchByText = async () => {
    const response = await fetch("/api/data", { method: "POST", body: JSON.stringify(filterObject) });
    const data = await response.json();
    console.log(data);
    setPartData(data.data);
  };

  const handleChangeSearchByText = async (value) => {
    setFilterObject({ ...filterObject, productName: { $regex: value, $options: "i" } });
  };

  return (
    <div className={classes.root}>
      <div className={classes.search}>
        <TextField
          className={classes.searchInput}
          color="primary"
          label="Search"
          type="search"
          variant="outlined"
          onChange={(e) => handleChangeSearchByText(e.target.value)}
        />
        <Button className={classes.button} variant="outlined" color="primary" onClick={handleSearchByText}>
          Search
        </Button>
      </div>

      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="custom pagination table">
          <TableHead>
            <TableRow>
              <StyledTableCell align="left">Product name</StyledTableCell>
              <StyledTableCell align="right">Price</StyledTableCell>
              <StyledTableCell align="right">Availability</StyledTableCell>
              <StyledTableCell align="right">Vendor</StyledTableCell>
              <StyledTableCell align="right">Region</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {(rowsPerPage > 0 ? partData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage) : partData).map((row, index) => (
              <StyledTableRow key={index}>
                <StyledTableCell component="th" scope="row" align="left">
                  <div style={{ display: "flex", alignItems: "center", maxWidth: "750px" }}>
                    <PinProduct
                      productName={row.productName}
                      website={row.website}
                      availability={row.availability}
                      productPrice={row.productPrice}
                      id={row._id}
                      isPinned={row.isPinned ? true : false}
                    />
                    {row.isPinned ? "PINNED" : row.productName}
                  </div>
                </StyledTableCell>
                <StyledTableCell align="right">{row.productPrice}</StyledTableCell>
                <StyledTableCell align="right">{row.availability}</StyledTableCell>
                <StyledTableCell align="right">{row.website}</StyledTableCell>
                <StyledTableCell align="right">Lenkija</StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
        <TablePagination
          classes={{ toolbar: classes.test }}
          rowsPerPageOptions={[5, 10, 25, { label: "All", value: -1 }]}
          colSpan={3}
          count={partData.length}
          rowsPerPage={rowsPerPage}
          page={page}
          SelectProps={{
            inputProps: { "aria-label": "rows per page" },
            native: true,
          }}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
          ActionsComponent={TablePaginationActions}
        />
      </TableContainer>
    </div>
  );
}

export default Products;
