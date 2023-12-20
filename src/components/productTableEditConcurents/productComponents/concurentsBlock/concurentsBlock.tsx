import ProductTableEditConcurentsTable from "@/components/productTableEditConcurentsTable/productTableEditConcurentsTable";
import CustomFormLabel from "@/components/ui/theme-elements/CustomFormLabel";
import CustomTextField from "@/components/ui/theme-elements/CustomTextField";
import {
  Box,
  Button,
  DialogContentText,
  DialogTitle,
  FormControl,
  FormControlLabel,
  Stack,
  Typography,
  useTheme
} from "@mui/material";
import { useFormik } from "formik";
import * as yup from "yup";
import React, { useState, useEffect } from "react";
import ProductTableConcurentsAdds from "../../productTableConcurentsAdds/productTableConcurentsAdds";
import { useDispatch, useSelector } from "@/shared/store/hooks";
import {
  addComcurentItem,
  getCompetitiveProducts,
  getCompetitiveProductsAdds
} from "@/shared/store/slices/reprice/repriceSlice";
import { AppState } from "@/shared/store/store";
import { getAuth } from "firebase/auth";
import firebase_app from "@/shared/firebase/firebase";
import { useParams } from "next/navigation";
import CustomRadio from "@/components/ui/сustomRadio/CustomRadio";
import { getLimits } from "@/shared/store/slices/account/AccountSlice";

const ConcurentsBlock = () => {
  const [selectedValue, setSelectedValue] = useState("c");

  const validationSchema = yup.object({
    url: selectedValue === "a" ? yup.string().required("Введите ссылку на товар") : yup.string(),
    competitorProductId: yup.number().required("Введите productId"),
    competitorSkuId: yup.number().required("Введите skuId")
  });

  const theme = useTheme();
  const { accountId, shopId } = useParams() as any;
  const company = useSelector((state: AppState) => state.companyChanger) as any;
  const repricer = useSelector((state: AppState) => state.repriceReducer) as any;
  const [dataAdds, setDataAdds] = useState([]) as any;
  const [dataConc, setDataConc] = useState([]) as any;

  const auth = getAuth(firebase_app) as any;
  const dispatch = useDispatch();

  const getItems = async () => {
    const result = await dispatch(
      getCompetitiveProducts(
        auth.currentUser.accessToken,
        company.activeCompany,
        accountId,
        shopId,
        repricer.currentItem
      )
    );
    setDataConc(result);
  };

  const getComp = async () => {
    const result = await dispatch(
      getCompetitiveProductsAdds(
        auth.currentUser.accessToken,
        company.activeCompany,
        accountId,
        shopId,
        repricer.currentItem
      )
    );
    await setDataAdds(result);
    await getLimitsData();
  };

  const getLimitsData = () => {
    dispatch(getLimits(auth.currentUser.accessToken, company.activeCompany));
  };

  const handleChange3 = (event: any) => {
    setSelectedValue(event.target.value);
  };

  const formik = useFormik({
    initialValues: {
      url: "",
      competitorProductId: 0,
      competitorSkuId: 0
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      const data = {
        shopItemRef: {
          shopId: shopId,
          shopItemId: repricer.currentItem
        },
        url: values.url
      };
      const dataId = {
        shopItemRef: {
          shopId: shopId,
          shopItemId: repricer.currentItem
        },
        competitorProductId: values.competitorProductId,
        competitorSkuId: values.competitorSkuId
      };
      dispatch(
        addComcurentItem(
          auth.currentUser.accessToken,
          company.activeCompany,
          accountId,
          selectedValue === "a" ? data : dataId
        )
      );
      getLimitsData();
    }
  });

  useEffect(() => {
    getLimitsData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <Box>
          <DialogTitle mt={2}>Конкуренты</DialogTitle>
          <DialogContentText mx={3}>Добавить конкурента для отслеживания</DialogContentText>
          <Box display={"flex"} alignItems={"center"}></Box>
          <Box mt={1} display={"flex"} alignItems={"center"}>
            <DialogContentText ml={3}>Осталось добавлений конкурентов: </DialogContentText>
            <Typography
              ml={1}
              variant='h6'
              color={theme.palette.info.main}
              sx={{
                borderRadius: "100%"
              }}
            >
              {company.limits.itemCompetitorLimitCurrent}
            </Typography>
          </Box>
        </Box>
      </Box>
      <Box mx={3}>
        <Typography
          mt={3}
          mb={1}
          variant='h6'
          color='textSecondary'
          sx={{
            borderRadius: "100%"
          }}
        >
          Выберите вариант добавления конкурентов
        </Typography>
        <FormControl
          sx={{
            width: "100%"
          }}
        >
          <Box>
            <FormControlLabel
              checked={selectedValue === "a"}
              onChange={handleChange3}
              value='a'
              label='По ссылке'
              name='radio-button-demo'
              control={<CustomRadio />}
            />
            <FormControlLabel
              checked={selectedValue === "b"}
              onChange={handleChange3}
              value='b'
              label='ProductId, SkuId'
              control={<CustomRadio />}
              name='radio-button-demo'
            />
          </Box>
        </FormControl>
      </Box>
      <form onSubmit={formik.handleSubmit}>
        <Stack mx={3} direction='row' gap={3} justifyContent={"space-between"}>
          {selectedValue === "a" ? (
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
          ) : selectedValue === "b" ? (
            <>
              <Box width={"50%"}>
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
                  helperText={
                    formik.touched.competitorProductId && formik.errors.competitorProductId
                  }
                />
              </Box>
              <Box width={"50%"}>
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
            </>
          ) : null}
        </Stack>
        {selectedValue !== "c" && (
          <Stack direction='row' px={3} mt={2} justifyContent={"flex-end"}>
            <Button variant='contained' color='primary' type='submit'>
              Добавить
            </Button>
          </Stack>
        )}
      </form>
      <Box display={"flex"} position={"relative"} mt={5} justifyContent={"flex-start"}>
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
        <ProductTableConcurentsAdds getComp={getComp} dataConc={dataAdds} />
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
        <ProductTableEditConcurentsTable
          getItems={getItems}
          getComp={getComp}
          dataAdds={dataConc}
        />
      </Box>
    </>
  );
};

export default ConcurentsBlock;
