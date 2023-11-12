"use client";

import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
} from "@mui/material";

interface TypesPopup {
  children: React.ReactElement ; // ReactNode позволяет передавать любые React-элементы в качестве дочерних элементов
  open: any;
  setOpen: any;
  title: string;
  description: string;
}

const Popup = ({children, open, setOpen, title, description}: TypesPopup) => {

  const handleClose = () => {
    setOpen(0);
  };

  return (
    <>
      <Dialog open={!!open} onClose={handleClose}>
        <DialogTitle mt={2}>{title}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            {description}
          </DialogContentText>
        </DialogContent>
        {children}
      </Dialog>
    </>
  );
};

export default Popup;
