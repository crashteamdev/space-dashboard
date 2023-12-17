import React, { useEffect } from "react";
import { useTheme } from "@mui/material/styles";
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
  Typography,
  Avatar,
  Paper
} from "@mui/material";
import { visuallyHidden } from "@mui/utils";
import { useDispatch, useSelector } from "@/shared/store/hooks";
import { setCurrentItem } from "@/shared/store/slices/reprice/repriceSlice";
import { getAuth } from "firebase/auth";
import firebase_app from "@/shared/firebase/firebase";
import { useParams } from "next/navigation";
import { AppState } from "@/shared/store/store";
import { getHistory } from "@/shared/store/slices/account/AccountSlice";

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
    id: "name",
    numeric: false,
    disablePadding: false,
    label: "Название"
  },
  {
    id: "pname",
    numeric: false,
    disablePadding: false,
    label: "Название магазина"
  },

  {
    id: "skuId",
    numeric: false,
    disablePadding: false,
    label: "skuId"
  },
  {
    id: "productId",
    numeric: false,
    disablePadding: false,
    label: "productId"
  },
  {
    id: "new",
    numeric: false,
    disablePadding: false,
    label: "Старая цена"
  },
  {
    id: "old",
    numeric: false,
    disablePadding: false,
    label: "Новая цена"
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
  const { order, orderBy, onRequestSort } = props;
  const createSortHandler = (property: any) => (event: React.MouseEvent<unknown>) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
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

const HistoryTable = () => {
  const [order, setOrder] = React.useState<Order>("asc");
  const [orderBy, setOrderBy] = React.useState<any>("calories");
  const [selected, setSelected] = React.useState<readonly string[]>([]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const params = useParams() as any;

  const dispatch = useDispatch();

  const company = useSelector((state: AppState) => state.companyChanger) as any;
  const auth = getAuth(firebase_app) as any;
  const [rows, setRows] = React.useState<any>([]);

  const handleOpenConcurents = (itemId: string) => {
    dispatch(setCurrentItem(itemId));
  };

  const getFirstData = async () => {
    const data = await dispatch(
      getHistory(auth.currentUser.accessToken, company.activeCompany, params.accountId)
    );
    console.log(data);
    setRows(data);
  };

  useEffect(() => {
    getFirstData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // This is for the sorting
  const handleRequestSort = (event: React.MouseEvent<unknown>, property: any) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  // This is for select all the row
  const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      const newSelecteds = rows.map((n: any) => n.title);
      setSelected(newSelecteds);

      return;
    }
    setSelected([]);
  };

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const isSelected = (name: string) => selected.indexOf(name) !== -1;

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  const theme = useTheme();
  const borderColor = theme.palette.divider;

  return (
    <Box>
      <Box>
        <Paper variant='outlined' sx={{ mx: 2, mt: 1, border: `1px solid ${borderColor}` }}>
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
                  .map((row: any) => {
                    const isItemSelected = isSelected(row.title);

                    return (
                      <TableRow
                        hover
                        style={{ cursor: "pointer" }}
                        role='checkbox'
                        aria-checked={isItemSelected}
                        tabIndex={-1}
                        key={row.title}
                        onClick={() => handleOpenConcurents(row.id)}
                        selected={isItemSelected}
                      >
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
                          <Typography>{`${row.isInPool}`}</Typography>
                        </TableCell>
                        <TableCell>
                          <Box display='flex' alignItems='center'>
                            <Box
                              sx={{
                                backgroundColor: row.stock
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
                              {row.stock ? "InStock" : "Out of Stock"}
                            </Typography>
                          </Box>
                        </TableCell>

                        <TableCell>
                          <Typography fontWeight={600} variant='h6'>
                            {row.availableAmount} шт.
                          </Typography>
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
    </Box>
  );
};

export default HistoryTable;
