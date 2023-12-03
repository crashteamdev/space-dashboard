import React, { useEffect, useState } from "react";
import {
  TableContainer,
  Table,
  TableRow,
  TableCell,
  TableBody,
  Avatar,
  Typography,
  TableHead,
  styled,
  Button,
  Tooltip
} from "@mui/material";
import { useDispatch, useSelector } from "@/shared/store/hooks";
import { useParams } from "next/navigation";
import { AppState } from "@/shared/store/store";
import { getAuth } from "firebase/auth";
import firebase_app from "@/shared/firebase/firebase";
import { deleteConcurentItem, getCompetitiveProductsAdds } from "@/shared/store/slices/reprice/repriceSlice";
import BlankCard from "@/components/ui/shared/BlankCard";
import { IconTrash } from "@tabler/icons-react";

const ProductTableConcurentsAdds = () => {
  const { accountId, shopId } = useParams() as any;
  const [data, setData] = useState([]) as any;
  const dispatch = useDispatch();

  const company = useSelector((state: AppState) => state.companyChanger) as any;
  const repricer = useSelector((state: AppState) => state.repriceReducer) as any;

  const auth = getAuth(firebase_app) as any;

  const getItems = async () => {
    const result = await dispatch(
      getCompetitiveProductsAdds(
        auth.currentUser.accessToken,
        company.activeCompany,
        accountId,
        shopId,
        repricer.currentItem
      )
    );
    await setData(result);
  };

  const deleteNewItem = async (row: any) => {
    await dispatch(
      deleteConcurentItem(
        auth.currentUser.accessToken,
        company.activeCompany,
        accountId,
        {
          shopItemId: repricer.currentItem,
          competitorId: row.id,
        }
      )
    );
    await getItems()
  };

  const AppBarStyled = styled(Typography)(({ theme }) => ({
    color: theme.palette.text.primary,
    maxWidth: "220px",
    overflow: "hidden",
    textOverflow: "ellipsis"
  })) as any;

  useEffect(() => {
    getItems();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <BlankCard>
      <TableContainer>
        <Table
          aria-label='simple table'
          sx={{
            whiteSpace: "nowrap"
          }}
        >
          <TableHead>
            <TableRow>
              <TableCell>
                <Typography variant='h6'>Фото</Typography>
              </TableCell>
              <TableCell>
                <Typography variant='h6'>Название</Typography>
              </TableCell>
              <TableCell>
                <Typography variant='h6'>ProductId</Typography>
              </TableCell>
              <TableCell>
                <Typography variant='h6'>Skuid</Typography>
              </TableCell>
              <TableCell>
                <Typography variant='h6'>...</Typography>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data?.map((row: any) => (
              <TableRow key={row.id}>
                <TableCell>
                  <Avatar
                    src={`https://image.kazanexpress.ru/${row.photoKey}/t_product_high.jpg`}
                    alt={row.photoKey}
                    sx={{ width: "40px !important", height: "40px !important" }}
                  />
                </TableCell>
                <TableCell>
                  <AppBarStyled color='textSecondary' variant='h6' fontWeight={400}>
                    {row.name}
                  </AppBarStyled>
                </TableCell>
                <TableCell>
                  <AppBarStyled color='textSecondary' variant='h6' fontWeight={400}>
                    {row.productId}
                  </AppBarStyled>
                </TableCell>
                <TableCell>
                  <AppBarStyled color='textSecondary' variant='h6' fontWeight={400}>
                    {row.skuId}
                  </AppBarStyled>
                </TableCell>
                <TableCell>
                  <Tooltip title='Удалить конкурента из таблицы'>
                    <Button onClick={() => deleteNewItem(row)} color='primary' variant='contained'>
                      <IconTrash />
                    </Button>
                  </Tooltip>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </BlankCard>
  );
};

export default ProductTableConcurentsAdds;
