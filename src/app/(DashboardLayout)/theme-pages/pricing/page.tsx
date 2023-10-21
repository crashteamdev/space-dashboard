"use client";

import React from "react";
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
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { styled } from "@mui/material/styles";
import Breadcrumb from "@/app/(DashboardLayout)/layout/shared/breadcrumb/Breadcrumb";
import PageContainer from "@/app/(DashboardLayout)/components/container/PageContainer";

import { IconCheck, IconX } from "@tabler/icons-react";
import BlankCard from "@/app/(DashboardLayout)/components/shared/BlankCard";
import Image from "next/image";

const BCrumb = [
  {
    to: "/",
    title: "Home",
  },
  {
    title: "Pricing",
  },
];

const pricing = [
  {
    id: 1,
    package: "Базовый",
    monthlyplan: 15,
    avatar: "/images/backgrounds/silver.png",
    badge: false,
    btntext: "Выбрать",
    rules: [
      {
        limit: true,
        title: "Доступ к расширению",
      },
      {
        limit: true,
        title: "30 дней периода аналитики",
      },
      {
        limit: true,
        title: "История позиций товара",
      },
      {
        limit: true,
        title: "Возможные конкурентные товары",
      },
      {
        limit: true,
        title: "3 отчета по магазинам в сутки",
      },
    ],
  },
  {
    id: 2,
    package: "Расширенный",
    monthlyplan: 30,
    avatar: "/images/backgrounds/bronze.png",
    badge: true,
    btntext: "Выбрать",
    rules: [
      {
        limit: true,
        title: "Доступ к расширению",
      },
      {
        limit: true,
        title: "30 / 60 / 90 дней периода аналитики",
      },
      {
        limit: true,
        title: "История позиций товара",
      },
      {
        limit: true,
        title: "Возможные конкурентные товары",
      },
      {
        limit: true,
        title: "6 отчетов Excel по магазинам в сутки",
      },
      {
        limit: true,
        title: "2 отчета Excel по категориям в сутки",
      },
      {
        limit: true,
        title: "24/7 поддержка",
      },
    ],
  },
  {
    id: 3,
    package: "Продвинутый",
    monthlyplan: 40,
    avatar: "/images/backgrounds/gold.png",
    badge: false,
    btntext: "Выбрать",
    rules: [
      {
        limit: true,
        title: "Доступ к расширению",
      },
      {
        limit: true,
        title: "История позиций товара",
      },
      {
        limit: true,
        title: "Возможные конкурентные товары",
      },
      {
        limit: true,
        title: "15 отчетов Excel по магазинам в сутки",
      },
      {
        limit: true,
        title: "4 отчета Excel по категориям в сутки",
      },
      {
        limit: true,
        title: "24/7 поддержка",
      },
    ],
  },
];

const Pricing = () => {
  const [show, setShow] = React.useState(false);

  const yearlyPrice = (a: any, b: number) => a * b;

  const theme = useTheme();
  const warninglight = theme.palette.warning.light;
  const warning = theme.palette.warning.main;

  const StyledChip = styled(Chip)({
    position: "absolute",
    top: "15px",
    right: "30px",
    backgroundColor: warninglight,
    color: warning,
    textTransform: "uppercase",
    fontSize: "11px",
  });

  return (
    <PageContainer title="Pricing" description="this is Pricing">
      {/* breadcrumb */}
      <Breadcrumb title="Pricing" items={BCrumb} />
      {/* end breadcrumb */}

      <Grid container spacing={3} justifyContent="center" mt={3}>
        <Grid item xs={12} sm={10} lg={8} textAlign="center">
          <Typography variant="h1">Тарифы</Typography>
          <Typography color="h3" mt={3}>
            Без привязки карты. Доступы мгновенно
          </Typography>
          <Box
            display="flex"
            alignItems="center"
            mt={3}
            justifyContent="center"
          >
            <Typography variant="subtitle1">Месяц</Typography>
            <Switch onChange={() => setShow(!show)} />
            <Typography variant="subtitle1">3 Месяца</Typography>
          </Box>
        </Grid>
      </Grid>
      <Grid container spacing={3} mt={5}>
        {pricing.map((price, i) => (
          <Grid item xs={12} lg={4} sm={6} key={i}>
            <BlankCard sx={{height: '100% !important'}}>
              <CardContent sx={{ p: "30px", height: '100%', display: 'flex', flexDirection: 'column' ,justifyContent: 'space-between' }}>
                <Box>
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
                    {price.package}
                  </Typography>
                  <Image
                    src={price.avatar}
                    alt={price.avatar}
                    width={90}
                    height={90}
                  />
                  <Box my={4}>
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
                            /год
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
                            /месяц
                          </Typography>
                        </>
                      )}
                    </Box>
                  </Box>

                  <Box mt={3}>
                    <List>
                      {price.rules.map((rule, i) => (
                        <Box key={i}>
                          {rule.limit ? (
                            <>
                              <ListItem disableGutters>
                                <ListItemIcon
                                  sx={{
                                    color: "primary.main",
                                    minWidth: "32px",
                                  }}
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
                </Box>

                <Button
                  sx={{ width: "100%", mt: 3 }}
                  variant="contained"
                  size="large"
                  color="primary"
                >
                  {price.btntext}
                </Button>
              </CardContent>
            </BlankCard>
          </Grid>
        ))}
      </Grid>
    </PageContainer>
  );
};

export default Pricing;
