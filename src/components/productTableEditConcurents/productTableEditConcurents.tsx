import React, { useEffect, useState } from "react";
import { Dialog, Box, Tab, Button } from "@mui/material";
import { getAuth } from "firebase/auth";
import firebase_app from "@/shared/firebase/firebase";
import styles from "./productTableEditConcurents.module.scss";
import ConcurentsBlock from "./productComponents/concurentsBlock/concurentsBlock";
import SettingsBlock from "./productComponents/settingsBlock/settingsBlock";
import { useParams } from "next/navigation";
import { useDispatch, useSelector } from "@/shared/store/hooks";
import { AppState } from "@/shared/store/store";
import { getItemShop } from "@/shared/store/slices/reprice/repriceSlice";
import TabList from "@mui/lab/TabList";
import TabContext from "@mui/lab/TabContext";

const COMMON_TAB = [
  { value: "1", icon: "", label: "Настройки", ul: "set", disabled: false },
  { value: "2", icon: "", label: "Конкуренты", ul: "con", disabled: false }
];

const ProductTableEditConcurents = ({ open, setOpen }: any) => {
  const { accountId } = useParams() as any;
  const [data, setData] = useState({}) as any;
  const [value, setValue] = React.useState("set") as any;
  const dispatch = useDispatch();

  const company = useSelector((state: AppState) => state.companyChanger) as any;
  const repricer = useSelector((state: AppState) => state.repriceReducer) as any;

  const handleClose = () => {
    setOpen(false);
  };

  const [step, setStep] = useState(0);

  const auth = getAuth(firebase_app) as any;

  const handleChange = (event: React.SyntheticEvent, newValue: any) => {
    setStep(step === 1 ? 0 : 1);
    setValue(newValue);
  };

  const getItem = async () => {
    const result = await dispatch(
      getItemShop(
        auth.currentUser.accessToken,
        company.activeCompany,
        accountId,
        repricer.currentItem
      )
    );
    console.log(result);
    await setData(result);
  };

  useEffect(() => {
    if (open) {
      getItem();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  return (
    <Dialog
      style={{ justifyContent: "flex-end", margin: "0" }}
      open={open}
      className={styles.rightPopup}
      onClose={handleClose}
    >
      <Box mt={4} mb={2} mx={3} height={"40px"} display={"flex"} justifyContent={"space-between"}>
        <TabContext value={value}>
          <Box justifyContent='space-between'>
            <TabList onChange={handleChange} aria-label='lab API tabs example'>
              {COMMON_TAB.map((tab: any) => (
                <Tab key={tab.value} label={tab.label} value={tab.ul} />
              ))}
            </TabList>
          </Box>
        </TabContext>
        <Button onClick={() => handleClose()} color='secondary'>
          Закрыть
        </Button>
      </Box>
      {step == 0 ? <SettingsBlock item={data} setStep={setStep} /> : <ConcurentsBlock />}
    </Dialog>
  );
};

export default ProductTableEditConcurents;
