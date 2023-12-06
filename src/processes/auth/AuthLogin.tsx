import React from "react";
import {
  Box,
  Typography,
  FormGroup,
  FormControlLabel,
  Button,
  Stack,
  Divider,
} from "@mui/material";
import Link from "next/link";
import { loginType } from "@/shared/types/auth/auth";
import CustomCheckbox from "@/components/ui/theme-elements/CustomCheckbox";
import CustomFormLabel from "@/components/ui/theme-elements/CustomFormLabel";
import CustomTextField from "@/components/ui/theme-elements/CustomTextField";
import AuthSocialButtons from "./AuthSocialButtons";
import { useFormik } from "formik";
import * as yup from "yup";
import { signInEmail } from "@/api/auth/email/email";
import { useRouter } from "next/navigation";
import { useDispatch } from "@/shared/store/hooks";
import { getAuth } from "firebase/auth";
import firebase_app from "@/shared/firebase/firebase";
import { useState } from "react";
import { IUser } from "@/shared/types/apps/user";
import { setUser } from "@/shared/store/slices/user/userSlice";
import { addItem } from "@/shared/store/slices/alerts/AlertsSlice";
import { v4 as uuidv4 } from "uuid";

const AuthLogin = ({ title, subtitle, subtext }: loginType) => {
  const router = useRouter();

  const [check, setCheck] = useState(false) as any;

  const dispatch = useDispatch();
  const auth = getAuth(firebase_app);

  const validationSchema = yup.object({
    email: yup
      .string()
      .email("Введите действительный адрес электронной почты")
      .required("Требуется электронная почта"),
    password: yup
      .string()
      .min(8, "Длина пароля должна быть минимум 8 символов.")
      .required("Необходим пароль"),
  });

  const signIn = async (email: string, password: string) => {
    const user = (await signInEmail(email, password)) as any;
    if (!user) {
      dispatch(addItem({title: "Не удалось войти в аккаунт", description: "Возможно такого аккаунта не существует", status: "error", timelife: 5000, id: uuidv4()}));
      return false;
    }

    if (user.email) {
      dispatch(addItem({title: "Вы успешно вошли в аккаунт", status: "success", timelife: 4000, id: uuidv4()}));
      router.push("/profile");
    }

    if (check) {
      localStorage.setItem("remember", "on");
      sessionStorage.setItem("remember", "on");
    } else {
      localStorage.setItem("remember", "off");
      sessionStorage.setItem("remember", "on");
    }

    if (auth.currentUser) {
      const { uid, accessToken, displayName, email, photoURL } =
        auth.currentUser as any;
      const user = {
        uid,
        accessToken,
        displayName,
        email,
        photoURL,
      } as IUser;

      dispatch(setUser(user));
    }
  };

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      signIn(values.email, values.password);
    },
  });

  return (
    <>
      {title ? (
        <Typography fontWeight="700" variant="h3" mb={1}>
          {title}
        </Typography>
      ) : null}

      {subtext}

      <AuthSocialButtons title="Войти через" />
      <Box mt={3}>
        <Divider>
          <Typography
            component="span"
            color="textSecondary"
            variant="h6"
            fontWeight="400"
            position="relative"
            px={2}
          >
            или войдите через
          </Typography>
        </Divider>
      </Box>

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
          <Box mb={3}>
            <CustomFormLabel>Пароль</CustomFormLabel>
            <CustomTextField
              fullWidth
              id="password"
              name="password"
              type="password"
              value={formik.values.password}
              onChange={formik.handleChange}
              error={formik.touched.password && Boolean(formik.errors.password)}
              helperText={formik.touched.password && formik.errors.password}
            />
          </Box>
        </Stack>
        <Stack
          justifyContent="space-between"
          direction="row"
          alignItems="center"
          mb={2}
        >
          <FormGroup>
            <FormControlLabel
              control={
                <CustomCheckbox
                  onChange={(value) => setCheck(value.currentTarget.value)}
                />
              }
              label="Запомнить это устройство"
            />
          </FormGroup>
          <Typography
            component={Link}
            href="/auth/forgot-password"
            fontWeight={500}
            sx={{
              textDecoration: "none",
              color: "primary.main",
            }}
          >
            Забыли пароль ?
          </Typography>
        </Stack>
        <Button color="primary" variant="contained" type="submit">
          Войти
        </Button>
      </form>
      {subtitle}
    </>
  );
};

export default AuthLogin;
