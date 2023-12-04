import ProductTableEditConcurentsTable from "@/components/productTableEditConcurentsTable/productTableEditConcurentsTable";
import CustomFormLabel from "@/components/ui/theme-elements/CustomFormLabel";
import CustomTextField from "@/components/ui/theme-elements/CustomTextField";
import { Box, Button, DialogContentText, DialogTitle, Stack, Typography } from "@mui/material";
import { useFormik } from "formik";
import * as yup from "yup";
import React from "react";
import ProductTableConcurentsAdds from "../../productTableConcurentsAdds/productTableConcurentsAdds";
import { useDispatch, useSelector } from "@/shared/store/hooks";
import { addComcurentItem } from "@/shared/store/slices/reprice/repriceSlice";
import { AppState } from "@/shared/store/store";
import { getAuth } from "firebase/auth";
import firebase_app from "@/shared/firebase/firebase";
import { useParams } from "next/navigation";

const ConcurentsBlock = () => {
  const validationSchema = yup.object({
    url: yup.string().required("Минимально значение не заполнено"),
    competitorProductId: yup.string().required("Максимальное значение не заполнено"),
    competitorSkuId: yup.string().required("Допустимая скидка не заполнена")
  });

  const { accountId, shopId } = useParams() as any;
  const company = useSelector((state: AppState) => state.companyChanger) as any;
  const repricer = useSelector((state: AppState) => state.repriceReducer) as any;

  const auth = getAuth(firebase_app) as any;
  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: {
      url: "",
      competitorProductId: 0,
      competitorSkuId: 0
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      console.log(values);
      dispatch(
        addComcurentItem(auth.currentUser.accessToken, company.activeCompany, accountId, {
          shopItemRef: {
            shopId: shopId,
            shopItemId: repricer.currentItem
          },
          url: values.url,
          competitorProductId: values.competitorProductId,
          competitorSkuId: values.competitorSkuId
        })
      );
    }
  });

  return (
    <>
      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <Box>
          <DialogTitle mt={2}>Подробнее о товаре</DialogTitle>
          <DialogContentText mx={3}>Добавить конкурента для отслеживания</DialogContentText>
        </Box>
      </Box>
      <form onSubmit={formik.handleSubmit}>
        <Stack mx={3} direction='row' gap={3} justifyContent={"space-between"}>
          <Box width={"100%"}>
            <CustomFormLabel>Ссылка на товар</CustomFormLabel>
            <CustomTextField
              fullWidth
              id='url'
              type='text'
              name='url'
              value={formik.values.url}
              onChange={formik.handleChange}
              error={formik.touched.url && Boolean(formik.errors.url)}
              helperText={formik.touched.url && formik.errors.url}
            />
          </Box>
        </Stack>
        <Box display={"flex"} position={"relative"} mt={4} justifyContent={"center"}>
          <div></div>
          <Typography
            sx={{ backgroundColor: "background.default" }}
            color='textSecondary'
            variant='subtitle2'
          >
            Или
          </Typography>
        </Box>
        <Stack mx={3} direction='column' gap={1} justifyContent={"space-between"}>
          <Box width={"100%"}>
            <CustomFormLabel>PRODUCT ID</CustomFormLabel>
            <CustomTextField
              fullWidth
              id='competitorProductId'
              type='number'
              name='competitorProductId'
              value={formik.values.competitorProductId}
              onChange={formik.handleChange}
              error={
                formik.touched.competitorProductId && Boolean(formik.errors.competitorProductId)
              }
              helperText={formik.touched.competitorProductId && formik.errors.competitorProductId}
            />
          </Box>
          <Box width={"100%"}>
            <CustomFormLabel>SKU ID</CustomFormLabel>
            <CustomTextField
              fullWidth
              id='competitorSkuId'
              type='number'
              name='competitorSkuId'
              value={formik.values.competitorSkuId}
              onChange={formik.handleChange}
              error={formik.touched.competitorSkuId && Boolean(formik.errors.competitorSkuId)}
              helperText={formik.touched.competitorSkuId && formik.errors.competitorSkuId}
            />
          </Box>
        </Stack>
        <Stack direction='row' px={3} pb={2} mb={2} mt={2} justifyContent={"flex-end"}>
          <Button variant='contained' color='primary' type='submit'>
            Добавить
          </Button>
        </Stack>
        <Box display={"flex"} position={"relative"} mt={2} justifyContent={"flex-start"}>
          <div></div>
          <Typography
            ml={5}
            sx={{ backgroundColor: "background.default" }}
            color='textSecondary'
            variant='h5'
          >
            Добавленные конкуренты на товар
          </Typography>
        </Box>
        <Box mx={3} mt={3}>
          <ProductTableConcurentsAdds />
        </Box>
        <Box display={"flex"} position={"relative"} mt={6} justifyContent={"flex-start"}>
          <div></div>
          <Typography
            ml={5}
            sx={{ backgroundColor: "background.default" }}
            color='textSecondary'
            variant='h5'
          >
            Возможные конкуренты
          </Typography>
        </Box>
        <Box mx={3} mt={4}>
          <ProductTableEditConcurentsTable />
        </Box>
      </form>
    </>
  );
};

export default ConcurentsBlock;
