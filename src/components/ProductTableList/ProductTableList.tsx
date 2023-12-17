import React, { useEffect, useState } from "react";
import { alpha, useTheme } from "@mui/material/styles";
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  TableSortLabel,
  Toolbar,
  Tooltip,
  Typography,
  Avatar,
  TextField,
  InputAdornment,
  Paper,
  Button
} from "@mui/material";
import { visuallyHidden } from "@mui/utils";
import {
  IconSearch,
  IconPlus,
  IconMinus
} from "@tabler/icons-react";
import { useDispatch, useSelector } from "@/shared/store/hooks";
import CustomCheckbox from "../ui/forms/CustomCheckbox";
import ProductTableEditConcurents from "../productTableEditConcurents/productTableEditConcurents";
import {
  getItemsShop,
  setCurrentItem,
  addItemInPull,
  deleteItemInPull
} from "@/shared/store/slices/reprice/repriceSlice";
import { getAuth } from "firebase/auth";
import firebase_app from "@/shared/firebase/firebase";
import { useParams } from "next/navigation";
import { AppState } from "@/shared/store/store";

function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }

  return 0;
}

type Order = "asc" | "desc";

function getComparator<Key extends keyof any>(
  order: Order,
  orderBy: Key
): (a: { [key in Key]: number | string }, b: { [key in Key]: number | string }) => number {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort<T>(array: T[], comparator: (a: T, b: T) => number) {
  const stabilizedThis = array.map((el, index) => [el, index] as [T, number]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }

    return a[1] - b[1];
  });

  return stabilizedThis.map((el) => el[0]);
}

interface HeadCell {
  disablePadding: boolean;
  id: string;
  label: string;
  numeric: boolean;
}

const headCells: readonly HeadCell[] = [
  {
    id: "photo",
    numeric: false,
    disablePadding: false,
    label: "Фото"
  },
  {
    id: "name",
    numeric: false,
    disablePadding: false,
    label: "Название"
  },

  {
    id: "price",
    numeric: false,
    disablePadding: false,
    label: "Цена"
  },
  {
    id: "isInPool",
    numeric: false,
    disablePadding: false,
    label: "Пул"
  },
  {
    id: "availableAmount",
    numeric: false,
    disablePadding: false,
    label: "На складе"
  },
  {
    id: "step",
    numeric: false,
    disablePadding: false,
    label: "..."
  }
];

interface EnhancedTableProps {
  numSelected: number;
  onRequestSort: (event: React.MouseEvent<unknown>, property: any) => void;
  onSelectAllClick: (event: React.ChangeEvent<HTMLInputElement>) => void;
  order: Order;
  orderBy: string;
  rowCount: number;
}

function EnhancedTableHead(props: EnhancedTableProps) {
  const { onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort } = props;
  const createSortHandler = (property: any) => (event: React.MouseEvent<unknown>) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        <TableCell padding='checkbox'>
          <CustomCheckbox
            color='primary'
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
            inputProps={{
              "aria-label": "select all desserts"
            }}
          />
        </TableCell>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? "right" : "left"}
            padding={headCell.disablePadding ? "none" : "normal"}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : "asc"}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <Box component='span' sx={visuallyHidden}>
                  {order === "desc" ? "sorted descending" : "sorted ascending"}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

interface EnhancedTableToolbarProps {
  numSelected: number;
  handleSearch: React.ChangeEvent<HTMLInputElement> | any;
  search: string;
}

const EnhancedTableToolbar = (props: EnhancedTableToolbarProps) => {
  const { numSelected, handleSearch, search } = props;

  return (
    <Toolbar
      sx={{
        pl: { sm: 2 },
        pr: { xs: 1, sm: 1 },
        ...(numSelected > 0 && {
          bgcolor: (theme) =>
            alpha(theme.palette.primary.main, theme.palette.action.activatedOpacity)
        })
      }}
    >
      {numSelected > 0 ? (
        <Typography sx={{ flex: "1 1 100%" }} color='inherit' variant='subtitle2' component='div'>
          {numSelected} selected
        </Typography>
      ) : (
        <Box sx={{ flex: "1 1 100%", display: "flex", gap: "24px" }}>
          <TextField
            InputProps={{
              startAdornment: (
                <InputAdornment position='start'>
                  <IconSearch size='1.1rem' />
                </InputAdornment>
              )
            }}
            placeholder='Поиск по наименованию или skuId'
            size='small'
            style={{ width: "350px" }}
            onChange={handleSearch}
            value={search}
          />
        </Box>
      )}

      {numSelected > 0 && (
        <Box mr={3}>
          <Tooltip title='Добавить в пул'>
            <Button color='primary' variant='contained' type='submit'>
              <IconPlus />
            </Button>
          </Tooltip>
        </Box>
      )}
    </Toolbar>
  );
};

const ProductTableList = () => {
  const [order, setOrder] = React.useState<Order>("asc");
  const [orderBy, setOrderBy] = React.useState<any>("calories");
  const [selected, setSelected] = React.useState<readonly string[]>([]);
  const [page, setPage] = React.useState(0);
  const [loading, setLoading] = useState(false) as any;
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const params = useParams() as any;

  const dispatch = useDispatch();

  const company = useSelector((state: AppState) => state.companyChanger) as any;
  const auth = getAuth(firebase_app) as any;
  const [openEditConc, setOpenEditConc] = useState(false);
  const [rows, setRows] = React.useState<any>([]);
  const [data, setData] = React.useState<any>([]);
  const [search, setSearch] = React.useState("");

  const handleOpenConcurents = (itemId: string) => {
    setOpenEditConc(true);
    dispatch(setCurrentItem(itemId));
  };

  const addInPull = async (row: any, event: any) => {
    event.stopPropagation();
    await dispatch(
      addItemInPull(auth.currentUser.accessToken, company.activeCompany, params.accountId, {
        shopId: params.shopId,
        shopItemId: row.id
      })
    );
    await getFirstData();
  };

  const removeInPull = async (row: any, event: any) => {
    event.stopPropagation();
    await dispatch(
      deleteItemInPull(auth.currentUser.accessToken, company.activeCompany, params.accountId, {
        shopId: params.shopId,
        shopItemId: row.id
      })
    );
    await getFirstData();
  };

  const getFirstData = async () => {
    const data = await dispatch(
      getItemsShop(
        auth.currentUser.accessToken,
        company.activeCompany,
        params.accountId,
        params.shopId
      )
    );
    setData(data);
    await setLoading(true);
  };

  useEffect(() => {
    getFirstData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    setRows(data);
  }, [data]);

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const filteredRows = data.filter((row: any) => {
      return `${row.skuId}`.includes(event.target.value) || row.name.includes(event.target.value);
    });
    setSearch(event.target.value);
    setRows(filteredRows);
  };

  const handleRequestSort = (event: React.MouseEvent<unknown>, property: any) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      const newSelecteds = rows.map((n: any) => n.id);
      setSelected(newSelecteds);

      return;
    }
    setSelected([]);
  };

  const handleClick = (event: React.MouseEvent<unknown>, name: string) => {
    event.stopPropagation();
    const selectedIndex = selected.indexOf(name);
    let newSelected: readonly string[] = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }

    setSelected(newSelected);
  };

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const isSelected = (name: string) => selected.indexOf(name) !== -1;

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  const theme = useTheme();
  const borderColor = theme.palette.divider;

  return loading ? (
    <Box>
      <Box>
        <EnhancedTableToolbar
          numSelected={selected.length}
          search={search}
          handleSearch={(event: any) => handleSearch(event)}
        />
        <Paper variant='outlined' sx={{ mt: 1, border: `1px solid ${borderColor}` }}>
          <TableContainer>
            <Table sx={{ minWidth: 750 }} aria-labelledby='tableTitle' size={"small"}>
              <EnhancedTableHead
                numSelected={selected.length}
                order={order}
                orderBy={orderBy}
                onSelectAllClick={handleSelectAllClick}
                onRequestSort={handleRequestSort}
                rowCount={rows?.length}
              />
              <TableBody>
                {stableSort(rows, getComparator(order, orderBy))
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row: any, index: number) => {
                    const isItemSelected = isSelected(row.id);
                    const labelId = `enhanced-table-checkbox-${index}`;

                    return (
                      <TableRow
                        hover
                        style={{ cursor: "pointer" }}
                        role='checkbox'
                        aria-checked={isItemSelected}
                        tabIndex={-1}
                        key={row.id}
                        onClick={() => handleOpenConcurents(row.id)}
                        selected={isItemSelected}
                      >
                        <TableCell padding='checkbox'>
                          <CustomCheckbox
                            color='primary'
                            onClick={(event) => handleClick(event, row.id)}
                            checked={isItemSelected}
                            inputProps={{
                              "aria-labelledby": labelId
                            }}
                          />
                        </TableCell>
                        <TableCell>
                          <Box display='flex' alignItems='center'>
                            <Avatar
                              src={`https://image.kazanexpress.ru/${row.photoKey}/t_product_high.jpg`}
                              alt='product'
                              sx={{ width: 56, height: 56 }}
                            />
                          </Box>
                        </TableCell>
                        <TableCell>
                          <Typography>{row.name}</Typography>
                        </TableCell>
                        <TableCell>
                          <Typography>{row.price} рублей</Typography>
                        </TableCell>
                        <TableCell>
                          <Box display='flex' alignItems='center'>
                            <Box
                              sx={{
                                backgroundColor: row.isInPool
                                  ? (theme) => theme.palette.success.main
                                  : (theme) => theme.palette.error.main,
                                borderRadius: "100%",
                                height: "10px",
                                width: "10px"
                              }}
                            />
                            <Typography
                              color='textSecondary'
                              variant='subtitle2'
                              sx={{
                                ml: 1
                              }}
                            >
                              {row.isInPool ? "В пуле" : "Не в пуле"}
                            </Typography>
                          </Box>
                        </TableCell>
                        <TableCell>
                          <Typography>{`${row.availableAmount}`} шт.</Typography>
                        </TableCell>
                        <TableCell>
                          {row.isInPool ? (
                            <Tooltip title='Удалить товар из пула'>
                              <Button
                                onClick={(e: any) => removeInPull(row, e)}
                                color='primary'
                                variant='contained'
                                type='submit'
                              >
                                <IconMinus />
                              </Button>
                            </Tooltip>
                          ) : (
                            <Tooltip title='Добавить в пул'>
                              <Button
                                onClick={(e: any) => addInPull(row, e)}
                                color='primary'
                                variant='contained'
                                type='submit'
                              >
                                <IconPlus />
                              </Button>
                            </Tooltip>
                          )}
                        </TableCell>
                      </TableRow>
                    );
                  })}
                {emptyRows > 0 && (
                  <TableRow
                    style={{
                      height: 33 * emptyRows
                    }}
                  >
                    <TableCell colSpan={6} />
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[10, 20, 30]}
            component='div'
            count={rows.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Paper>
      </Box>
      <ProductTableEditConcurents
        getFirstData={getFirstData}
        setOpen={setOpenEditConc}
        open={openEditConc}
      />
    </Box>
  ) : (
    <Typography ml={1} variant='h6'>
      Идет загрузка товаров
    </Typography>
  );
};

export default ProductTableList;