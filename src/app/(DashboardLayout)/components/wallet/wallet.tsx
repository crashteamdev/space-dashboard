"use client";

import { Box, Stack, Typography, Button } from "@mui/material";
import * as React from "react";

const Wallet = () => {
  const [value, setValue] = React.useState("1");

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  return (
    <Box bgcolor={"info.light"} mt={4} p={2}>
      <Typography variant="h6" fontWeight={400} mb={1}>
        Balance:
      </Typography>
      <Stack direction="row" spacing={2} justifyContent="space-between">
        <Typography variant="h4">$98,260</Typography>
      </Stack>
      <Box mt={2}>
        <Button color="primary" variant="contained" fullWidth type="submit">
            Пополнить баланс
        </Button>
      </Box>
    </Box>
  );
};
export default Wallet;
