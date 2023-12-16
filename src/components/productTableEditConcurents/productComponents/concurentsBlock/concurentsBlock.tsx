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
  Typography
} from "@mui/material";
import { useFormik } from "formik";
import * as yup from "yup";
import React, { useState } from "react";
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

const ConcurentsBlock = () => {
  const validationSchema = yup.object({
    url: yup.string().required("Введите ссылку на товар"),
    competitorProductId: yup.number().required("Введите productId"),
    competitorSkuId: yup.number().required("Введите skuId")
  });

  const { accountId, shopId } = useParams() as any;
  const company = useSelector((state: AppState) => state.companyChanger) as any;
  const repricer = useSelector((state: AppState) => state.repriceReducer) as any;
  const [dataAdds, setDataAdds] = useState([]) as any;
  const [dataConc, setDataConc] = useState([]) as any;
  const [selectedValue, setSelectedValue] = React.useState("");

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
          <DialogTitle mt={2}>Конкуренты</DialogTitle>
          <DialogContentText mx={3}>Добавить конкурента для отслеживания</DialogContentText>
        </Box>
      </Box>
      <form onSubmit={formik.handleSubmit}>
        <Box mx={3}>
          <CustomFormLabel>Выберите вариант добавления</CustomFormLabel>
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
        {selectedValue === "a" ? (
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
        ) : (
          <Stack mx={3} direction="row" gap={1} justifyContent={"space-between"}>
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
                helperText={formik.touched.competitorProductId && formik.errors.competitorProductId}
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
          </Stack>
        )}
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
      </form>
    </>
  );
};

export default ConcurentsBlock;
