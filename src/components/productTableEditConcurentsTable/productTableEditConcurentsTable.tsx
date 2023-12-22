import React, { useEffect } from "react";
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
  Tooltip,
  Button
} from "@mui/material";
import BlankCard from "../ui/shared/BlankCard";
import { useDispatch, useSelector } from "@/shared/store/hooks";
import { useParams } from "next/navigation";
import { AppState } from "@/shared/store/store";
import { getAuth } from "firebase/auth";
import firebase_app from "@/shared/firebase/firebase";
import {
  addComcurentItem,
} from "@/shared/store/slices/reprice/repriceSlice";
import { IconPlus } from "@tabler/icons-react";

const ProductTableEditConcurentsTable = ({ getItem, getItems, dataAdds, getComp } : any) => {
  const { accountId, shopId } = useParams() as any;
  const dispatch = useDispatch();

  const company = useSelector((state: AppState) => state.companyChanger) as any;
  const repricer = useSelector((state: AppState) => state.repriceReducer) as any;

  const auth = getAuth(firebase_app) as any;

  const addNewItem = async (row: any) => {
    await dispatch(
      addComcurentItem(auth.currentUser.accessToken, company.activeCompany, accountId, {
        shopItemRef: {
          shopId: shopId,
          shopItemId: repricer.currentItem
        },
        competitorProductId: row.productId,
        competitorSkuId: row.skuId
      })
    );
    await getItems();
    await getComp();
    await getItem();
  };

  const AppBarStyled = styled(Typography)(({ theme }) => ({
    color: theme.palette.text.primary,
    maxWidth: "420px",
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
                <Typography variant='h6'>...</Typography>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {dataAdds?.map((row: any) => (
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
                  <Tooltip title='Добавить конкурента'>
                    <Button
                      onClick={() => addNewItem(row)}
                      color='primary'
                      variant='contained'
                      type='submit'
                    >
                      <IconPlus />
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

export default ProductTableEditConcurentsTable;
