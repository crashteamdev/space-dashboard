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
  Tooltip
} from "@mui/material";
import { useSelector } from "@/shared/store/hooks";
import { useParams } from "next/navigation";
import { AppState } from "@/shared/store/store";
import { getAuth } from "firebase/auth";
import firebase_app from "@/shared/firebase/firebase";
import {
  deleteConcurentItem,
} from "@/shared/store/slices/reprice/repriceSlice";
import BlankCard from "@/components/ui/shared/BlankCard";
import { IconTrash } from "@tabler/icons-react";
import { AppButton } from "@/shared/components/AppButton";
import { useDispatch as useReduxDispatch } from "react-redux";

const ProductTableConcurentsAdds = ({getComp, dataConc } : any) => {
  const { accountId } = useParams() as any;
  const dispatch = useReduxDispatch();

  const company = useSelector((state: AppState) => state.companyChanger) as any;
  const repricer = useSelector((state: AppState) => state.repriceReducer) as any;

  const auth = getAuth(firebase_app) as any;

  const deleteNewItem = async (row: any) => {
    await dispatch(
      deleteConcurentItem(auth.currentUser.accessToken, company.activeCompany, accountId, {
        shopItemId: repricer.currentItem,
        competitorId: row.id
      })
    );
    console.log("3");
    await getComp();
  };

  const AppBarStyled = styled(Typography)(({ theme }) => ({
    color: theme.palette.text.primary,
    maxWidth: "220px",
    overflow: "hidden",
    textOverflow: "ellipsis"
  })) as any;

  useEffect(() => {
    getComp();
    
    console.log("5");
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
            {dataConc?.map((row: any) => (
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
                    <div>
                      <AppButton className="!bg-[#b91c1c]" tag="button" onClick={() => deleteNewItem(row)}>
                        <IconTrash />
                      </AppButton>
                    </div>
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
