"use client";
import React, { useEffect } from "react";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { ThemeSettings } from "../shared/theme/Theme";
import { store } from "@/shared/store/store";
import { useDispatch, useSelector } from "@/shared/store/hooks";
import { AppState } from "@/shared/store/store";
import { Provider } from "react-redux";
import NextTopLoader from "nextjs-toploader";
import firebase_app from "../shared/firebase/firebase";
import { getAuth } from "firebase/auth";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import "@/shared/i18n/i18n";
import { NextAppDirEmotionCacheProvider } from "@/shared/theme/EmotionCache";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useRouter } from "next/navigation";
import { setUser } from "@/shared/store/slices/user/userSlice";
import { IUser } from "@/shared/types/apps/user";
import RTL from "../components/customizer/RTL";
import { logout } from "../api/auth/logout/logout";
import {
  setDarkMode,
  setLanguage,
} from "@/shared/store/slices/customizer/CustomizerSlice";
import { lang } from "@/shared/i18n/i18n";
import { useAuthState } from "react-firebase-hooks/auth";
import { getBalance } from "@/shared/store/slices/balance/BalanceSlice";

export const MyApp = ({ children }: { children: React.ReactNode }) => {
  const [loadingPage, setLoadingPage] = React.useState(false);
  const theme = ThemeSettings();
  
  const customizer = useSelector((state: AppState) => state.customizer);
  const dispatch = useDispatch();
  const router = useRouter();
  const auth = getAuth(firebase_app);
  const [user, loading] = useAuthState(auth);
  useEffect(() => {
    const curLang = localStorage.getItem("lng") as string;
    if (curLang) {
      dispatch(setLanguage(curLang));
    } else if (lang.includes(curLang)) {
      localStorage.setItem("lng", navigator.language.substring(0, 2));
    } else {
      localStorage.setItem("lng", "ru");
    }
    if (localStorage.getItem("theme")) {
      dispatch(setDarkMode(localStorage.getItem("theme")));
    } else {
      dispatch(setDarkMode('light'));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router]);

  useEffect(() => {
    // Если пользователь не загрузился или не авторизован, перенаправьте на страницу входа.
    if (!loading && !user) {
      router.push("/auth/login");
      setLoadingPage(true);
    }
    if (user) {
      const { uid, accessToken, displayName, email, photoURL } = user as any;
      dispatch(getBalance(accessToken))
      const userdata = {
        uid,
        accessToken,
        displayName,
        email,
        photoURL,
      } as IUser;
      dispatch(setUser(userdata));
      setLoadingPage(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loading, router]);

  useEffect(() => {
    window.addEventListener("beforeunload", function (e) {
      // Выход пользователя при закрытии браузера
      if (localStorage.getItem("remember") === "off") {
        logout();
        localStorage.setItem("remember", "off");
      }
    });
  }, []);

  return (
    <>
      <NextTopLoader color="#5D87FF" />
      <NextAppDirEmotionCacheProvider options={{ key: "modernize" }}>
        <ThemeProvider theme={theme}>
          <RTL direction={customizer.activeDir}>
            {loadingPage ? (
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
