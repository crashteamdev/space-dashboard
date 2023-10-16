import { Button, Stack } from "@mui/material";
import Link from "next/link";

import CustomTextField from "@/app/(DashboardLayout)/components/forms/theme-elements/CustomTextField";
import CustomFormLabel from "@/app/(DashboardLayout)/components/forms/theme-elements/CustomFormLabel";
import { useState } from "react";
import { validationEmail } from "@/hooks/validationEmail";
import { forgotPassword } from "@/app/api/auth/forgot/forgot";

type InputTypes = {
  value: string;
  error: string;
};

export default function AuthForgotPassword() {
  const [email, setEmail] = useState<InputTypes>({
    value: "",
    error: "",
  });

  const forgot = () => {
    
    forgotPassword(email.value)
  }

  return (
    <>
      <Stack mt={4} spacing={2}>
        <CustomFormLabel htmlFor="reset-email">Email Adddress</CustomFormLabel>
        <CustomTextField
          error={!!email.error}
          helperText={email.error}
          value={email.value}
          onChange={(event: any) =>
            setEmail(validationEmail(event.currentTarget.value))
          }
          id="reset-email"
          variant="outlined"
          fullWidth
        />

        <Button
          color="primary"
          variant="contained"
          size="large"
          fullWidth
          onClick={forgot}
          // component={Link}
          // href="/"
        >
          Forgot Password
        </Button>
        <Button
          color="primary"
          size="large"
          fullWidth
          component={Link}
          href="/auth/auth2/login"
        >
          Back to Login
        </Button>
      </Stack>
    </>
  );
}
