import { Button, Stack } from "@mui/material";
import Link from "next/link";

import { useState } from "react";
import { validationEmail } from "@/hooks/validationEmail";
import CustomFormLabel from "@/components/ui/theme-elements/CustomFormLabel";
import CustomTextField from "@/components/ui/theme-elements/CustomTextField";
import { forgotPassword } from "@/api/auth/forgot/forgot";

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
    forgotPassword(email.value);
  };

  return (
    <>
      <Stack spacing={2}>
        <CustomFormLabel htmlFor="reset-email">
          Электронная почта
        </CustomFormLabel>
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
        >
          Забыли пароль
        </Button>
        <Button
          color="primary"
          size="large"
          fullWidth
          component={Link}
          href="/auth/login"
        >
          Вернуться на страницу авторизации
        </Button>
      </Stack>
    </>
  );
}
