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
  MenuItem,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { styled } from "@mui/material/styles";
import Breadcrumb from "@/components/ui/breadcrumb/Breadcrumb";
import PageContainer from "@/components/ui/container/PageContainer";

import { IconCheck, IconX } from "@tabler/icons-react";
import BlankCard from "@/components/ui/shared/BlankCard";
import Image from "next/image";
import Popup from "@/components/ui/popup/popup";
import CheckPromoCode from "@/components/ui/checkPromoCode/checkPromoCode";
import { useDispatch, useSelector } from "@/shared/store/hooks";
import { AppState } from "@/shared/store/store";
import CustomTextField from "@/components/ui/theme-elements/CustomTextField";
import CustomFormLabel from "@/components/ui/theme-elements/CustomFormLabel";
import { purchaseService } from "@/shared/store/slices/balance/BalanceSlice";
import { getAuth } from "firebase/auth";
import firebase_app from "@/shared/firebase/firebase";
import { data, pricing } from "@/components/ui/popup/data";
import CustomSelect from "@/components/ui/theme-elements/CustomSelect";
import fk from "../../../../../public/images/payment/fk.png";
import click from "../../../../../public/images/payment/click.png";
import PaymentList from "@/components/paymentList/paymentList";
import { useRouter } from "next/navigation";
import { addItem } from "@/shared/store/slices/alerts/AlertsSlice";
import { v4 as uuidv4 } from "uuid";

const BCrumb = [
  {
    to: "/",
    title: "Главная",
  },
  {
    title: "Тарифы",
  },
];

const Pricing = () => {
  const [show, setShow] = React.useState(false);
  const [open, setOpen] = React.useState(0);
  const [context, setContext] = React.useState("") as any;
  const [empty, setEmpty] = React.useState("") as any;
  const [promoCode, setPromoCode] = React.useState("");
  const auth = getAuth(firebase_app) as any;

  const dispatch = useDispatch();
  const yearlyPrice = (a: any, b: number) => a * b;
  const company = useSelector((state: AppState) => state.companyChanger) as any;

  const theme = useTheme();
  const warninglight = theme.palette.warning.light;
  const warning = theme.palette.warning.main;
  const balanceReducer = useSelector(
    (state: AppState) => state.balanceReducer
  ) as any;
  const router = useRouter();

  const StyledChip = styled(Chip)({
    position: "absolute",
    top: "15px",
    right: "30px",
    backgroundColor: warninglight,
    color: warning,
    textTransform: "uppercase",
    fontSize: "11px",
  });

  const handleLink = () => {
    if (!context) {
      setEmpty("Выберите провайдера выше");
      setTimeout(() => {
        setEmpty("");
      }, 2000);
      return null;
    }
    dispatch(
      addItem({
        title: "Ожидайте",
        description: "Происходит редирект на страницу оплаты",
        status: "info",
        timelife: 4000,
        id: uuidv4(),
      })
    );
    dispatch(
      purchaseService(
        auth.currentUser.accessToken,
        `${company.activeCompany}-analytics`,
        pricing[open - 1]?.package.toLowerCase(),
        promoCode,
        show ? "3" : "1",
        context.toLowerCase(),
        context === "Оплата с баланса" ? context.toLowerCase() : "one-time"
      )
    );
  };

  useEffect(() => {
    // router.push(balanceReducer.linkPayment);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [balanceReducer.linkPayment]);

  return (
    <PageContainer title="Pricing" description="this is Pricing">
      <Breadcrumb title="Pricing" items={BCrumb} />
      <Grid container spacing={3} justifyContent="center" mt={3}>
        <Grid item xs={12} sm={10} lg={8} textAlign="center">
          <Typography variant="h2">Тарифы</Typography>
          <Typography variant="h5" mt={2}>
            Без привязки карты. Доступы мгновенно
          </Typography>
          <Box
            display="flex"
            alignItems="center"
            mt={3}
            justifyContent="center"
          >
            <Typography variant="subtitle1">Monthly</Typography>
            <Switch onChange={() => setShow(!show)} />
            <Typography variant="subtitle1">3 Monthly</Typography>
          </Box>
        </Grid>
      </Grid>
      <Grid container spacing={3} mt={5}>
        {pricing.map((price: any, i) => (
          <Grid item xs={12} lg={4} sm={6} key={i}>
            <BlankCard>
              <CardContent sx={{ p: "30px" }}>
                {price.badge ? (
                  <StyledChip label="Popular" size="small"></StyledChip>
                ) : null}

                <Typography
                  variant="subtitle1"
                  fontSize="12px"
                  mb={3}
                  color="textSecondary"
                  textTransform="uppercase"
                >
                  {price.packageRu}
                </Typography>
                <Image
                  src={price.avatar}
                  alt={price.avatar}
                  width={90}
                  height={90}
                />
                <Box my={4}>
                  {price.plan == "Free" ? (
                    <Box fontSize="50px" mt={5} fontWeight="600">
                      {price.plan}
                    </Box>
                  ) : (
                    <Box display="flex">
                      <Typography variant="h6" mr="8px" mt="-12px">
                        $
                      </Typography>
                      {show ? (
                        <>
                          <Typography fontSize="48px" fontWeight="600">
                            {yearlyPrice(`${price.monthlyplan}`, 3)}
                          </Typography>
                          <Typography
                            fontSize="15px"
                            fontWeight={400}
                            ml={1}
                            color="textSecondary"
                            mt={1}
                          >
                            /yr
                          </Typography>
                        </>
                      ) : (
                        <>
                          <Typography fontSize="48px" fontWeight="600">
                            {price.monthlyplan}
                          </Typography>
                          <Typography
                            fontSize="15px"
                            fontWeight={400}
                            ml={1}
                            color="textSecondary"
                            mt={1}
                          >
                            /mo
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
                              <ListItemIcon
                                sx={{ color: "primary.main", minWidth: "32px" }}
                              >
                                <IconCheck width={18} />
                              </ListItemIcon>
                              <ListItemText>{rule.title}</ListItemText>
                            </ListItem>
                          </>
                        ) : (
                          <ListItem disableGutters sx={{ color: "grey.400" }}>
                            <ListItemIcon
                              sx={{ color: "grey.400", minWidth: "32px" }}
                            >
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
                  variant="contained"
                  onClick={() => setOpen(i + 1)}
                  size="large"
                  color="primary"
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
          description={`Вы выбрали тариф ${
            pricing[open - 1]?.packageRu
          }, проверьте еще раз чтобы не ошибится`}
        >
          <>
            <Stack px={3}>
              <Typography variant="h6">
                Тариф: {pricing[open - 1]?.packageRu}
              </Typography>
              <Typography variant="h6" sx={{ mt: 1 }}>
                Сумма: $
                {show
                  ? pricing[open - 1]?.monthlyplan * 3
                  : pricing[open - 1]?.monthlyplan}
              </Typography>
              <Typography variant="h6" sx={{ mt: 1 }}>
                Срок: {show ? 1 * 3 : 1} м.
              </Typography>
              <Box mt={2}>
                <PaymentList
                  error={empty}
                  context={context}
                  setContext={setContext}
                />
              </Box>
              <CheckPromoCode setCheck={setPromoCode} />
            </Stack>
            <Stack
              direction="row"
              px={3}
              pb={2}
              mb={2}
              mt={2}
              justifyContent={"space-between"}
            >
              <Button
                variant="contained"
                color="error"
                onClick={() => setOpen(0)}
              >
                Отменить
              </Button>
              <Button variant="contained" color="primary" onClick={handleLink}>
                Оплатить тариф
              </Button>
            </Stack>
          </>
        </Popup>
      </Grid>
    </PageContainer>
  );
};

export default Pricing;
