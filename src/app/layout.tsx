"use client";
import React, { useEffect } from "react";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import RTL from "@/app/(DashboardLayout)/layout/shared/customizer/RTL";
import { ThemeSettings } from "@/utils/theme/Theme";
import { store } from "@/store/store";
import { useDispatch, useSelector } from "@/store/hooks";
import { AppState } from "@/store/store";
import { Provider } from "react-redux";
import NextTopLoader from 'nextjs-toploader';
import firebase_app from "../firebase/firebase"
import { getAuth } from "firebase/auth";

// import NextNProgress from "nextjs-progressbar";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import "@/app/api/index";
import "@/utils/i18n";
import { NextAppDirEmotionCacheProvider } from "@/utils/theme/EmotionCache";
import "react-quill/dist/quill.snow.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useRouter } from 'next/navigation';
import { setUser } from "@/store/user/userSlice";
import { IUser } from "@/types/user";

export const MyApp = ({ children }: { children: React.ReactNode }) => {
  const theme = ThemeSettings();

  const auth = getAuth(firebase_app);
  const customizer = useSelector((state: AppState) => state.customizer);
  const dispatch = useDispatch();

  useEffect(() => {
    // Добавление пользователя в стейт
    console.log(auth.currentUser)
    if (auth.currentUser) {
      const { uid, accessToken, displayName, email, photoURL } = auth.currentUser as any;
      const user = { uid, accessToken, displayName, email, photoURL } as IUser;
  
      dispatch(setUser(user));
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [auth.currentUser]);

  return (
    <>
      <NextTopLoader color="#5D87FF" />
      <NextAppDirEmotionCacheProvider options={{ key: 'modernize' }}>
      <ThemeProvider theme={theme}>
        <RTL direction={customizer.activeDir}>
          {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
          <CssBaseline />
          {children}
        </RTL>
      </ThemeProvider>
      </NextAppDirEmotionCacheProvider>
    </>
  );
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [loading, setLoading] = React.useState(false);
  const router = useRouter();
  const auth = getAuth(firebase_app);

  const checkAuth = async () => {
    await auth.onAuthStateChanged((user : any) => {
      console.log(user)
      if (!user.email) {
        console.log("User not found")
        // Пользователь не авторизован, перенаправляем
        router.push('/auth/auth2/login');
      }
    });
    setTimeout(() => setLoading(true), 400);
  }

  React.useEffect(() => {
    // Проверка статуса аутентификации при загрузке страницы
    checkAuth()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <Provider store={store}>
          {loading ? (
            // eslint-disable-next-line react/no-children-prop
            <MyApp children={children} />
          ) : (
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                width: "100%",
                height: "100vh",
              }}
            >
              <CircularProgress />
            </Box>
          )}
        </Provider>
      </body>
    </html>
  );
}
