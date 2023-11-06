import React from "react";
import {
  TableContainer,
  Table,
  TableRow,
  TableCell,
  TableBody,
  Avatar,
  Typography,
  TableHead,
  Chip,
  Box,
  Menu,
  MenuItem,
  IconButton,
  ListItemIcon,
} from "@mui/material";
import BlankCard from "../ui/shared/BlankCard";
import { basicsTableData, TableType } from "./tableData";
import { Stack } from "@mui/system";
import {
  IconDots,
  IconEdit,
  IconTrash,
  IconRefresh,
} from "@tabler/icons-react";

const basics: TableType[] = basicsTableData;

const Table5 = () => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <BlankCard>
      <TableContainer>
        <Table
          aria-label="simple table"
          sx={{
            whiteSpace: "nowrap",
          }}
        >
          <TableHead>
            <TableRow>
              <TableCell>
                <Typography variant="h6">Аккаунт</Typography>
              </TableCell>
              <TableCell>
                <Typography variant="h6">Мониторинг</Typography>
              </TableCell>
              <TableCell>
                <Typography variant="h6">Последнее обновление</Typography>
              </TableCell>
              <TableCell>
                <Typography variant="h6"></Typography>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {basics.map((basic) => (
              <TableRow key={basic.id}>
                <TableCell>
                  <Stack direction="row" spacing={2}>
                    <Avatar
                      src={basic.imgsrc}
                      alt={basic.imgsrc}
                      sx={{ width: 40, height: 40 }}
                    />
                    <Box>
                      <Typography variant="h6" fontWeight="600">
                        {basic.name}
                      </Typography>
                      <Typography color="textSecondary" variant="subtitle2">
                        {basic.post}
                      </Typography>
                    </Box>
                  </Stack>
                </TableCell>
                <TableCell>
                  {/* <Chip chipcolor={basic.status == 'Active' ? 'success' : basic.status == 'Pending' ? 'warning' : basic.status == 'Completed' ? 'primary' : basic.status == 'Cancel' ? 'error' : 'secondary'} */}
                  <Chip
                    sx={{
                      bgcolor:
                        basic.status === "Active"
                          ? (theme) => theme.palette.success.light
                          : basic.status === "Unactive"
                          ? (theme) => theme.palette.error.light
                          : (theme) => theme.palette.secondary.light,
                      color:
                        basic.status === "Active"
                          ? (theme) => theme.palette.success.main
                          : basic.status === "Unactive"
                          ? (theme) => theme.palette.error.main
                          : (theme) => theme.palette.secondary.main,
                      borderRadius: "8px",
                    }}
                    size="small"
                    label={basic.status}
                  />
                </TableCell>
                <TableCell>
                  <Typography
                    color="textSecondary"
                    variant="h6"
                    fontWeight={400}
                  >
                    {basic.pname}
                  </Typography>
                </TableCell>
                <TableCell>
                  <IconButton
                    id="basic-button"
                    aria-controls={open ? "basic-menu" : undefined}
                    aria-haspopup="true"
                    aria-expanded={open ? "true" : undefined}
                    onClick={handleClick}
                  >
                    <IconDots width={18} />
                  </IconButton>
                  <Menu
                    id="basic-menu"
                    anchorEl={anchorEl}
                    open={open}
                    onClose={handleClose}
                    MenuListProps={{
                      "aria-labelledby": "basic-button",
                    }}
                  >
                    <MenuItem onClick={handleClose}>
                      <ListItemIcon>
                        <IconEdit width={18} />
                      </ListItemIcon>
                      Настройки
                    </MenuItem>
                    <MenuItem onClick={handleClose}>
                      <ListItemIcon>
                        <IconRefresh width={18} />
                      </ListItemIcon>
                      Обновить
                    </MenuItem>
                    <MenuItem onClick={handleClose}>
                      <ListItemIcon>
                        <IconTrash width={18} />
                      </ListItemIcon>
                      Удалить
                    </MenuItem>
                  </Menu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </BlankCard>
  );
};

export default Table5;
