import React from "react";
import {
    Box,
    Stack,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogContentText,
    Typography
} from "@mui/material";
import CustomTextField from "../ui/theme-elements/CustomTextField";
import CustomFormLabel from "../ui/theme-elements/CustomFormLabel";
import ShieldIcon from '@mui/icons-material/Shield';
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
  const companyText = company?.activeCompany === "uzum" ? "Uzum" : "Магнит Маркет";

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle mt={2}>Добавить аккаунт {companyText}</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Необходимо добавить аккаунт указав логин и пароль.
          Вы можете создать отдельный аккаунт в личном кабинете {companyText} в разделе Сотрудники.
        </DialogContentText>
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
        <Box
            mt={2}
            p={2}
            style={{
                backgroundColor: 'rgba(55, 164, 88, 0.5)',
                borderRadius: '8px',
                border: '1px solid rgba(0, 128, 0, 0.5)',
                display: 'flex',
                alignItems: 'center' }}
        >
            <Stack direction="row" alignItems="center" spacing={1}>
                <ShieldIcon />
                <Typography>
                    Мы не храним ваш логин и пароль, все данные зашифрованы.
                </Typography>
            </Stack>
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default CreateNewAccount;
