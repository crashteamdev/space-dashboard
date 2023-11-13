import { Box, Button, Stack } from "@mui/material";
import Link from "next/link";

import { useFormik } from "formik";
import * as yup from "yup";
import { useState } from "react";
import { validationEmail } from "@/hooks/validationEmail";
import CustomFormLabel from "@/components/ui/theme-elements/CustomFormLabel";
import CustomTextField from "@/components/ui/theme-elements/CustomTextField";
import { forgotPassword } from "@/api/auth/forgot/forgot";
import { useDispatch } from "@/shared/store/hooks";
import { addItem } from "@/shared/store/slices/alerts/AlertsSlice";
import { v4 as uuidv4 } from 'uuid';

type InputTypes = {
  value: string;
  error: string;
};

export default function AuthForgotPassword({ back, setIsSend } : any) {

  const validationSchema = yup.object({
    email: yup
      .string()
      .email("Введите действительный адрес электронной почты")
      .required("Требуется электронная почта"),
  });
  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values: any) => {
      forgot(values.email)
    },
  });

  const forgot = (value: string) => {
    forgotPassword(value);
    dispatch(addItem({title: 'Проверьте свою почту', description: 'Мы отправили вам ссылку для востановления пароля', status: 'info', timelife: 5000, id: uuidv4()}));
    setIsSend(true)
  };

  return (
    <>
      <Stack spacing={2}>
      <form onSubmit={formik.handleSubmit}>
        <Stack>
          <Box>
            <CustomFormLabel>Электронная почта</CustomFormLabel>
            <CustomTextField
              fullWidth
              id="email"
              name="email"
              value={formik.values.email}
              onChange={formik.handleChange}
              error={formik.touched.email && Boolean(formik.errors.email)}
              helperText={formik.touched.email && formik.errors.email}
            />
          </Box>
        </Stack>
        <Box mt={2} width={'100%'}>
        <Button color="primary" fullWidth variant="contained" type="submit">
          Забыли пароль
        </Button>
        </Box>
      </form>
        <Button
          color="primary"
          size="large"
          fullWidth
          onClick={() => back()}
        >
          Вернуться на страницу авторизации
        </Button>
      </Stack>
    </>
  );
}
