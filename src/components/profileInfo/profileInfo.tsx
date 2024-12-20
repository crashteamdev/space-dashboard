import { CardContent, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Box, Button, Grid } from "@mui/material";
import BlankCard from "../ui/shared/BlankCard";
import ParentCard from "../ui/shared/ParentCard";
import { useSelector } from "@/shared/store/hooks";
import { useDispatch as useReduxDispatch } from "react-redux";
import { fetchProfileStatus } from "@/shared/store/slices/userProfile/UserProfileSlice";
import firebase_app from "@/shared/firebase/firebase";
import { AppState } from "@/shared/store/store";
import { getAuth } from "firebase/auth";
import { useTranslation } from "react-i18next";
import Link from "next/link";
import ProfileListPayments from "../profileListPayments/profileListPayments";
import { getSubscription } from "@/shared/store/slices/account/AccountSlice";

const ProfileInfo = () => {
  const company = useSelector((state: AppState) => state.companyChanger) as any;
  const token = useSelector((state: AppState) => state.userpostsReducer) as any;
  const [, setRepriceData] = useState({}) as any;
  const auth = getAuth(firebase_app) as any;

  const { t } = useTranslation();
  const dispatch = useReduxDispatch();

  const getSubRepricer = async () => {
    const data = await dispatch(getSubscription(company.activeCompany));
    await dispatch(fetchProfileStatus(auth.currentUser.accessToken, company.activeCompany));
    await setRepriceData(data);
  };

  const checkStrategy = (value: string) => {
    if (value === "default") {
      return "Базовый";
    } else if (value === "advanced") {
      return "Расширенный";
    } else if (value === "pro") {
      return "Профессиональный";
    } else if (value === "demo") {
      return "Демо Тариф";
    }
  };

  useEffect(() => {
    if (auth.currentUser) {
      getSubRepricer();
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
                  {token.subscription?.active ? (
                    <>
                      <Typography color='h4' mb={3}>
                        <b>{t("profileT.yourRate")}: </b>
                        <span>{checkStrategy(token.subscription?.type)}</span>
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
            {/* <Grid item lg={6} md={12} sm={12}>
              <BlankCard className="h-full">
                <CardContent className="h-full">
                  <Typography variant='h5' mb={2}>
                  Сервис автоматического изменения цен
                  </Typography>
                  {repriceData ? (
                    <>
                      <Typography color='h4' mb={3}>
                        <b>{t("profileT.yourRate")}: </b>
                        <span>{checkStrategy(repriceData?.plan)}</span>
                      </Typography>
                      <Typography color='h4' mb={0}>
                        <b>{t("profileT.validUntil")}: </b>
                        <span>{repriceData.validUntil ? format(new Date(repriceData.validUntil), "yyyy-MM-dd HH:mm") : ""}</span>
                      </Typography>
                    </>
                  ) : (
                    <Typography color='h4' mb={0}>
                      <b>{t("profileT.tarifNotFound")}</b>
                    </Typography>
                  )}
                </CardContent>
              </BlankCard>
            </Grid> */}
            <Grid item xs={12} lg={12}>
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