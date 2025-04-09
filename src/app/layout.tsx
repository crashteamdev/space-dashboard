"use client";
import React, { useEffect } from "react";
import { Provider } from "react-redux";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { ThemeSettings } from "../shared/theme/Theme";
import { store } from "@/shared/store/store";
import { useDispatch as useReduxDispatch } from 'react-redux';
import NextTopLoader from "nextjs-toploader";
import firebase_app from "../shared/firebase/firebase";
import { getAuth } from "firebase/auth";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import "@/shared/i18n/i18n";
import { NextAppDirEmotionCacheProvider } from "@/shared/theme/EmotionCache";
import { usePathname, useRouter } from "next/navigation";
import { setUser } from "@/shared/store/slices/user/userSlice";
import { logout } from "../api/auth/logout/logout";
import { setDarkMode, setLanguage } from "@/shared/store/slices/customizer/CustomizerSlice";
import { lang } from "@/shared/i18n/i18n";
import { useAuthState } from "react-firebase-hooks/auth";
import { getBalance } from "@/shared/store/slices/balance/BalanceSlice";
import AlertList from "@/components/alertList/alertList";
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query';

import "@/shared/styles/globals.css";
import {Providers} from "@/app/providers/providers";
import {usePostHog} from "posthog-js/react";

const queryClient = new QueryClient()
export const MyApp = ({ children }: { children: React.ReactNode }) => {
  
  const [loadingPage, setLoadingPage] = React.useState(false);
  const theme = ThemeSettings();

  const dispatch = useReduxDispatch();
  const router = useRouter();
  const pathname = usePathname();
  const auth = getAuth(firebase_app);
  const [user, loading] = useAuthState(auth);
  const posthog = usePostHog();

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
      const { uid, accessToken, displayName, email, photoURL } = user as any;
      dispatch(getBalance());
      const userdata = {
        uid,
        accessToken,
        displayName,
        email,
        photoURL
      } as any;
      dispatch(setUser(userdata));
      setLoadingPage(true);
      posthog.identify(uid);
      posthog.capture('User Logged In', {
        userId: uid,
        email: email,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loading, pathname]);

  useEffect(() => {
    if (!sessionStorage.getItem("remember") && localStorage.getItem("remember") === "off") {
      logout();
    }
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <Providers>
        <NextTopLoader color='#5D87FF' showSpinner={false} />
        <NextAppDirEmotionCacheProvider options={{ key: "mdb" }}>
          <ThemeProvider theme={theme}>
            {/* Верно ли так хранить notifications? В <AlertList> и оборачивать еще в придачу весь контент */}
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
                      height: "100vh",
                      background: "linear-gradient(45deg, rgb(6, 28, 61), rgb(13, 13, 13))"
                    }}
                  >
                    <CircularProgress />
                  </Box>
                )}
              </AlertList>
          </ThemeProvider>
        </NextAppDirEmotionCacheProvider>
      </Providers>
      {/* <ReactQueryDevtools initialIsOpen={false}  /> */}
    </QueryClientProvider>
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
            <MyApp children={children} />
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
