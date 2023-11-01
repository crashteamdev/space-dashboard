"use client";
import React, { useEffect } from "react";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { ThemeSettings } from "@/utils/theme/Theme";
import { store } from "@/store/store";
import { useDispatch, useSelector } from "@/store/hooks";
import { AppState } from "@/store/store";
import { Provider } from "react-redux";
import NextTopLoader from "nextjs-toploader";
import firebase_app from "../firebase/firebase";
import { getAuth } from "firebase/auth";

import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import "@/utils/i18n";
import { NextAppDirEmotionCacheProvider } from "@/utils/theme/EmotionCache";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useRouter } from "next/navigation";
import { setUser } from "@/store/user/userSlice";
import { IUser } from "@/app/(DashboardLayout)/types/apps/user";
import RTL from "./(DashboardLayout)/layout/shared/customizer/RTL";
import { logout } from "./api/auth/logout/logout";

export const MyApp = ({ children }: { children: React.ReactNode }) => {
  const [loading, setLoading] = React.useState(false);
  const theme = ThemeSettings();

  const customizer = useSelector((state: AppState) => state.customizer);
  const dispatch = useDispatch();
  const router = useRouter();
  const auth = getAuth(firebase_app);

  React.useEffect(() => {
    // Проверка статуса аутентификации при загрузке страницы
    const unsubscribe = auth.onAuthStateChanged((user: any) => {
      if (user) {
        // Пользователь не авторизован, перенаправляем
        const { uid, accessToken, displayName, email, photoURL } = user as any;
        const userdata = {
          uid,
          accessToken,
          displayName,
          email,
          photoURL,
        } as IUser;

        dispatch(setUser(userdata));
        setLoading(true);
        console.log(userdata.accessToken);
      } else {
        router.push("/auth/login");
        setLoading(true);
      }
    });

    return () => unsubscribe();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router]);

  useEffect(() => {
    window.addEventListener('beforeunload', function (e) {
      // Выход пользователя при закрытии браузера
      if(localStorage.getItem('remember') === 'off') {
        logout()
        localStorage.setItem('remember', 'off')
      }
    });
  }, [])

  return (
    <>
      <NextTopLoader color="#5D87FF" />
      <NextAppDirEmotionCacheProvider options={{ key: "modernize" }}>
        <ThemeProvider theme={theme}>
          <RTL direction={customizer.activeDir}>
            {loading ? (
              <>
                <CssBaseline />
                {children}
              </>
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
  return (
    <html lang="ru" suppressHydrationWarning>
      <body>
        <Provider store={store}>
          {
            // eslint-disable-next-line react/no-children-prop
            <MyApp children={children} />
          }
        </Provider>
      </body>
    </html>
  );
}
