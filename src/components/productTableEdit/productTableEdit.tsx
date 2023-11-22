import React, { useState } from "react";
import {
  IconButton,
  Menu,
  MenuItem,
  ListItemIcon,
} from "@mui/material";
import Link from "next/link";
import { IconDots, IconEdit, IconRefresh, IconTrash } from "@tabler/icons-react";
import { useRouter } from "next/navigation";
import ProductTableEditItem from "../productTableEditItem/productTableEditItem";
import ProductTableEditConcurents from "../productTableEditConcurents/productTableEditConcurents";

const ProductTableEdit = () => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const router = useRouter();
  const [openEdit, setOpenEdit] = useState(false);
  const [openEditConc, setOpenEditConc] = useState(false);
  const handleClickOpen = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleOpenSettings = () => {
    setOpenEdit(true)
    setAnchorEl(null)
  };

  const handleOpenConcurents = () => {
    setOpenEditConc(true)
    setAnchorEl(null)
  };

  return (
    <>
      <IconButton
        id="basic-button"
        aria-controls={open ? "basic-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClickOpen}
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
        <MenuItem onClick={handleOpenSettings}>
          <ListItemIcon>
            <IconEdit width={18} />
          </ListItemIcon>
          Изменить
        </MenuItem>
        <MenuItem onClick={handleOpenConcurents}>
          <ListItemIcon>
            <IconRefresh width={18} />
          </ListItemIcon>
          Добавить конкурентов
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <ListItemIcon>
            <IconTrash width={18} />
          </ListItemIcon>
          Добавить в пул
        </MenuItem>
      </Menu>
      <ProductTableEditItem setOpen={setOpenEdit} open={openEdit} />
    </>
  );
};

export default ProductTableEdit;
