import React, { useState } from "react";
import { Box, Stack, Button, Dialog, DialogTitle, DialogContent } from "@mui/material";
import CustomTextField from "../ui/theme-elements/CustomTextField";
import CustomFormLabel from "../ui/theme-elements/CustomFormLabel";
import { useFormik } from "formik";
import { AppState } from "@/shared/store/store";
import * as yup from "yup";
import { updateAccount } from "@/shared/store/slices/account/AccountSlice";
import { useSelector } from "react-redux";
import { useParams } from "next/navigation";
import { useDispatch } from "@/shared/store/hooks";

const EditAccount = ({ getFirstData, open, setOpen, id }: any) => {
  const handleClose = () => {
    setOpen(false);
  };
  const { accountId } = useParams() as any;
  
  const [accId] = useState(id ? id : accountId);

  const validationSchema = yup.object({
    login: yup
      .string()
      .min(4, "Login should be of minimum 4 characters length")
      .required("Login is required"),
    password: yup
      .string()
      .min(8, "Password should be of minimum 8 characters length")
      .required("Password is required")
  });
  const company = useSelector((state: AppState) => state.companyChanger) as any;
  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: {
      login: "",
      password: ""
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      await dispatch(updateAccount(company.activeCompany, values.login, values.password, accId));
      await getFirstData();
      setOpen(false);
    }
  });

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle mt={2}>Редактирование данных аккаунта</DialogTitle>
      <DialogContent></DialogContent>
      <form onSubmit={formik.handleSubmit}>
        <Stack mx={3} direction='row' gap={3} justifyContent={"space-between"}>
          <Box width={"100%"}>
            <CustomFormLabel>Логин</CustomFormLabel>
            <CustomTextField
              fullWidth
              id='login'
              name='login'
              placeholder='Введите логин'
              value={formik.values.login}
              onChange={formik.handleChange}
              error={formik.touched.login && Boolean(formik.errors.login)}
              helperText={formik.touched.login && formik.errors.login}
            />
          </Box>
          <Box width={"100%"} mb={2}>
            <CustomFormLabel>Пароль</CustomFormLabel>
            <CustomTextField
              fullWidth
              id='password'
              name='password'
              placeholder='Введите пароль'
              type='password'
              value={formik.values.password}
              onChange={formik.handleChange}
              error={formik.touched.password && Boolean(formik.errors.password)}
              helperText={formik.touched.password && formik.errors.password}
            />
          </Box>
        </Stack>
        <Stack direction='row' px={3} pb={2} mb={2} mt={2} justifyContent={"flex-end"}>
          <Button variant='contained' color='primary' type='submit'>
            Сохранить
          </Button>
        </Stack>
      </form>
    </Dialog>
  );
};

export default EditAccount;
