"use client";
import React from "react";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";

export default function Loading() {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        height: "100vh",
        background: "linear-gradient(45deg, rgb(6, 28, 61), rgb(13, 13, 13))"
      }}
    >
      <CircularProgress />
    </Box>
  );
}
