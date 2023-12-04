import React from "react";
import { Box, Stack, Button, Dialog, DialogTitle } from "@mui/material";
import CustomTextField from "../ui/theme-elements/CustomTextField";
import CustomFormLabel from "../ui/theme-elements/CustomFormLabel";
import { useFormik } from "formik";
import * as yup from "yup";

const ProductTableEditItem = ({ open, setOpen }: any) => {
  const handleClose = () => {
    setOpen(false);
  };

  const validationSchema = yup.object({
    minValue: yup.number().required("Минимально значение не заполнено"),
    maxValue: yup.number().required("Максимальное значение не заполнено"),
    sale: yup.number().required("Допустимая скидка не заполнена"),
    amountStep: yup.number().required("Шаг повышения цены не заполнен")
  });

  const formik = useFormik({
    initialValues: {
      minValue: 0,
      maxValue: 0,
      sale: 0,
      amountStep: 0
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      console.log(values);
    }
  });

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle mt={2}>Редактирование продукта</DialogTitle>
      <form onSubmit={formik.handleSubmit}>
        <Stack
          style={{ width: "100%", maxWidth: "400px" }}
          mx={3}
          direction='row'
          gap={3}
          justifyContent={"space-between"}
        >
          <Box width={"100%"}>
            <CustomFormLabel>Минимальная цена</CustomFormLabel>
            <CustomTextField
              fullWidth
              id='minValue'
              name='minValue'
              type='number'
              value={formik.values.minValue}
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
        <Stack
          style={{ width: "100%", maxWidth: "400px" }}
          mx={3}
          direction='row'
          gap={3}
          justifyContent={"space-between"}
        >
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
    </Dialog>
  );
};

export default ProductTableEditItem;
