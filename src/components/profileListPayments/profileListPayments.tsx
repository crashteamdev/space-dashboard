import React, { useEffect } from "react";
import BlankCard from "../ui/shared/BlankCard";
import { useTheme } from "@mui/material/styles";
import { format } from "date-fns";
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
  CardContent,
  Typography,
  Paper
} from "@mui/material";
import { visuallyHidden } from "@mui/utils";
import { getAuth } from "@firebase/auth";
import { getListPayments } from "@/shared/store/slices/userProfile/UserProfileSlice";
import firebase_app from "@/shared/firebase/firebase";
import { useDispatch, useSelector } from "@/shared/store/hooks";
import { AppState } from "@/shared/store/store";
import statusChecker from "@/processes/statusChecker/StatusChecker";

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
    id: "createdAt",
    numeric: false,
    disablePadding: false,
    label: "Дата"
  },
  {
    id: "status",
    numeric: false,
    disablePadding: false,
    label: "Статус"
  },

  {
    id: "amount",
    numeric: false,
    disablePadding: false,
    label: "Сумма"
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

// interface EnhancedTableToolbarProps {
//   numSelected: number;
//   eslint-disable-next-line no-secrets/no-secrets
//   handleSearch: React.ChangeEvent<HTMLInputElement> | any;
//   search: string;
// }

// const EnhancedTableToolbar = (props: EnhancedTableToolbarProps) => {
//   const { numSelected } = props;

//   return (
//     <Toolbar
//       sx={{
//         pl: { sm: 2 },
//         pr: { xs: 1, sm: 1 },
//         ...(numSelected > 0 && {
//           bgcolor: (theme) =>
//             alpha(theme.palette.primary.main, theme.palette.action.activatedOpacity)
//         })
//       }}
//     >
//       {numSelected > 0 ? (
//         <Tooltip title='Delete'>
//           <IconButton>
//             <IconTrash width='18' />
//           </IconButton>
//         </Tooltip>
//       ) : (
//         <Tooltip title='Filter list'>
//           <IconButton>
//             <IconFilter size='1.2rem' />
//           </IconButton>
//         </Tooltip>
//       )}
//     </Toolbar>
//   );
// };

const ProductTableList = () => {
  const [order, setOrder] = React.useState<Order>("asc");
  const [orderBy, setOrderBy] = React.useState<any>("calories");
  const [selected, setSelected] = React.useState<readonly string[]>([]);
  const [getProducts] = React.useState<any>([]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const auth = getAuth(firebase_app) as any;

  const company = useSelector((state: AppState) => state.companyChanger) as any;
  const userPost = useSelector((state: AppState) => state.userpostsReducer) as any;
  const dispatch = useDispatch();

  const [rows, setRows] = React.useState<any>(userPost.paymentList);

  React.useEffect(() => {
    setRows(getProducts);
  }, [getProducts]);

  useEffect(() => {
    if (auth.currentUser) {
      const today = new Date() as any;
      const year = today.getFullYear();
      const month = String(today.getMonth() + 1).padStart(2, "0");
      const day = String(today.getDate()).padStart(2, "0");

      const toDate = `${year}-${month}-${day}`;
      const formattedDate = `${String(today.getFullYear() - 2)}-${month}-${day}`;
      dispatch(
        getListPayments(formattedDate, toDate)
      );
      setRows(userPost.paymentList);
    }
    // setProducts(userPost.paymentList);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userPost, company]);

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

  return rows.length ? (
    <Box>
      <Box>
        <Paper variant='outlined' sx={{ mx: 0, mt: 1, border: `1px solid ${borderColor}` }}>
          <TableContainer>
            <Table sx={{ minWidth: 200 }} aria-labelledby='tableTitle' size={"small"}>
              <EnhancedTableHead
                numSelected={selected.length}
                order={order}
                orderBy={orderBy}
                onSelectAllClick={handleSelectAllClick}
                onRequestSort={handleRequestSort}
                rowCount={rows.length}
              />
              <TableBody>
                {stableSort(rows, getComparator(order, orderBy))
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row: any) => {
                    const isItemSelected = isSelected(row.title);
                    return (
                      <TableRow hover tabIndex={-1} key={row.title} selected={isItemSelected}>
                        <TableCell>
                          <Typography>
                            {format(new Date(row.createdAt), "E, MMM d yyyy")}
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <Typography>{statusChecker(row.status)}</Typography>
                        </TableCell>
                        <TableCell>
                          <Typography fontWeight={600} variant='h6'>
                            ${row.amount}
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
            rowsPerPageOptions={[5, 10, 25]}
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
  ) : (
    "Вы еще не совершили ни одного платежа"
  );
};

const ProfileListPayments = () => {
  return (
    <BlankCard>
      <CardContent>
        <Typography variant='h5' mb={1}>
          Cписок платежей
        </Typography>
        <ProductTableList />
      </CardContent>
    </BlankCard>
  );
};

export default ProfileListPayments;
