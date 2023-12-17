import { CardContent, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Box, Button, Grid } from "@mui/material";
import BlankCard from "../ui/shared/BlankCard";
import ParentCard from "../ui/shared/ParentCard";
import { useDispatch, useSelector } from "@/shared/store/hooks";
import { fetchProfileStatus } from "@/shared/store/slices/userProfile/UserProfileSlice";
import firebase_app from "@/shared/firebase/firebase";
import { AppState } from "@/shared/store/store";
import { getAuth } from "firebase/auth";
import { useTranslation } from "react-i18next";
import Link from "next/link";
import CustomLink from "../ui/link/Link";
import ProfileListPayments from "../profileListPayments/profileListPayments";
import { getSubscription } from "@/shared/store/slices/account/AccountSlice";

const ProfileInfo = () => {
  const company = useSelector((state: AppState) => state.companyChanger) as any;
  const token = useSelector((state: AppState) => state.userpostsReducer) as any;
  const [repriceData, setRepriceData] = useState({}) as any;
  const auth = getAuth(firebase_app) as any;

  const { t } = useTranslation();
  const dispatch = useDispatch();

  const getSubRepricer = async () => {
    const data = await dispatch(getSubscription(company.activeCompany));
    console.log(data);
    await setRepriceData(data);
  };

  useEffect(() => {
    if (auth.currentUser) {
      getSubRepricer();
      dispatch(fetchProfileStatus(auth.currentUser.accessToken, company.activeCompany));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [company.activeCompany]);

  return (
    <ParentCard title={t("profile")}>
      <>
        <form>
          <Grid container spacing={3}>
            <Grid item lg={6} md={12} sm={12}>
              <BlankCard>
                <CardContent>
                  <Typography variant='h5' mb={2}>
                    {t("profileT.informationTitle")}
                  </Typography>
                  <Typography color='textSecondary' mb={3}>
                    {t("profileT.informationDesc")}{" "}
                    <CustomLink href={"https://t.me/marketdbchat"} isExternal={false}>
                      Telegram
                    </CustomLink>
                  </Typography>
                  {token.subscription?.active ? (
                    <>
                      <Typography color='h4' mb={3}>
                        <b>{t("profileT.yourRate")}: </b>
                        <span>{token.subscription?.type?.toUpperCase()}</span>
                      </Typography>
                      <Typography color='h4' mb={3}>
                        <b>{t("profileT.status")}: </b>
                        <span
                          style={{
                            color: token.subscription?.active ? "green" : "red"
                          }}
                        >
                          {token.subscription?.active ? "Подписка активна" : "Подписка не активна"}
                        </span>
                      </Typography>
                      <Typography color='h4' mb={3}>
                        <b>{t("profileT.validUntil")}: </b>
                        <span>{token.subscription?.endAt}</span>
                      </Typography>
                    </>
                  ) : (
                    <Typography color='h4' mb={3}>
                      <b>{t("profileT.tarifNotFound")}</b>
                    </Typography>
                  )}

                  <Box>
                    <Button variant='contained' component={Link} href={"/pricing"} color='primary'>
                      {t("profileT.selectTarif")}
                    </Button>
                  </Box>
                </CardContent>
              </BlankCard>
            </Grid>
            <Grid item lg={6} md={12} sm={12}>
              <BlankCard>
                <CardContent>
                  <Typography variant='h5' mb={2}>
                    Информация о подписке на Repricer
                  </Typography>
                  {repriceData ? (
                    <>
                      <Typography color='h4' mb={3}>
                        <b>{t("profileT.yourRate")}: </b>
                        <span>{repriceData?.plan?.toUpperCase()}</span>
                      </Typography>
                      <Typography color='h4' mb={3}>
                        <b>{t("profileT.validUntil")}: </b>
                        <span>{repriceData.validUntil}</span>
                      </Typography>
                    </>
                  ) : (
                    <Typography color='h4' mb={3}>
                      <b>{t("profileT.tarifNotFound")}</b>
                    </Typography>
                  )}

                  <Box>
                    <Button variant='contained' component={Link} href={"/pricing"} color='primary'>
                      {t("profileT.selectTarif")}
                    </Button>
                  </Box>
                </CardContent>
              </BlankCard>
            </Grid>
            <Grid item xs={12} lg={6}>
              <Grid item xs={12} lg={12}>
                <BlankCard>
                  <CardContent>
                    <Typography variant='h5' mb={1}>
                      {t("ChangePassword.title")}
                    </Typography>
                    <Box pt={1}>
                      <Button
                        variant='contained'
                        component={Link}
                        href={"/auth/forgot-password"}
                        color='primary'
                      >
                        {t("ChangePassword.button")}
                      </Button>
                    </Box>
                  </CardContent>
                </BlankCard>
              </Grid>
            </Grid>
            <Grid item xs={12} lg={6}>
              <Grid item xs={12} lg={12}>
                <ProfileListPayments />
              </Grid>
            </Grid>
          </Grid>
        </form>
      </>
    </ParentCard>
  );
};

export default ProfileInfo;