import { CardContent, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Box, Button, Grid } from "@mui/material";
import BlankCard from "../../../shared/BlankCard";
import CustomFormLabel from "../../../forms/theme-elements/CustomFormLabel";
import CustomTextField from "../../../forms/theme-elements/CustomTextField";
import ParentCard from "../../../shared/ParentCard";
import { useDispatch, useSelector } from "@/store/hooks";
import {
  fetchProfileStatus,
  fetchToken,
  fetchRefreshToken,
  fetchGenerateToken,
} from "@/store/apps/userProfile/UserProfileSlice";
import firebase_app from "@/firebase/firebase";
import { AppState } from "@/store/store";
import { getAuth } from "firebase/auth";
import { useTranslation } from "react-i18next";

const TokenContainer = () => {
  const user = useSelector((state: AppState) => state.user) as any;
  const auth = getAuth(firebase_app) as any;
  const [copy, setCopy] = useState(false)

  const styles = {
    paper: {
      border: `2px solid 'blue'`,
      cursor: 'pointer',
      overflow: "hidden",
      transition: 'border-color 0.3s, background-color 0.3s',
    },
  };

  const { t } = useTranslation();

  const token = useSelector((state: AppState) => state.userpostsReducer) as any;
  const company = useSelector((state: AppState) => state.companyChanger) as any;
  const dispatch = useDispatch();
  
  const refreshToken = () => {
    dispatch(fetchRefreshToken(auth.currentUser.accessToken, company.activeCompany));
  };
  const generateToken = () => {
    dispatch(fetchGenerateToken(auth.currentUser.accessToken, company.activeCompany));
  };

  const copyToken = () => {
    setCopy(true)
    const textArea = document.createElement('textarea');
    textArea.value = token?.token?.apiKey;

    // Добавляем textarea на страницу
    document.body.appendChild(textArea);

    // Выделяем текст в textarea
    textArea.select();
    document.execCommand('copy');
    document.body.removeChild(textArea);
    console.log('w')
    setTimeout(() => setCopy(false), 1800)
  };

  useEffect(() => {
    console.log(user, auth.currentUser);
    dispatch(fetchToken(auth.currentUser.accessToken, company.activeCompany));
    dispatch(fetchProfileStatus(auth.currentUser.accessToken, company.activeCompany));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [company]);

  return (
    <ParentCard
      title={t('extension.informationTitle')}
      // footer={
      //   <>
      //     <Button
      //       variant="contained"
      //       color="error"
      //       sx={{
      //         mr: 1,
      //       }}
      //     >
      //       Cancel
      //     </Button>
      //     <Button variant="contained" color="primary">
      //       Submit
      //     </Button>
      //   </>
      // }
    >
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
                    {token?.token?.apiKey ? (
                      <>
                        <form>
                          <CustomFormLabel
                            sx={{
                              mt: 0,
                            }}
                            htmlFor="text-cpwd"
                          >
                            {t("Token.upInput")}
                          </CustomFormLabel>
                          <Box style={styles.paper} onClick={copyToken} p={2} bgcolor={'lightgray'}>
                            {token?.token?.apiKey}
                          </Box>
                        </form>
                        <Box pt={2}>
                          <Button
                            onClick={refreshToken}
                            variant="contained"
                            color="primary"
                          >
                            {t("Token.buttonGenerate")}
                          </Button>
                          <span style={{marginLeft: '16px'}}>{copy ? 'Токен сохранен в буфер обмена...' : ''}</span>
                        </Box>
                      </>
                    ) : (
                      <Button
                        onClick={generateToken}
                        variant="contained"
                        color="primary"
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
                        href="https://vk.cc/c8C8MW"
                        color="primary"
                      >
                        {t("MoreInfo.descButton")}
                      </Button>
                    </Box>
                    <Typography variant="h6" color="h4" mb={2}>
                      <b>{t("MoreInfo.title1")}</b>
                    </Typography>
                    <Typography color="h6" mb={1}>
                      <a href="https://t.me/marketdbru">
                        {t("MoreInfo.desc1")}
                      </a>
                    </Typography>
                    <Typography color="h6" mb={2}>
                      <a href="https://t.me/marketdbchat">
                        {t("MoreInfo.desc2")}
                      </a>
                    </Typography>
                    <Typography variant="h6" color="h4" mb={2}>
                      <b>{t("MoreInfo.title2")}</b>
                    </Typography>
                    <Typography color="h6" mb={1}>
                      <a href="https://wiki.marketdb.ru/ru/base/getting-started">
                        {t("MoreInfo.desc3")}
                      </a>
                    </Typography>
                    <Typography color="h6" mb={2}>
                      <a href="https://youtu.be/6LiMoU-cZCU">
                        {t("MoreInfo.desc4")}
                      </a>
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
