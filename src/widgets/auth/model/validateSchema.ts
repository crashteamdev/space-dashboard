import * as yup from "yup";

export const regFormValidateSchema = yup.object({
    email: yup
        .string()
        .email("Введите действительный адрес электронной почты")
        .required("Почта обязательна!"),
    password: yup
        .string()
        .min(8, "Длина пароля должна быть минимум 8 символов.")
        .required("Необходим пароль"),
    confirmPassword: yup
        .string()
        .oneOf([yup.ref("password")], "Пароли должны совпадать")
        .required("Подтвердите пароль")
});

export const loginFormValidateSchema = yup.object({
    email: yup
        .string()
        .email("Введите действительный адрес электронной почты")
        .required("Требуется электронная почта"),
    password: yup
        .string()
        .min(8, "Длина пароля должна быть минимум 8 символов.")
        .required("Необходим пароль")
});