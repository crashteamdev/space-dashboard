import CustomFormLabel from "@/components/ui/theme-elements/CustomFormLabel";
import CustomTextField from "@/components/ui/theme-elements/CustomTextField";
import { Box, Button, Stack } from "@mui/material";
import { useFormik } from "formik";
import * as yup from "yup";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "@/shared/store/hooks";
import { addStrategyId } from "@/shared/store/slices/reprice/repriceSlice";
import { AppState } from "@/shared/store/store";

const ValuesSettings = ({ strategy, selected, item, getFirstData, dataS }: any) => {
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
      .min(0, "Число не должно быть меньше 0")
      .max(100, "Число не должно быть больше 100"),
    amountStep: yup
      .number()
      .required("Шаг повышения цены не заполнен")
      .min(1, "Число не должно быть меньше 1")
  });

  const dispatch = useDispatch();
  const company = useSelector((state: AppState) => state.companyChanger) as any;

  const formik = useFormik({
    initialValues: {
      minValue: strategy?.minimumThreshold || 0,
      maxValue: strategy?.maximumThreshold || 0,
      discount: strategy?.discount || 0,
      amountStep: strategy?.step || 0
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      console.log(values, "wdw");
      await dispatch(
        addStrategyId(company.activeCompany, item.id, {
          step: +values.amountStep,
          strategyType: selected,
          minimumThreshold: +values.minValue,
          discount: +values.discount,
          maximumThreshold: +values.maxValue
        })
      );
      await getFirstData();
    }
  });

  useEffect(() => {
    formik.setValues({
      minValue: strategy?.minimumThreshold || 0,
      maxValue: strategy?.maximumThreshold || 0,
      discount: strategy?.discount || 0,
      amountStep: strategy?.step || 0
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [strategy]);

  return (
    <form onSubmit={formik.handleSubmit}>
      <div>
        <Stack mx={3} direction='row' gap={3} justifyContent={"space-between"}>
          {dataS.min && (
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
          )}
          {dataS.max && (
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
          )}
        </Stack>
        <Stack mx={3} direction='row' gap={3} justifyContent={"space-between"}>
          {dataS.discount && (
            <Box width={"100%"}>
              <CustomFormLabel>Допустимая скидка %</CustomFormLabel>
              <CustomTextField
                fullWidth
                id='discount'
                type='number'
                name='discount'
                value={formik.values.discount}
                onChange={formik.handleChange}
                error={formik.touched.discount && Boolean(formik.errors.discount)}
                helperText={formik.touched.discount && formik.errors.discount}
              />
            </Box>
          )}
          {dataS.step && (
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
          )}
        </Stack>
      </div>
      <Stack direction='row' px={3} pb={2} mb={2} mt={2} justifyContent={"flex-end"}>
        <Button variant='contained' color='primary' type='submit'>
          Сохранить
        </Button>
      </Stack>
    </form>
  );
};

export default ValuesSettings;
