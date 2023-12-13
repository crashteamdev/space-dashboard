import { Box, Button, CardContent, Divider, Grid, Stack, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import BlankCard from "../ui/shared/BlankCard";
import Link from "next/link";
import { getShops } from "@/shared/store/slices/account/AccountSlice";
import { useSelector } from "react-redux";
import { useDispatch } from "@/shared/store/hooks";
import { useParams } from "next/navigation";
import { getAuth } from "firebase/auth";
import firebase_app from "@/shared/firebase/firebase";
import { AppState } from "@/shared/store/store";

const ShopList = () => {
  const dispatch = useDispatch();
  const { accountId } = useParams() as any;
  const [getData, setGetData] = useState([]);
  const [loading, setLoading] = useState(false) as any;

  const auth = getAuth(firebase_app) as any;
  const company = useSelector((state: AppState) => state.companyChanger) as any;

  const getFirstData = async () => {
    const data = await dispatch(
      getShops(auth.currentUser.accessToken, company.activeCompany, accountId)
    );
    setGetData(data);
    await setLoading(true);
  };

  useEffect(() => {
    getFirstData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return loading ? (
    getData?.length >= 1 ? (
      <Box display={"flex"} gap={"24px"} flexWrap={"wrap"}>
        {getData.map((item: any) => {
          return (
            <Grid
              style={{ cursor: "pointer" }}
              item
              component={Link}
              href={`/reprice/${accountId}/${item.id}`}
              sm={12}
              lg={12}
              key={item.id}
            >
              <BlankCard className='hoverCard'>
                <CardContent>
                  <Stack direction={"column"} gap={4} alignItems='center'>
                    <Box padding={"6px 24px"} textAlign={"center"}>
                      <Typography variant='h5' fontWeight={500}>
                        Магазин:
                      </Typography>
                      <Typography variant='h4'>{item.name}</Typography>
                    </Box>
                  </Stack>
                </CardContent>
                <Divider />
                <Box p={2} py={1} textAlign={"center"} sx={{ backgroundColor: "grey.100" }}>
                  <Box justifyContent={"center"} display='flex' gap={2}>
                    <Button>Открыть магазин</Button>
                  </Box>
                </Box>
              </BlankCard>
            </Grid>
          );
        })}
      </Box>
    ) : (
      <Typography ml={1} variant='h6'>
        Ваши магазины не найдены
      </Typography>
    )
  ) : (
    <Typography ml={1} variant='h6'>
      Идет загрузка списка магазинов
    </Typography>
  );
};

export default ShopList;
