import React from "react";
import {
  Box,
  Stack,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText
} from "@mui/material";
import CustomTextField from "../ui/theme-elements/CustomTextField";
import CustomFormLabel from "../ui/theme-elements/CustomFormLabel";
import { useFormik } from "formik";
import { AppState } from "@/shared/store/store";
import * as yup from "yup";
import { createNewAccount } from "@/shared/store/slices/account/AccountSlice";
import { useSelector } from "react-redux";
import { getAuth } from "firebase/auth";
import firebase_app from "@/shared/firebase/firebase";
import { useDispatch as useReduxDispatch } from "react-redux";
import { AppButton } from "@/shared/components/AppButton";

const CreateNewAccount = ({ open, setOpen, getFirstData }: any) => {
  const handleClose = () => {
    setOpen(false);
  };

  const auth = getAuth(firebase_app) as any;

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
  const dispatch = useReduxDispatch();
  const formik = useFormik({
    initialValues: {
      login: "",
      password: ""
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      const result = await dispatch(
        createNewAccount(
          auth.currentUser.accessToken,
          company.activeCompany,
          values.login,
          values.password
        )
      );
      // if (result.login) {
      if (result.length) {
        setOpen(false);
      }
      await getFirstData();
    }
  });

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle mt={2}>{(company.activeCompany === "uzum") ?  "Добавить аккаунт Uzum" : "Добавить аккаунт KazanExpress"}</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Для того чтобы использовать систему изменения цен, необходимо добавить аккаунт указав
          логин и пароль. Вы можете создать отдельный аккаунт через раздел на KazanExpress
          Сотрудники
        </DialogContentText>
      </DialogContent>
      <form onSubmit={formik.handleSubmit}>
        <Stack mx={3} direction='row' gap={3} justifyContent={"space-between"}>
          <Box width={"100%"}>
            <CustomFormLabel>Логин</CustomFormLabel>
            <CustomTextField
              fullWidth
              id='login'
              name='login'
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
              type='password'
              value={formik.values.password}
              onChange={formik.handleChange}
              error={formik.touched.password && Boolean(formik.errors.password)}
              helperText={formik.touched.password && formik.errors.password}
            />
          </Box>
        </Stack>
        <Stack direction='row' px={3} pb={2} mb={2} mt={2} justifyContent={"flex-end"}>
          <AppButton tag="button">
            Добавить аккаунт
          </AppButton>
        </Stack>
      </form>
    </Dialog>
  );
};

export default CreateNewAccount;
