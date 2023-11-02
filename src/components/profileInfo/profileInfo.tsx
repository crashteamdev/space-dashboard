import { CardContent, Typography } from "@mui/material";
import React, { useEffect } from "react";
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

const ProfileInfo = () => {
  const company = useSelector((state: AppState) => state.companyChanger) as any;
  const token = useSelector((state: AppState) => state.userpostsReducer) as any;

  const auth = getAuth(firebase_app) as any;

  const { t } = useTranslation();
  const dispatch = useDispatch();

  useEffect(() => {
    if (auth.currentUser) {
      dispatch(
        fetchProfileStatus(auth.currentUser.accessToken, company.activeCompany)
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <ParentCard title={t("profile")}>
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
                        <CustomLink href={"https://t.me/marketdbchat"} isExternal={false}>
                          Telegram
                        </CustomLink>
                      </Typography>
                      {token.subscription?.active ? (
                        <>
                          <Typography color="h4" mb={3}>
                            <b>{t("profileT.yourRate")}: </b>
                            <span>
                              {token.subscription?.type?.toUpperCase()}
                            </span>
                          </Typography>
                          <Typography color="h4" mb={3}>
                            <b>{t("profileT.status")}: </b>
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
                            <b>{t("profileT.validUntil")}: </b>
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
                          component={Link}
                          href={"/pricing"}
                          color="primary"
                        >
                          {t("profileT.selectTarif")}
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
                    <Typography variant="h5" mb={1}>
                      {t("ChangePassword.title")}
                    </Typography>
                    <Box pt={1}>
                      <Button
                        variant="contained"
                        href={"/auth/forgot-password"}
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
        </form>
      </>
    </ParentCard>
  );
};

export default ProfileInfo;