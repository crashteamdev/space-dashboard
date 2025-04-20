"use client";

import React from "react";
import { useState } from "react";
import { addItem } from "@/shared/store/slices/alerts/AlertsSlice";
import { useDispatch } from "@/shared/store/hooks";
import { v4 as uuidv4 } from "uuid";
import { Typography, Stack, Button, Box } from "@mui/material";
import Link from "next/link";
import * as yup from "yup";
import { useFormik } from "formik";
import { registrationEmail } from "@/api/auth/registrationEmail/registrationEmail";
import CustomFormLabel from "@/components/ui/theme-elements/CustomFormLabel";
import CustomTextField from "@/components/ui/theme-elements/CustomTextField";
import AuthSocialButtons from "@/processes/auth/AuthSocialButtons";

export const RegisterForm = () => {

    const [isCreated, setIsCreated] = useState<boolean>(false);
    const dispatch = useDispatch();

    const validationSchema = yup.object({
      email: yup
        .string()
        .email("Введите действительный адрес электронной почты")
        .required("Требуется электронная почта"),
      password: yup
        .string()
        .min(8, "Длина пароля должна быть минимум 8 символов.")
        .required("Необходим пароль")
    });

    const signUp = async (email: string, password: string, displayName: string) => {
      const user = await registrationEmail(email, password, displayName);
      console.log(user);
      if (!user) {
        dispatch(
          addItem({
            title: "Не удалось создать аккаунт",
            description: "Возможно такой аккаунт уже существует",
            status: "error",
            timelife: 6000,
            id: uuidv4()
          })
        );
        return false;
      } else {
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
      }
    };

    const formik = useFormik({
      initialValues: {
        displayName: "",
        email: "",
        password: "",
        confirmPassword: ""
      },
      validationSchema: validationSchema,
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
          <Box mb={3}>
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
      </form>
    );
};