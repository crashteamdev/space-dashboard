import { Box, Typography, Button, Stack, Divider } from "@mui/material";
import CustomTextField from "@/components/ui/theme-elements/CustomTextField";
import CustomFormLabel from "@/components/ui/theme-elements/CustomFormLabel";
import { registerType } from "@/shared/types/auth/auth";
import { registrationEmail } from "@/api/auth/registrationEmail/registrationEmail";
import { useFormik } from "formik";
import * as yup from "yup";
import { useRouter } from "next/navigation";
import { getAuth } from "firebase/auth";
import firebase_app from "@/shared/firebase/firebase";
import AuthSocialButtons from "./AuthSocialButtons";

const AuthRegister = ({ title, subtitle, subtext }: registerType) => {
  const router = useRouter();

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

  const signUp = async (email: string, password: string) => {
    const user = (await registrationEmail(auth, email, password)) as any;

    router.push("/auth/login");
  };

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      signUp(values.email, values.password);
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
            или зарегистрируйтесь через
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
        <Button color="primary" variant="contained" type="submit">
          Зарегистрироваться
        </Button>
      </form>
      {subtitle}
    </>
  );
};

export default AuthRegister;
