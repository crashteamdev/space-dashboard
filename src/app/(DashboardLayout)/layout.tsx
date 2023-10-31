"use client";
import { styled, Container, Box, useTheme } from "@mui/material";
import React from "react";
import Header from "./layout/vertical/header/Header";
import { useSelector } from "@/store/hooks";
import { AppState } from "@/store/store";
import Sidebar from "./layout/vertical/sidebar/Sidebar";

const MainWrapper = styled("div")(() => ({
  display: "flex",
  minHeight: "100vh",
  width: "100%",
})) as any;

const PageWrapper = styled("div")(() => ({
  display: "flex",
  flexGrow: 1,
  paddingBottom: "60px",
  flexDirection: "column",
  zIndex: 1,
  backgroundColor: "transparent",
})) as any;

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const customizer = useSelector((state: AppState) => state.customizer);
  const theme = useTheme();

  return (
    <MainWrapper>
      {customizer.isHorizontal ? "" : <Sidebar />}
      <PageWrapper
        className="page-wrapper"
        sx={{
          ...(customizer.isCollapse && {
            [theme.breakpoints.up("lg")]: {
              ml: `${customizer.MiniSidebarWidth}px`,
            },
          }),
        }}
      >
        <Header />
        <Container
          sx={{
            maxWidth: customizer.isLayout === "boxed" ? "lg" : "100%!important",
          }}
        >
          <Box sx={{ minHeight: "calc(100vh - 170px)" }}>
            {children}
          </Box>
        </Container>
      </PageWrapper>
    </MainWrapper>
  );
}
