import React from "react";
import { styled } from "@mui/material/styles";
import { TextField } from "@mui/material";

const CustomTextField = styled((props: any) => <TextField {...props} />)(({ theme }) => ({
  ".MuiOutlinedInput-input": {
    color: "#fff"
  },
  "& .MuiOutlinedInput-input::-webkit-input-placeholder": {
    color: "#fff",
    opacity: "1"
  },
  "& .MuiOutlinedInput-input.Mui-disabled::-webkit-input-placeholder": {
    color: "#fff",
    opacity: "1"
  },
  "& .Mui-disabled .MuiOutlinedInput-notchedOutline": {
    borderColor: theme.palette.grey[200]
  }
}));

export default CustomTextField;
