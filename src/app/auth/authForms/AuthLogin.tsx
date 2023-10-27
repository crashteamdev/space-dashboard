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
import { loginType } from "@/app/(DashboardLayout)/types/auth/auth";
import CustomCheckbox from "@/app/(DashboardLayout)/components/forms/theme-elements/CustomCheckbox";
import CustomTextField from "@/app/(DashboardLayout)/components/forms/theme-elements/CustomTextField";
import CustomFormLabel from "@/app/(DashboardLayout)/components/forms/theme-elements/CustomFormLabel";
import AuthSocialButtons from "./AuthSocialButtons";
import { useFormik } from "formik";
import * as yup from "yup";
import { signInEmail } from "@/app/api/auth/email/email";
import { useRouter } from "next/navigation";
import { useDispatch } from "@/store/hooks";
import { getAuth } from "firebase/auth";
import firebase_app from "@/firebase/firebase";
import { useState } from "react";
import { IUser } from "@/app/(DashboardLayout)/types/apps/user";
import { setUser } from "@/store/user/userSlice";

const AuthLogin = ({ title, subtitle, subtext }: loginType) => {
  const router = useRouter();

  const [check, setCheck] = useState(false) as any;

  const dispatch = useDispatch();
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

  const signIn = async (email: string, password: string) => {
    const user = (await signInEmail(email, password)) as any;

    if (user.email) {
      router.push("/");
    }
    
    if (check) {
      localStorage.setItem('remember', 'on')
    } else {
      localStorage.setItem('remember', 'off')
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

      <AuthSocialButtons title="Sign in with" />
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
            or sign in with
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
              label="Remeber this Device"
            />
          </FormGroup>
          <Typography
            component={Link}
            href="/auth/forgot-password"
            fontWeight={600}
            sx={{
              textDecoration: "none",
              color: "primary.main",
            }}
          >
            Forgot Password ?
          </Typography>
        </Stack>
        <Button color="primary" variant="contained" type="submit">
          Sign In
        </Button>
      </form>
      {subtitle}
    </>
  );
};

export default AuthLogin;
