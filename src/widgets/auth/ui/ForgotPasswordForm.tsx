"use client";

import React from "react";
import { useState } from "react";
import { Box, Link, Stack, Typography } from "@mui/material";
import { v4 as uuidv4 } from "uuid";
import { addItem } from "@/shared/store/slices/alerts/AlertsSlice";
import { useDispatch } from "@/shared/store/hooks";
import { useFormik } from "formik";
import { forgotPassword } from "@/api/auth/forgot/forgot";
import { forgotPasswordValidationSchema } from "../model/validateSchema";
import CustomFormLabel from "@/components/ui/theme-elements/CustomFormLabel";
import CustomTextField from "@/components/ui/theme-elements/CustomTextField";

export const ForgotPasswordForm = () => {

    const [isSend, setIsSend] = useState(false);
    const dispatch = useDispatch();
    const formik = useFormik({
        initialValues: {
            email: ""
        },
        validationSchema: forgotPasswordValidationSchema,
        onSubmit: (values: any) => {
            forgot(values.email);
        }
    });
    
    const forgot = async (value: string) => {
        try {
            await forgotPassword(value);
            setIsSend(true);
            dispatch(
                addItem({
                    title: "Успешно!",
                    description: "Ссылка восстановления отправлена на указанную почту",
                    status: "success",
                    timelife: 4000,
                    id: uuidv4()
                })
            );
        } catch (error: any) {
            dispatch(
                addItem({
                    title: "Не удалось восстановить пароль",
                    description: error.message,
                    status: "error",
                    timelife: 5000,
                    id: uuidv4()
                })
            );
        }
    };
    
    return (
        <div className="w-full">
            {isSend ? (
                <div className="text-center text-white text-base font-semibold">Ссылка отправлена на вашу почту!<br /> Не забудь проверить СПАМ.</div>
            ) : (
                <Stack spacing={2}>
                    <form onSubmit={formik.handleSubmit}>
                    <Stack mb={3}>
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
                    </Stack>
                    <button className="w-full text-black bg-white rounded-lg p-3 text-[#000]" type='submit'>
                        Восстановить пароль
                    </button>
                    </form>
                </Stack>
            )}
            <Stack direction='row' spacing={1} justifyContent='center' mt={3}>
            <Typography
                    component={Link}
                    href='/auth/login'
                    fontWeight='500'
                    sx={{
                        textDecoration: "none",
                        color: "primary.main"
                    }}
                >
                    Назад
                </Typography>
            </Stack>
        </div>
    );
};