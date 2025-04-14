"use client";

import React from "react";
import {
    Box,
    Typography,
    FormGroup,
    FormControlLabel,
    Stack,
} from "@mui/material";
import Link from "next/link";
import CustomCheckbox from "@/components/ui/theme-elements/CustomCheckbox";
import CustomFormLabel from "@/components/ui/theme-elements/CustomFormLabel";
import CustomTextField from "@/components/ui/theme-elements/CustomTextField";
import { useFormik } from "formik";
import * as yup from "yup";
import { signInEmail } from "@/api/auth/email/email";
import { useRouter } from "next/navigation";
import { useDispatch } from "@/shared/store/hooks";
import { auth } from "@/shared/firebase/firebase";
import { useState } from "react";
import { setUser } from "@/shared/store/slices/user/userSlice";
import { addItem } from "@/shared/store/slices/alerts/AlertsSlice";
import { v4 as uuidv4 } from "uuid";
import { IUser } from "@/shared/types";
import AuthSocialButtons from "@/processes/auth/AuthSocialButtons";

export const AuthForm = () => {
    const router = useRouter();
    const [checked, setChecked] = useState(false) as any;
    
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
    
    const signIn = async (email: string, password: string) => {
        const user = (await signInEmail(email, password)) as any;
        if (!user) {
            dispatch(
                addItem({
                    title: "Не удалось войти в аккаунт",
                    description: "Возможно такого аккаунта не существует",
                    status: "error",
                    timelife: 5000,
                    id: uuidv4()
                })
            );
    
          return false;
        }
    
        if (user.email) {
          dispatch(
            addItem({
              title: "Вы успешно вошли в аккаунт",
              status: "success",
              timelife: 4000,
              id: uuidv4()
            })
          );
          router.push("/profile");
        }
    
        if (checked) {
          localStorage.setItem("remember", "on");
          sessionStorage.setItem("remember", "on");
        } else {
          localStorage.setItem("remember", "off");
          sessionStorage.setItem("remember", "on");
        }
    
        if (auth.currentUser) {
          const { uid, accessToken, displayName, email, photoURL } = auth.currentUser as any;
          const user = {
            uid,
            accessToken,
            displayName,
            email,
            photoURL
          } as IUser;
    
          dispatch(setUser(user));
        }
    };
    
    const formik = useFormik({
        initialValues: {
            email: "",
            password: ""
        },
        validationSchema: validationSchema,
        onSubmit: async (values) => {
            await signIn(values.email, values.password);
        }
    });
    
    return (
        <>
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
                    <Box mb={3}>
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
                <Stack justifyContent='space-between' direction='row' alignItems='center' mb={2}>
                    <FormGroup>
                        <FormControlLabel
                            control={<CustomCheckbox onChange={(value) => setChecked(value.currentTarget.value)} />}
                            label='Запомнить?'
                        />
                    </FormGroup>
                    <Typography
                        component={Link}
                        href='/auth/forgot-password'
                        fontWeight={500}
                        sx={{
                            textDecoration: "none",
                            color: "primary.main"
                        }}
                    >
                        Забыли пароль ?
                    </Typography>
                </Stack>
                <button className="w-full text-black bg-white rounded-lg p-3 text-[#000]" type='submit'>
                    Войти
                </button>
            </form>
            <AuthSocialButtons title='Войти c помощью Google' />
            <Stack direction='row' spacing={1} justifyContent='center' mt={3}>
                <Typography variant='h6' fontWeight='500'>
                    Нет аккаунта?
                </Typography>
                <Typography
                    component={Link}
                    href='/auth/register'
                    fontWeight='500'
                    sx={{
                        textDecoration: "none",
                        color: "primary.main"
                    }}
                >
                    Создать аккаунт
                </Typography>
            </Stack>
        </>
    );
};