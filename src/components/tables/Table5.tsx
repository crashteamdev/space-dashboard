import React from "react";
import {
  Avatar,
  Typography,
  Box,
  Grid,
  CardContent,
  Divider,
  ListItemIcon,
  Tooltip,
  IconButton,
} from "@mui/material";
import BlankCard from "../ui/shared/BlankCard";
import { basicsTableData, AccountsType } from "./tableData";
import { Stack } from "@mui/system";
import { useRouter } from "next/navigation";
import { IconEdit, IconRefresh, IconTrash } from "@tabler/icons-react";
import styles from "./table.module.scss";
import { Edit, Delete, Refresh } from "@mui/icons-material";

const basics: AccountsType[] = basicsTableData;

const Table5 = () => {
  const router = useRouter();

  return (
    <Box display={"flex"} gap={"24px"} flexWrap={"wrap"}>
      {basics.map((item) => {
        return (
          <Grid
            style={{ cursor: "pointer" }}
            item
            sm={12}
            lg={12}
            key={item.id}
          >
            <BlankCard className="hoverCard">
              <CardContent>
                <Stack direction={"column"} gap={4} alignItems="center">
                  <Box padding={"6px 24px"} textAlign={"center"}>
                    <Typography variant="h5">{item.email}</Typography>
                  </Box>
                </Stack>
              </CardContent>
              <Divider />
              <Box
                p={2}
                py={1}
                textAlign={"center"}
                sx={{ backgroundColor: "grey.100" }}
              >
                <Box justifyContent={"space-between"} display="flex" gap={2}>
                  {/* Редактирование */}
                  <Tooltip title="Редактировать">
                    <IconButton color="primary">
                      <Edit />
                    </IconButton>
                  </Tooltip>
                  {/* Перезагрузка */}
                  <Tooltip title="Перезагрузить">
                    <IconButton color="info">
                      <Refresh />
                    </IconButton>
                  </Tooltip>
                  {/* Удаление */}
                  <Tooltip title="Удалить">
                    <IconButton color="error">
                      <Delete />
                    </IconButton>
                  </Tooltip>
                </Box>
              </Box>
            </BlankCard>
          </Grid>
        );
      })}
    </Box>
  );
};

export default Table5;
