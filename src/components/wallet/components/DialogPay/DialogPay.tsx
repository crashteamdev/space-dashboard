import React from "react";
import {
  Box,
  Stack,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  Grid,
  DialogContentText
} from "@mui/material";
import CustomTextField from "@/components/ui/theme-elements/CustomTextField";
import CustomFormLabel from "@/components/ui/theme-elements/CustomFormLabel";
import ChildCard from "@/components/ui/shared/ChildCard";
import { useDispatch, useSelector } from "@/shared/store/hooks";
import { setOpen, setValue } from "@/shared/store/slices/walletPopup/WalletPopupSlice";
import { AppState } from "@/shared/store/store";
import Link from "next/link";

export const DialogPay = () => {
    const [valueText, setValueText] = React.useState("");

    const walletPopup = useSelector((state: AppState) => state.walletPopup);

  const dispatch = useDispatch();
    const handleLink = () => {
        dispatch(setValue(valueText));
        dispatch(setOpen(false));
      };
    
      const handleClose = () => {
        dispatch(setOpen(false));
      };
    
      const handleChange = (value: string) => {
        setValueText(
          value
            .replace(/\d $/, "")
            .replace(/\D/g, "")
            // eslint-disable-next-line security/detect-unsafe-regex
            .replace(/(\d)(?=(\d{3})+(\D|$))/g, "$1 ")
        );
      };
    return (
        <Dialog open={walletPopup.open} onClose={handleClose}>
        <DialogTitle mt={2}>Пополнить баланс</DialogTitle>
        <DialogContent>
          <DialogContentText>
            С баланса списывается ТОЛЬКО стоимость услуг за сервис
          </DialogContentText>
          <Box mt={2}>
            <CustomFormLabel>Сумма к пополнению</CustomFormLabel>
            <CustomTextField
              fullWidth
              value={"₽ " + valueText}
              onChange={(input: any) => handleChange(input.currentTarget.value)}
              margin='dense'
              id='email'
              name='email'
            />
          </Box>
        </DialogContent>
        <Grid item xs={12} lg={4} sm={6} display='flex' alignItems='stretch'>
          <ChildCard>
            <Stack direction='row' gap={3} justifyContent={"space-between"}>
              <Button onClick={() => handleChange("2000")} fullWidth>
                2000 ₽
              </Button>
              <Button onClick={() => handleChange("2600")} fullWidth>
                2600 ₽
              </Button>
              <Button onClick={() => handleChange("3300")} fullWidth>
                3300 ₽
              </Button>
              <Button onClick={() => handleChange("4500")} fullWidth>
                4500 ₽
              </Button>
            </Stack>
          </ChildCard>
        </Grid>
        <Stack direction='row' px={3} pb={2} mb={2} mt={2} justifyContent={"space-between"}>
          <Button variant='contained' color='error' onClick={handleClose}>
            Отменить
          </Button>
          <Button
            variant='contained'
            component={Link}
            color='primary'
            href='/payment'
            onClick={handleLink}
          >
            Оплатить
          </Button>
        </Stack>
      </Dialog>
    );
};