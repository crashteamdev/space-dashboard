import { CardContent, Typography } from "@mui/material";
import React, { useEffect } from "react";
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

const TokenGenerator = () => {
  const user = useSelector((state: AppState) => state.user) as any;
  const auth = getAuth(firebase_app) as any;

  const { t } = useTranslation();

  const token = useSelector((state: AppState) => state.userpostsReducer) as any;
  const dispatch = useDispatch();

  const refreshToken = () => {
    dispatch(fetchRefreshToken(auth.currentUser.accessToken));
  };
  const generateToken = () => {
    dispatch(fetchGenerateToken(auth.currentUser.accessToken));
  };

  useEffect(() => {
    console.log(user, auth.currentUser);
    dispatch(fetchToken(auth.currentUser.accessToken));
    dispatch(fetchProfileStatus(auth.currentUser.accessToken));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <ParentCard
      title={t("profile")}
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
            <Grid item lg={6} md={12} sm={12}>
              <Grid item xs={12} lg={12}>
                <Grid item xs={12} lg={12}>
                  <BlankCard>
                    <CardContent>
                      <Typography variant="h5" mb={2}>
                        {t("profileT.informationTitle")}
                      </Typography>
                      <Typography color="textSecondary" mb={3}>
                        {t("profileT.informationDesc")}{" "}
                        <a href={"https://t.me/marketdbchat"}>Telegram</a>
                      </Typography>
                      {token.subscription?.active ? (
                        <>
                          <Typography color="h4" mb={3}>
                            <b>Ваш тариф: </b>
                            <span>
                              {token.subscription?.type?.toUpperCase()}
                            </span>
                          </Typography>
                          <Typography color="h4" mb={3}>
                            <b>Статус: </b>
                            <span
                              style={{
                                color: token.subscription?.active
                                  ? "green"
                                  : "red",
                              }}
                            >
                              {token.subscription?.active
                                ? "Подписка активна"
                                : "Подписка не активна"}
                            </span>
                          </Typography>
                          <Typography color="h4" mb={3}>
                            <b>Действует до: </b>
                            <span>{token.subscription?.endAt}</span>
                          </Typography>
                        </>
                      ) : (
                        <Typography color="h4" mb={3}>
                          <b>{t("profileT.tarifNotFound")}</b>
                        </Typography>
                      )}

                      <Box>
                        <Button
                          variant="contained"
                          href={"/theme-pages/pricing"}
                          color="primary"
                        >
                          {t("profileT.selectTarif")}
                        </Button>
                      </Box>
                    </CardContent>
                  </BlankCard>
                </Grid>
                <Grid item xs={12} lg={12} mt={3}>
                  <BlankCard>
                    <CardContent>
                      <Typography variant="h5" mb={1}>
                        {t("ChangePassword.title")}
                      </Typography>
                      <Box pt={1}>
                        <Button
                          variant="contained"
                          href={"/auth/auth2/forgot-password"}
                          color="primary"
                        >
                          {t("ChangePassword.button")}
                        </Button>
                      </Box>
                    </CardContent>
                  </BlankCard>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12} lg={6}>
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
                          <CustomTextField
                            id="text-cpwd"
                            value={token?.token?.apiKey}
                            variant="outlined"
                            fullWidth
                            type="text"
                          />
                        </form>
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
                        color="primary"
                      >
                        {t("Token.buttonGenerate")}
                      </Button>
                    )}
                  </CardContent>
                </BlankCard>
              </Grid>
              <Grid item xs={12} lg={12} mt={3}>
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
          </Grid>
        </form>
      </>
    </ParentCard>
  );
};

export default TokenGenerator;
