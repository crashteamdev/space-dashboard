"use client";

import React from "react";
import { useState } from "react";
import { addItem } from "@/shared/store/slices/alerts/AlertsSlice";
import { useDispatch } from "@/shared/store/hooks";
import { v4 as uuidv4 } from "uuid";
import { Typography, Stack, Button, Box } from "@mui/material";
import Link from "next/link";
import { useFormik } from "formik";
import { registrationEmail } from "@/api/auth/registrationEmail/registrationEmail";
import CustomFormLabel from "@/components/ui/theme-elements/CustomFormLabel";
import CustomTextField from "@/components/ui/theme-elements/CustomTextField";
import AuthSocialButtons from "@/processes/auth/AuthSocialButtons";
import { regFormValidateSchema } from "../model/validateSchema";
import { useRouter } from "next/navigation";

export const RegisterForm = () => {

    const router = useRouter();
    const [isCreated, setIsCreated] = useState<boolean>(false);
    const dispatch = useDispatch();

    const signUp = async (email: string, password: string, displayName: string) => {
      try {
        await registrationEmail(email, password, displayName);
        setIsCreated(!isCreated);
        dispatch(
          addItem({
            title: "Аккаунт создан",
            description: "Теперь вы можете зайти в личный кабинет",
            status: "success",
            timelife: 3000,
            id: uuidv4()
          })
        );
        router.push("/profile");
      } catch (error: any) {
        dispatch(
          addItem({
            title: "Не удалось создать аккаунт",
            description: error.message,
            status: "error",
            timelife: 6000,
            id: uuidv4()
          })
        );
      }
    };

    const formik = useFormik({
      initialValues: {
        displayName: "",
        email: "",
        password: "",
        confirmPassword: ""
      },
      validationSchema: regFormValidateSchema,
      onSubmit: (values) => {
        signUp(values.email, values.password, values.displayName);
      }
    });

    if(isCreated) {
      return (
        <>
          <Typography variant='h6' fontWeight='500' mb={2}>
            Вы успешно зарегистрировались!
          </Typography>
          <Button
            component={Link}
            color='primary'
            fullWidth
            variant='contained'
            href={"/auth/login"}
            type='submit'
          >
            Перейти к авторизации
          </Button>
        </>
      );
    }

    return (
      <form className="w-full" onSubmit={formik.handleSubmit}>
        <Stack>
          <Box>
            <CustomFormLabel>Имя</CustomFormLabel>
            <CustomTextField
              fullWidth
              id='displayName'
              name='displayName'
              value={formik.values.displayName}
              onChange={formik.handleChange}
              error={formik.touched.displayName && Boolean(formik.errors.displayName)}
              helperText={formik.touched.displayName && formik.errors.displayName}
            />
          </Box>
          <Box>
            <CustomFormLabel>Электронная почта</CustomFormLabel>
            <CustomTextField
              fullWidth
              id='email'
              name='email'
              value={formik.values.email}
              onChange={formik.handleChange}
              error={formik.touched.email && Boolean(formik.errors.email)}
              helperText={formik.touched.email && formik.errors.email}
            />
          </Box>
          <Box>
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
          <Box mb={4}>
            <CustomFormLabel>Повторите пароль</CustomFormLabel>
            <CustomTextField
              fullWidth
              id='confirmPassword'
              name='confirmPassword'
              type='password'
              value={formik.values.confirmPassword}
              onChange={formik.handleChange}
              error={formik.touched.confirmPassword && Boolean(formik.errors.confirmPassword)}
              helperText={formik.touched.confirmPassword && formik.errors.confirmPassword}
            />
          </Box>
        </Stack>
        <button className="w-full text-black bg-white rounded-lg p-3 text-[#000]" type='submit'>
          Зарегистрироваться
        </button>
        <AuthSocialButtons title='Зарегистрироваться через Google' />
        <Stack direction='row' spacing={1} justifyContent='center' mt={3}>
          <Typography variant='h6' fontWeight='500'>
            Есть аккаунт?
          </Typography>
          <Typography
            component={Link}
            href='/auth/login'
            fontWeight='500'
            sx={{
                textDecoration: "none",
                color: "primary.main"
            }}
          >
            Создать аккаунт
          </Typography>
        </Stack>
      </form>
    );
};