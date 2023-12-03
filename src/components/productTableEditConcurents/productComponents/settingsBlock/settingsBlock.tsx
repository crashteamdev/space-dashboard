import CustomFormLabel from "@/components/ui/theme-elements/CustomFormLabel";
import CustomTextField from "@/components/ui/theme-elements/CustomTextField";
import {
  Box,
  Button,
  DialogContentText,
  DialogTitle,
  Divider,
  Grid,
  Stack,
  Typography,
  Avatar
} from "@mui/material";
import { useFormik } from "formik";
import * as yup from "yup";
import React from "react";
import { useDispatch, useSelector } from "@/shared/store/hooks";
import { patchParamsItem } from "@/shared/store/slices/reprice/repriceSlice";
import { useParams } from "next/navigation";
import { AppState } from "@/shared/store/store";
import { getAuth } from "firebase/auth";
import firebase_app from "@/shared/firebase/firebase";

const SettingsBlock = ({ item }: any) => {
  const validationSchema = yup.object({
    minValue: yup
      .number()
      .required("Минимально значение не заполнено")
      .min(100, "Число не должно быть меньше 100"),
    maxValue: yup
      .number()
      .required("Максимальное значение не заполнено")
      .min(100, "Число не должно быть меньше 100"),
    sale: yup
      .number()
      .required("Допустимая скидка не заполнена")
      .min(1, "Число не должно быть меньше 1")
      .max(100, "Число не должно быть больше 100"),
    amountStep: yup
      .number()
      .required("Шаг повышения цены не заполнен")
      .min(1, "Число не должно быть меньше 1")
  });
  const { accountId } = useParams() as any;
  const dispatch = useDispatch();
  const company = useSelector((state: AppState) => state.companyChanger) as any;

  const repricer = useSelector((state: AppState) => state.repriceReducer) as any;
  const auth = getAuth(firebase_app) as any;

  const formik = useFormik({
    initialValues: {
      minValue: item.minimumThreshold || 0,
      maxValue: item.maximumThreshold || 0,
      sale: item.discount || 0,
      amountStep: item.step || 0
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      dispatch(
        patchParamsItem(
          auth.currentUser.accessToken,
          company.activeCompany,
          accountId,
          repricer.currentItem,
          {
            minimumThreshold: values.minValue,
            maximumThreshold: values.maxValue,
            step: values.amountStep,
            discount: values.sale
          }
        )
      );
    }
  });

  return (
    item && (
      <>
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Box>
            <DialogTitle mt={2}>Настройки товара</DialogTitle>
            <DialogContentText mx={3}>Изменяйте цены для товара</DialogContentText>
          </Box>
        </Box>
        <Grid display={"flex"} mx={3} xs={12}>
          <Grid mt={4} xs={2}>
            <Box
              sx={{ position: "relative", width: "128px !important", height: "128px !important" }}
            >
              <Avatar
                src={`https://image.kazanexpress.ru/${item.photoKey}/t_product_high.jpg`}
                alt='product'
                sx={{ width: 128, height: 128 }}
              />
            </Box>
          </Grid>
          <Grid style={{ width: "100%" }} ml={3} xs={12}>
            <Box width={"100% !important"}>
              <CustomFormLabel>Название товара</CustomFormLabel>
              <CustomTextField
                fullWidth
                id='minValue'
                name='minValue'
                type='string'
                value={item.name}
                disable={true}
              />
            </Box>
            <Grid style={{ width: "100%", display: "flex", gap: "32px" }} xs={12}>
              <Box width={"18% !important"}>
                <CustomFormLabel>ProductId</CustomFormLabel>
                <CustomTextField
                  fullWidth
                  id='minValue'
                  name='minValue'
                  type='string'
                  value={item.productId}
                  disable={true}
                />
              </Box>
              <Box width={"18% !important"}>
                <CustomFormLabel>SkuId</CustomFormLabel>
                <CustomTextField
                  fullWidth
                  id='minValue'
                  name='minValue'
                  type='string'
                  value={item.skuId}
                  disable={true}
                />
              </Box>
              <Box width={"54% !important"}>
                <CustomFormLabel>SkuTitle</CustomFormLabel>
                <CustomTextField
                  fullWidth
                  id='minValue'
                  name='minValue'
                  type='string'
                  value={item.skuTitle}
                  disable={true}
                />
              </Box>
            </Grid>
            <Grid style={{ width: "100%", display: "flex", gap: "32px" }} xs={12}>
              <Box width={"30% !important"}>
                <CustomFormLabel>Цена товара</CustomFormLabel>
                <CustomTextField
                  fullWidth
                  id='minValue'
                  name='minValue'
                  type='string'
                  value={item.price + "руб."}
                  disable={true}
                />
              </Box>
              <Box width={"65% !important"}>
                <CustomFormLabel>Barcode</CustomFormLabel>
                <CustomTextField
                  fullWidth
                  id='minValue'
                  name='minValue'
                  type='string'
                  value={item.barcode}
                  disable={true}
                />
              </Box>
            </Grid>
          </Grid>
        </Grid>
        <form onSubmit={formik.handleSubmit}>
          <Grid item mx={3} mt={4} xs={12}>
            <Divider sx={{ mx: "-24px" }} />
            <Typography variant='h6' mt={2}>
              Интервал цен
            </Typography>
          </Grid>
          <Stack mx={3} direction='row' gap={3} justifyContent={"space-between"}>
            <Box width={"100%"}>
              <CustomFormLabel>Минимальная цена</CustomFormLabel>
              <CustomTextField
                fullWidth
                id='minValue'
                name='minValue'
                type='number'
                value={formik.values.minValue || item.minimumThreshold}
                onChange={formik.handleChange}
                error={formik.touched.minValue && Boolean(formik.errors.minValue)}
                helperText={formik.touched.minValue && formik.errors.minValue}
              />
            </Box>
            <Box width={"100%"}>
              <CustomFormLabel>Максимальная цена</CustomFormLabel>
              <CustomTextField
                fullWidth
                id='maxValue'
                name='maxValue'
                type='number'
                value={formik.values.maxValue}
                onChange={formik.handleChange}
                error={formik.touched.maxValue && Boolean(formik.errors.maxValue)}
                helperText={formik.touched.maxValue && formik.errors.maxValue}
              />
            </Box>
          </Stack>
          <Grid item mx={4} mt={4} xs={12}>
            <Divider sx={{ mx: "-24px" }} />
          </Grid>
          <Stack mx={3} direction='row' gap={3} justifyContent={"space-between"}>
            <Box width={"100%"}>
              <CustomFormLabel>Допустимая скидка %</CustomFormLabel>
              <CustomTextField
                fullWidth
                id='sale'
                type='number'
                name='sale'
                value={formik.values.sale}
                onChange={formik.handleChange}
                error={formik.touched.sale && Boolean(formik.errors.sale)}
                helperText={formik.touched.sale && formik.errors.sale}
              />
            </Box>
            <Box width={"100%"} mb={1}>
              <CustomFormLabel>Шаг повышения цены</CustomFormLabel>
              <CustomTextField
                fullWidth
                id='amountStep'
                name='amountStep'
                type='number'
                value={formik.values.amountStep}
                onChange={formik.handleChange}
                error={formik.touched.amountStep && Boolean(formik.errors.amountStep)}
                helperText={formik.touched.amountStep && formik.errors.amountStep}
              />
            </Box>
          </Stack>
          <Stack direction='row' px={3} pb={2} mb={2} mt={2} justifyContent={"flex-end"}>
            <Button variant='contained' color='primary' type='submit'>
              Обновить продукт
            </Button>
          </Stack>
        </form>
      </>
    )
  );
};

export default SettingsBlock;
