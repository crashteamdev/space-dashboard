"use client";

import React from "react";
import AuthForgotPassword from "@/processes/auth/AuthForgotPassword";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Box, Typography, Button } from "@mui/material";

export const ForgotPasswordForm = () => {
    const [isSend, setIsSend] = useState(false);
    const router = useRouter();

    const back = () => {
        router.back();
    };
    
    return (
        <>
            <Typography
                color='textSecondary'
                textAlign='center'
                variant='subtitle2'
                fontWeight='400'
            >
            {isSend
                ? "На ваш адрес электронной почты, отправлена ссылка для восстановления пароля!"
                : "Пожалуйста, введите адрес электронной почты, связанный с вашей учетной записью, и мы вышлем вам ссылку для сброса пароля."}
            </Typography>
            {isSend ? (
                <></>
                // <Box mt={2}>
                //     <Button color='primary' size='large' fullWidth onClick={() => back()}>
                //         Вернуться на страницу авторизации
                //     </Button>
                // </Box>
            ) : (
                <AuthForgotPassword back={back} setIsSend={setIsSend} />
            )}
        </>
    );
};