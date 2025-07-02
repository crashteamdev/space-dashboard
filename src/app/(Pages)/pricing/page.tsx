"use client";

import React, { useEffect } from "react";
import {
  Grid,
  Typography,
  Box,
  List,
  ListItem,
  ListItemText,
  Button,
  CardContent,
  ListItemIcon,
  Chip,
  Switch,
  Stack,
  Alert
} from "@mui/material";
import { styled } from "@mui/material/styles";
import PageContainer from "@/components/ui/container/PageContainer";
import { IconCheck, IconX } from "@tabler/icons-react";
import BlankCard from "@/components/ui/shared/BlankCard";
import Popup from "@/components/ui/popup/popup";
import CheckPromoCode from "@/components/ui/checkPromoCode/checkPromoCode";
import { useSelector } from "@/shared/store/hooks";
import { useDispatch as useReduxDispatch } from "react-redux";
import { AppState } from "@/shared/store/store";
import { getExchange, purchaseService } from "@/shared/store/slices/balance/BalanceSlice";
import { getAuth } from "firebase/auth";
import firebase_app from "@/shared/firebase/firebase";
import { pricing } from "@/components/ui/popup/data";
import PaymentList from "@/components/paymentList/paymentList";
import { useRouter } from "next/navigation";
import { getPluralNoun } from "@/shared/lib/getPluralNoun";
import { motion } from "framer-motion";
import { AppButton } from "@/shared/components/AppButton";

const Pricing = () => {
  const [show, setShow] = React.useState(false);
  const [open, setOpen] = React.useState(0);
  const [context, setContext] = React.useState("yookassa") as any;
  const [empty, setEmpty] = React.useState("") as any;
  const auth = getAuth(firebase_app) as any;

  const dispatch = useReduxDispatch();
  const company = useSelector((state: AppState) => state.companyChanger) as any;

  const balanceReducer = useSelector((state: AppState) => state.balanceReducer) as any;
  const router = useRouter();

  const StyledChip = styled(Chip)({
    position: "absolute",
    top: "-13px",
    right: "0",
    left: "0",
    width: "200px",
    margin: "0 auto",
    backgroundColor: "#5D87FF",
    color: "#fff",
    textTransform: "uppercase",
    fontSize: "15px",
    zIndex: "9999"
  });

  const handleLink = () => {
    if (!context) {
      setEmpty("Выберите провайдера выше");
      setTimeout(() => {
        setEmpty("");
      }, 2000);
      return null;
    }
    setOpen(0);

    dispatch(
      purchaseService(
        auth.currentUser.accessToken,
        `${company.activeCompany}-analytics`,
        pricing[open - 1]?.package.toLowerCase(),
        window.localStorage.getItem("promocode") ? window.localStorage.getItem("promocode") : "",
        show ? 3 : 1,
        context.toLowerCase(),
        context === "Оплата с баланса" ? context.toLowerCase() : "one-time"
      )
    );
  };

  useEffect(() => {
    dispatch(getExchange(auth.currentUser.accessToken, "RUB"));
    router.push(balanceReducer.linkPayment);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [balanceReducer.linkPayment]);
  const itemsd = {
    hidden: { opacity: 0, x: -100 },
    show: { opacity: 1, x: 0 }
  };
  return (
    <PageContainer title="Тарифы" description="Тарифы">
      <Grid container spacing={3} justifyContent="center" mt={3}>
        <Grid item xs={12} sm={10} lg={8} textAlign="center">
          <Typography variant="h2">Тарифы</Typography>
          <Typography variant="h5" mt={2}>
            Без привязки карты. Доступы мгновенно
          </Typography>
          <Box display='flex' alignItems='center' mt={3} justifyContent='center'>
            <Typography variant='subtitle1'>1 месяц</Typography>
            <Switch onChange={() => setShow(!show)} />
            <Typography variant='subtitle1'>3 месяца</Typography>
          </Box>
        </Grid>
      </Grid>
      <Grid container spacing={3} mt={5}>
        {pricing.map((price: any, i) => (
          <Grid item xs={12} lg={4} sm={6} key={i}>
            <BlankCard className="relative !overflow-visible">
              <CardContent sx={{ p: "30px" }}>
                {price.badge ? <StyledChip label='Популярное' size='small'></StyledChip> : null}

                <Typography
                  variant='subtitle1'
                  fontSize='12px'
                  mb={3}
                  color='textSecondary'
                  textTransform='uppercase'
                >
                  {price.packageRu}
                </Typography>
                {show ? <div className="absolute right-[30px] top-[30px] text-base font-semibold">{price.discount}% скидка</div>  : <></>}
                <Box my={4}>
                  {price.plan == "Free" ? (
                    <Box fontSize='50px' mt={5} fontWeight='600'>
                      {price.plan}
                    </Box>
                  ) : (
                    <Box display='flex'>
                      <Typography variant='h6' mr='8px' mt='-12px'>
                        ₽
                      </Typography>
                      {show ? (
                        <>
                          <motion.div
                          variants={itemsd}
                          initial="hidden"
                          animate="show"
                            >
                            <Typography fontSize="48px" fontWeight="600">
                              {(price.monthlyplan * 3 - (price.monthlyplan * 3 * price.diccountMath))}
                            </Typography>
                          </motion.div>
                          <Typography
                            fontSize='15px'
                            fontWeight={400}
                            ml={1}
                            color='textSecondary'
                            mt={1}
                          >
                            / 3 месяца
                          </Typography>
                        </>
                      ) : (
                        <>
                          <Typography fontSize='48px' fontWeight='600'>
                            {price.monthlyplan}
                          </Typography>
                          <Typography
                            fontSize='15px'
                            fontWeight={400}
                            ml={1}
                            color='textSecondary'
                            mt={1}
                          >
                            / месяц
                          </Typography>
                        </>
                      )}
                    </Box>
                  )}
                </Box>

                <Box mt={3}>
                  <List>
                    {price.rules.map((rule: any, i: number) => (
                      <Box key={i}>
                        {rule.limit ? (
                          <>
                            <ListItem disableGutters>
                              <ListItemIcon sx={{ color: "primary.main", minWidth: "32px" }}>
                                <IconCheck width={18} />
                              </ListItemIcon>
                              <ListItemText>{rule.title}</ListItemText>
                            </ListItem>
                          </>
                        ) : (
                          <ListItem disableGutters sx={{ color: "grey.400" }}>
                            <ListItemIcon sx={{ color: "grey.400", minWidth: "32px" }}>
                              <IconX width={18} />
                            </ListItemIcon>
                            <ListItemText>{rule.title}</ListItemText>
                          </ListItem>
                        )}
                      </Box>
                    ))}
                  </List>
                </Box>
                <Button
                  sx={{ width: "100%", mt: 3 }}
                  variant='contained'
                  onClick={() => setOpen(i + 1)}
                  size='large'
                  color='primary'
                >
                  {price.btntext}
                </Button>
              </CardContent>
            </BlankCard>
          </Grid>
        ))}
        <Popup
          open={open}
          setOpen={setOpen}
          title={"Оплата"}
          description=""
        >
          <>
            <Stack px={3}>
              <Alert className="flex items-center mb-3 !bg-blueGray-600" variant="filled" severity="info">Вы выбрали тариф для {(company.activeCompany === "ke" ) ? "Магнит Маркет" : "Uzum"}</Alert>
              <Typography variant="h6" sx={{ mt: 1 }}>
                Тариф: {pricing[open - 1]?.packageRu}
              </Typography>
              <Typography variant="h6" sx={{ mt: 1 }}>
                Сумма: ₽
                {show
                  ? pricing[open - 1]?.monthlyplan * 3 - (pricing[open - 1]?.monthlyplan * 3 * pricing[open - 1]?.diccountMath)
                  : pricing[open - 1]?.monthlyplan}{" "}
              </Typography>
              <Typography variant="h6" sx={{ mt: 1 }}>
                Срок: {show ? 1 * 3 : 1} {getPluralNoun(show ? 1 * 3 : 1 || 0, "месяц", "месяца", "месяцев")}
              </Typography>
                <Box mt={2}>
                  <PaymentList pricing={
                    show
                      ? pricing[open - 1]?.monthlyplan * 3 - (pricing[open - 1]?.monthlyplan * 3 * pricing[open - 1]?.diccountMath)
                      : pricing[open - 1]?.monthlyplan
                  } company={company.activeCompany} pay={true} error={empty} context={context} setContext={setContext} />
                </Box>
              {context !== "Оплата с баланса" && <CheckPromoCode /> }
            </Stack>
            <Stack direction='row' px={3} pb={2} mb={2} mt={2} justifyContent={"space-between"}>
              <AppButton tag="button" themeType="cancel" onClick={() => setOpen(0)}>
                Отменить
              </AppButton>
              {company.activeCompany === "ke" &&
                <AppButton tag="button" themeType="primary" onClick={handleLink}>
                  Оплатить тариф {(company.activeCompany === "ke" ) ? "Магнит Маркет" : "Uzum"}
                </AppButton>
              } 
            </Stack>
          </>
        </Popup>
      </Grid>
    </PageContainer>
  );
};

export default Pricing;
