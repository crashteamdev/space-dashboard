import { Box, Button, Grid, Theme, Typography } from "@mui/material";
import React from "react";

const HeaderAccount = () => {
  return (
    <Grid
      container
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        backgroundColor: "secondary.light",
        borderRadius: (theme: Theme) => theme.shape.borderRadius / 4,
        p: "30px 25px 20px",
        marginBottom: "30px",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <Box>
        <Typography
          variant="h6"
          fontWeight={500}
          color="textPrimary"
          className="text-hover"
          noWrap
        >
          Аккаунт: test@mail.ru | Последний обход: 22.10.2023
        </Typography>
      </Box>

      <Box
        mt={2}
        sx={{
          display: "flex",
          gap: "20px",
        }}
      >
        <Button color="primary" variant="contained" type="submit">
          Изменить данные аккаунта
        </Button>
        <Button color="primary" variant="contained" type="submit">
          Обновить аккаунт
        </Button>
        <Button color="primary" variant="contained" type="submit">
          Запустить мониторинг
        </Button>
        <Button color="primary" variant="contained" type="submit">
          История изменения цен
        </Button>
      </Box>
    </Grid>
  );
};

export default HeaderAccount;
