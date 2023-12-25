import { Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { getShops } from "@/shared/store/slices/account/AccountSlice";
import { useSelector } from "react-redux";
import { useDispatch } from "@/shared/store/hooks";
import { useParams } from "next/navigation";
import { getAuth } from "firebase/auth";
import firebase_app from "@/shared/firebase/firebase";
import { AppState } from "@/shared/store/store";
import { CardShop } from "./components/CardShop";

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
      <div className="flex gap-6 flex-wrap">
        {getData.map((item, key) => {
            return (
              <CardShop accountId={accountId} key={key} item={item} />
            );
        })}
      </div>
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
