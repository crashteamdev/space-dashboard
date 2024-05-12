import CustomFormLabel from "@/components/ui/theme-elements/CustomFormLabel";
import CustomTextField from "@/components/ui/theme-elements/CustomTextField";
import { Box, Stack, ToggleButton, ToggleButtonGroup } from "@mui/material";
import { useFormik } from "formik";
import * as yup from "yup";
import React, { useEffect, useState } from "react";
import { useSelector } from "@/shared/store/hooks";
import { useDispatch as useReduxDispatch } from "react-redux";
import { addStrategyId, editStrategyId } from "@/shared/store/slices/reprice/repriceSlice";
import { AppState } from "@/shared/store/store";
import { AppButton } from "@/shared/components/AppButton";

const ValuesSettings = ({
  strategy, // хрен пойми зачем тут пустой объект
  getStrategyIdHandler, // функция void
  selected, // выбранная категория
  item,
  getFirstData,
  dataS
}: any) => {
  

  const formState = {
    shouldValidateAmountStep: true // Здесь пример условия, когда мы хотим валидировать amountStep
  };

  const validationSchema = yup.object({
    minValue: yup
      .number()
      .required("Минимально значение не заполнено")
      .min(1, "Число не должно быть меньше 1"),
    maxValue: yup
      .number()
      .required("Максимальное значение не заполнено")
      .min(1, "Число не должно быть меньше 1"),
    sale: yup
      .number()
      .required("Допустимая скидка не заполнена")
      .min(0, "Число не должно быть меньше 0")
      .max(100, "Число не должно быть больше 100"),
    amountStep: yup
      .number()
      .when("shouldValidateAmountStep", {
        is: true, // Валидируем amountStep только если shouldValidateAmountStep равно true
        then: yup.number()
          .required("Шаг повышения цены не заполнен")
          .min(1, "Число не должно быть меньше 1"),
        otherwise: yup.number() // Валидация не будет применяться, если shouldValidateAmountStep равно false
      })
  });

  const dispatch = useReduxDispatch();
  const [step, setStep] = useState(false);
  const company = useSelector((state: AppState) => state.companyChanger) as any;

  useEffect(() => {
    formik.setValues({
      minValue: strategy?.minimumThreshold || 0,
      maxValue: strategy?.maximumThreshold || 0,
      sale: strategy?.discount || 0,
      amountStep: strategy?.step || 0,
      competitorAvailableAmount: strategy?.competitorAvailableAmount || null,
      competitorSalesAmount: strategy?.competitorSalesAmount || null,
      changeNotAvailableItemPrice: strategy?.changeNotAvailableItemPrice || null
    });
    setStep(strategy?.strategyType ? true : false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [strategy]);

  const formik = useFormik({
    initialValues: {
      minValue: 0,
      maxValue: 0,
      sale: 0,
      amountStep: 0,
      competitorAvailableAmount: null,
      competitorSalesAmount: null,
      changeNotAvailableItemPrice: null
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      validationSchema.validate(values, { context: formState })
      // .then(valid => console.log("Данные валидны:", valid))
      .catch(error => console.error("Ошибка валидации:", error.message));

      if (step) {
        await dispatch(
          editStrategyId(company.activeCompany, item.id, {
            step: +values.amountStep,
            strategyType: strategy?.strategyType,
            minimumThreshold: +values.minValue,
            discount: +values.sale,
            maximumThreshold: +values.maxValue,
            competitorAvailableAmount: values.competitorAvailableAmount !== null ? +values.competitorAvailableAmount : null,
            competitorSalesAmount: values.competitorSalesAmount !== null ? +values.competitorSalesAmount : null,
            changeNotAvailableItemPrice: values.changeNotAvailableItemPrice
          })
        );
      } else {
        await dispatch(
          addStrategyId(company.activeCompany, item.id, {
            step: +values.amountStep,
            strategyType: selected,
            minimumThreshold: +values.minValue,
            discount: +values.sale,
            maximumThreshold: +values.maxValue,
            competitorAvailableAmount: values.competitorAvailableAmount !== null ? +values.competitorAvailableAmount : null,
            competitorSalesAmount: values.competitorSalesAmount !== null ? +values.competitorSalesAmount : null,
            changeNotAvailableItemPrice: values.changeNotAvailableItemPrice
          })
        );
      }
      await getStrategyIdHandler();
      await getFirstData();
    }
  });
  console.log(formik.values.changeNotAvailableItemPrice);
  return (
    <div>
      <form onSubmit={formik.handleSubmit}>
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
                id='sale'
                type='number'
                name='sale'
                value={formik.values.sale}
                onChange={formik.handleChange}
                error={formik.touched.sale && Boolean(formik.errors.sale)}
                helperText={formik.touched.sale && formik.errors.sale}
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
        <Stack mx={3} direction='row' gap={3} justifyContent={"space-between"}>
          {dataS.competitorSalesAmount && (
            <Box width={"100%"}>
              <CustomFormLabel>Кол-во продаж у конкурента</CustomFormLabel>
              <CustomTextField
                fullWidth
                id='competitorSalesAmount'
                type='number'
                name='competitorSalesAmount'
                value={formik.values.competitorSalesAmount}
                onChange={formik.handleChange}
                error={formik.touched.competitorSalesAmount && Boolean(formik.errors.competitorSalesAmount)}
                helperText={formik.touched.competitorSalesAmount && formik.errors.competitorSalesAmount}
              />
            </Box>
          )}
          {dataS.competitorAvailableAmount && (
            <Box width={"100%"} mb={1}>
              <CustomFormLabel>Кол-во товаров у конкурента</CustomFormLabel>
              <CustomTextField
                fullWidth
                id='competitorAvailableAmount'
                name='competitorAvailableAmount'
                type='number'
                value={formik.values.competitorAvailableAmount}
                onChange={formik.handleChange}
                error={formik.touched.competitorAvailableAmount && Boolean(formik.errors.competitorAvailableAmount)}
                helperText={formik.touched.competitorAvailableAmount && formik.errors.competitorAvailableAmount}
              />
            </Box>
          )}
        </Stack>
        <Stack mx={3} direction='row' gap={3} justifyContent={"space-between"}>
          {dataS.changeNotAvailableItemPrice && (
            <Box width={"100%"}>
              <CustomFormLabel>Менять цену при нулевом складе?</CustomFormLabel>
              <ToggleButtonGroup
                color="primary"
                value={formik.values.changeNotAvailableItemPrice === null || formik.values.changeNotAvailableItemPrice === "null" ? "null" : "true"}
                exclusive
                onChange={formik.handleChange}
              >
                <ToggleButton name="changeNotAvailableItemPrice" value={"true"}>Да</ToggleButton>
                <ToggleButton name="changeNotAvailableItemPrice" value={"null"}>Нет</ToggleButton>
              </ToggleButtonGroup>
            </Box>
          )}
        </Stack>
        {strategy?.strategyType || selected ? (
          <Stack direction='row' px={3} pb={2} mb={2} mt={2} justifyContent={"flex-end"}>
            <AppButton tag="button">
              Сохранить
            </AppButton>
          </Stack>
        ) : null}
      </form>
    </div>
  );
};

export default ValuesSettings;
