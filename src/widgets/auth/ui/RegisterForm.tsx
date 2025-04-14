"use client";

import React from "react";
import AuthRegister from "@/processes/auth/AuthRegister";
import { useState } from "react";
import { addItem } from "@/shared/store/slices/alerts/AlertsSlice";
import { useDispatch } from "@/shared/store/hooks";
import { v4 as uuidv4 } from "uuid";
import { Typography, Stack, Button } from "@mui/material";
import Link from "next/link";

export const RegisterForm = () => {

    const [isCreated, setIsCreated] = useState<boolean>(false);
    const dispatch = useDispatch();

    const setState: () => void = () => {
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
    };

    return (
        <>
            {isCreated ? (
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
            ) : (
              <AuthRegister
                setIsCreated={setState}
                subtext={
                  <Typography variant='subtitle1' textAlign='center' color='textSecondary' mb={1}>
                    Аналитика маркетплейсов
                  </Typography>
                }
                subtitle={
                  <Stack direction='row' spacing={1} mt={3}>
                    <Typography color='textSecondary' variant='h6' fontWeight='400'>
                      У вас уже есть учетная запись?
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
                      Войти
                    </Typography>
                  </Stack>
                }
              />
            )}
        </>
    );
};