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
import { usePathname, useRouter } from "next/navigation";
import { setUser } from "@/shared/store/slices/user/userSlice";
import { IUser } from "@/shared/types/apps/user";
import RTL from "../components/customizer/RTL";
import { logout } from "../api/auth/logout/logout";
import { setDarkMode, setLanguage } from "@/shared/store/slices/customizer/CustomizerSlice";
import { lang } from "@/shared/i18n/i18n";
import { useAuthState } from "react-firebase-hooks/auth";
import { getBalance } from "@/shared/store/slices/balance/BalanceSlice";
import AlertList from "@/components/alertList/alertList";
import "@/shared/styles/globals.css";

export const MyApp = ({ children }: { children: React.ReactNode }) => {
  const [loadingPage, setLoadingPage] = React.useState(false);
  const theme = ThemeSettings();

  const customizer = useSelector((state: AppState) => state.customizer);
  const dispatch = useDispatch();
  const router = useRouter();
  const pathname = usePathname();
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
      dispatch(setDarkMode("light"));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router]);

  useEffect(() => {
    // Если пользователь не загрузился или не авторизован, перенаправьте на страницу входа.
    if (!loading && !user) {
      // router.push("/auth/login");
      setLoadingPage(true);
    }
    if (user) {
      console.log(user);
      const { uid, accessToken, displayName, email, photoURL } = user as any;
      dispatch(getBalance());
      const userdata = {
        uid,
        accessToken,
        displayName,
        email,
        photoURL
      } as IUser;
      dispatch(setUser(userdata));
      setLoadingPage(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loading, pathname]);

  useEffect(() => {
    if (!sessionStorage.getItem("remember") && localStorage.getItem("remember") === "off") {
      logout();
    }
  }, []);

  return (
    <>
      <NextTopLoader color='#5D87FF' showSpinner={false} />
      <NextAppDirEmotionCacheProvider options={{ key: "modernize" }}>
        <ThemeProvider theme={theme}>
          <RTL direction={customizer.activeDir}>
            <AlertList>
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
                    height: "100vh"
                  }}
                >
                  <CircularProgress />
                </Box>
              )}
            </AlertList>
          </RTL>
        </ThemeProvider>
      </NextAppDirEmotionCacheProvider>
    </>
  );
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang='ru' suppressHydrationWarning>
      <head>
        <link rel="apple-touch-icon" sizes="114x114" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="manifest" href="/site.webmanifest" />
        <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#5bbad5" />
        <meta name="msapplication-TileColor" content="#da532c" />
        <meta name="theme-color" content="#ffffff" />
      </head>
      <body>
        <Provider store={store}>
          {
            // eslint-disable-next-line react/no-children-prop
            <MyApp children={children} />
          }
        </Provider>
        {/* TODO: Вынести отдельно */}
        <script
            dangerouslySetInnerHTML={{
              __html: `
              (function(m,e,t,r,i,k,a){m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
              m[i].l=1*new Date();
              for (var j = 0; j < document.scripts.length; j++) {if (document.scripts[j].src === r) { return; }}
              k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)})
              (window, document, "script", "https://mc.yandex.ru/metrika/tag.js", "ym");
           
              ym(95988851, "init", {
                   clickmap:true,
                   trackLinks:true,
                   accurateTrackBounce:true,
                   webvisor:true
              });
              `,
            }}
          />
        <noscript>
          <div>
            <img src="https://mc.yandex.ru/watch/95988851" style={{ position:'absolute', left:'-9999px' }} alt="" />
          </div>
        </noscript>
      </body>
    </html>
  );
}
