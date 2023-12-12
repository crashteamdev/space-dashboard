import { CardContent, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Box, Button, Grid } from "@mui/material";
import BlankCard from "../ui/shared/BlankCard";
import ParentCard from "../ui/shared/ParentCard";
import { useDispatch, useSelector } from "@/shared/store/hooks";
import {
  fetchToken,
  fetchRefreshToken,
  fetchGenerateToken,
} from "@/shared/store/slices/userProfile/UserProfileSlice";
import firebase_app from "@/shared/firebase/firebase";
import { AppState } from "@/shared/store/store";
import { getAuth } from "firebase/auth";
import { useTranslation } from "react-i18next";
import CustomLink from "../ui/link/Link";
import { v4 as uuidv4 } from "uuid";
import { addItem } from "@/shared/store/slices/alerts/AlertsSlice";

const TokenContainer = () => {
  const auth = getAuth(firebase_app) as any;
  const [copy, setCopy] = useState(false);

  const styles = {
    paper: {
      border: "2px solid 'blue'",
      cursor: "pointer",
      overflow: "hidden",
      transition: "border-color 0.3s, background-color 0.3s",
    },
  };

  const { t } = useTranslation();

  const token = useSelector((state: AppState) => state.userpostsReducer) as any;
  const company = useSelector((state: AppState) => state.companyChanger) as any;
  const dispatch = useDispatch();

  const refreshToken = () => {
    if (auth.currentUser) {
      dispatch(addItem({title: "Сгенерирован новый токен", status: "success", timelife: 4000, id: uuidv4()}));
      dispatch(
        fetchRefreshToken(auth.currentUser.accessToken, company.activeCompany)
      );
    }
  };
  const generateToken = () => {
    if (auth.currentUser) {
      dispatch(
        fetchGenerateToken(auth.currentUser.accessToken, company.activeCompany)
      );
    }
  };

  const copyToken = () => {
    setCopy(true);
    dispatch(addItem({title: "Токен скопирован", status: "success", timelife: 4000 }));
    const textArea = document.createElement("textarea");
    textArea.value = token?.token?.apiKey;

    document.body.appendChild(textArea);

    textArea.select();
    document.execCommand("copy");
    document.body.removeChild(textArea);
    setTimeout(() => setCopy(false), 1800);
  };

  useEffect(() => {
    if (auth.currentUser) {
      dispatch(fetchToken(auth.currentUser.accessToken, company.activeCompany));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [company]);
  
  return (
    <ParentCard title={t("extension.informationTitle")}>
      <>
        <form>
          <Grid container spacing={3}>
            <Grid item lg={8} md={12} sm={12}>
              <Grid item xs={12} lg={12}>
                <BlankCard>
                  <CardContent>
                    <Typography variant="h5" mb={2}>
                      {t("Token.title")}
                    </Typography>
                    <Typography color="textSecondary" mb={3}>
                      {t("Token.description")}
                    </Typography>
                    {token.token?.apiKey ? (
                      <>
                        <Typography variant="h6" mb={1}>
                          {t("Token.upInput")}
                        </Typography>
                        <Box
                          bgcolor={"info.light"}
                          style={styles.paper}
                          onClick={copyToken}
                          p={2}
                        >
                          {token?.token?.apiKey}
                        </Box>
                        <Box pt={2}>
                          <Button
                            onClick={refreshToken}
                            variant="contained"
                            color="primary"
                          >
                            {t("Token.buttonGenerate")}
                          </Button>
                        </Box>
                      </>
                    ) : (
                      <Button
                        onClick={generateToken}
                        variant="contained"
                        
                      >
                        {t("Token.buttonGenerate")}
                      </Button>
                    )}
                  </CardContent>
                </BlankCard>
              </Grid>
            </Grid>
            <Grid item xs={12} lg={4}>
              <BlankCard>
                <CardContent>
                  <Typography variant="h5" mb={2}>
                    <b>{t("MoreInfo.title")}</b>
                  </Typography>
                  <Typography color="h6">
                    {t("MoreInfo.description")}
                  </Typography>
                  <Box mb={3} mt={1}>
                    <Button
                      variant="contained"
                      target="_blank"
                      href={
                        company.activeCompany === "ke"
                          // eslint-disable-next-line no-secrets/no-secrets
                          ? "https://chrome.google.com/webstore/detail/marketdb-%D0%B0%D0%BD%D0%B0%D0%BB%D0%B8%D1%82%D0%B8%D0%BA%D0%B0-kazane/cfkfachbapidmnjkcandfhlbnfiialei?hl=ru"
                          // eslint-disable-next-line no-secrets/no-secrets
                          : "https://chrome.google.com/webstore/detail/marketdb-%D0%B0%D0%BD%D0%B0%D0%BB%D0%B8%D1%82%D0%B8%D0%BA%D0%B0-uzumuz/blgbandfopjlfnfpgknfmdkboekolpcc?hl=ru"
                      }
                      color="primary"
                    >
                      {t("MoreInfo.descButton")}
                    </Button>
                  </Box>
                  <Typography variant="h6" color="h4" mb={2}>
                    <b>{t("MoreInfo.title1")}</b>
                  </Typography>
                  <Typography variant="body1" mb={1}>
                    <CustomLink
                      isExternal={false}
                      href="https://t.me/marketdbru"
                    >
                      {t("MoreInfo.desc1")}
                    </CustomLink>
                  </Typography>
                  <Typography variant="body1" mb={2}>
                    <CustomLink
                      isExternal={false}
                      href="https://t.me/marketdbchat"
                    >
                      {t("MoreInfo.desc2")}
                    </CustomLink>
                  </Typography>
                  <Typography variant="h6" color="h4" mb={2}>
                    <b>{t("MoreInfo.title2")}</b>
                  </Typography>
                  <Typography color="h6" mb={1}>
                    <CustomLink
                      isExternal={false}
                      href="https://wiki.marketdb.ru/ru/base/getting-started"
                    >
                      {t("MoreInfo.desc3")}
                    </CustomLink>
                  </Typography>
                  <Typography color="h6" mb={2}>
                    <CustomLink
                      isExternal={false}
                      href="https://youtu.be/6LiMoU-cZCU"
                    >
                      {t("MoreInfo.desc4")}
                    </CustomLink>
                  </Typography>
                </CardContent>
              </BlankCard>
            </Grid>
          </Grid>
        </form>
      </>
    </ParentCard>
  );
};

export default TokenContainer;
