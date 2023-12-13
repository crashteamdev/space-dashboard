"use client";
import { styled, Container, Box, useTheme } from "@mui/material";
import React, { useEffect } from "react";
import Header from "../../../components/ui/header/Header";
import { useSelector } from "@/shared/store/hooks";
import { AppState } from "@/shared/store/store";
import Sidebar from "../../../components/ui/sideBar/Sidebar";
import { getAuth, onIdTokenChanged } from "firebase/auth";
import firebase_app from "@/shared/firebase/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { useRouter } from "next/navigation";

const MainWrapper = styled("div")(() => ({
  display: "flex",
  minHeight: "100vh",
  width: "100%"
})) as any;

const PageWrapper = styled("div")(() => ({
  display: "flex",
  flexGrow: 1,
  paddingBottom: "60px",
  flexDirection: "column",
  zIndex: 1,
  backgroundColor: "transparent"
})) as any;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const customizer = useSelector((state: AppState) => state.customizer);
  const theme = useTheme();
  const router = useRouter();
  const auth = getAuth(firebase_app);
  const [user, loading] = useAuthState(auth);

  useEffect(() => {
    // Если пользователь не загрузился или не авторизован, перенаправьте на страницу входа.
    if (!loading && !user) {
      router.push("/auth/login");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loading, router]);

  useEffect(() => {
    const listener = onIdTokenChanged(auth, async (user) => {
      console.log(user);
    });

    return () => {
      listener();
    };
  }, [auth]);

  return (
    <MainWrapper>
      {customizer.isHorizontal ? "" : <Sidebar />}
      <PageWrapper
        className='page-wrapper'
        sx={{
          ...(customizer.isCollapse && {
            [theme.breakpoints.up("lg")]: {
              ml: `${customizer.MiniSidebarWidth}px`
            }
          })
        }}
      >
        {customizer.isHeader && <Header /> }
        <Container
          sx={{
            maxWidth: customizer.isLayout === "boxed" ? "lg" : "100%!important"
          }}
        >
          <Box sx={{ minHeight: "calc(100vh - 170px)" }}>{children}</Box>
        </Container>
      </PageWrapper>
    </MainWrapper>
  );
}
