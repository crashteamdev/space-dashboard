import { Box, Typography, Button, Stack, Divider } from "@mui/material";
import CustomTextField from "@/app/(DashboardLayout)/components/forms/theme-elements/CustomTextField";
import CustomFormLabel from "@/app/(DashboardLayout)/components/forms/theme-elements/CustomFormLabel";
import { registerType } from "@/app/(DashboardLayout)/types/auth/auth";
import { registrationEmail } from "@/app/api/auth/registrationEmail/registrationEmail";
import { useFormik } from "formik";
import * as yup from "yup";
import { useRouter } from "next/navigation";
import { getAuth } from "firebase/auth";
import firebase_app from "@/firebase/firebase";
import AuthSocialButtons from "./AuthSocialButtons";

const AuthRegister = ({ title, subtitle, subtext }: registerType) => {
  const router = useRouter();

  const auth = getAuth(firebase_app);

  const validationSchema = yup.object({
    email: yup
      .string()
      .email("Enter a valid email")
      .required("Email is required"),
    password: yup
      .string()
      .min(8, "Password should be of minimum 8 characters length")
      .required("Password is required"),
  });

  const signUp = async (email: string, password: string) => {
    const user = (await registrationEmail(auth, email, password)) as any;

    if (user?.email) {
      router.push("/auth/login");
    }
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
      <AuthSocialButtons title="Sign up with" />

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
            or sign up with
          </Typography>
        </Divider>
      </Box>

      <form onSubmit={formik.handleSubmit}>
        <Stack>
          <Box>
            <CustomFormLabel>Email Address</CustomFormLabel>
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
            <CustomFormLabel>Password</CustomFormLabel>
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
          Sign Up
        </Button>
      </form>
      {subtitle}
    </>
  );
};

export default AuthRegister;
