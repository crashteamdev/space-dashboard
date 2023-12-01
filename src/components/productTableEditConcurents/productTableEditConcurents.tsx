import React from "react";
import {
  Box,
  Stack,
  Button,
  Dialog,
  DialogTitle,
  DialogContentText,
  Typography,
} from "@mui/material";
import CustomTextField from "../ui/theme-elements/CustomTextField";
import CustomFormLabel from "../ui/theme-elements/CustomFormLabel";
import { useFormik } from "formik";
import * as yup from "yup";
import { getAuth } from "firebase/auth";
import firebase_app from "@/shared/firebase/firebase";
import styles from "./productTableEditConcurents.module.scss";
import ThemeColors from "@/shared/theme/ThemeColors";
import ProductTableEditConcurentsTable from "../productTableEditConcurentsTable/productTableEditConcurentsTable";

const ProductTableEditConcurents = ({ open, setOpen }: any) => {
  const handleClose = () => {
    setOpen(false);
  };

  const auth = getAuth(firebase_app) as any;

  const validationSchema = yup.object({
    minValue: yup.number().required("Минимально значение не заполнено"),
    maxValue: yup.number().required("Максимальное значение не заполнено"),
    sale: yup.number().required("Допустимая скидка не заполнена"),
    amountStep: yup.number().required("Шаг повышения цены не заполнен"),
  });

  const formik = useFormik({
    initialValues: {
      minValue: 0,
      maxValue: 0,
      sale: 0,
      amountStep: 0,
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      console.log(values);
    },
  });

  return (
    <Dialog
      style={{ justifyContent: "flex-end", margin: "0" }}
      open={open}
      className={styles.rightPopup}
      fullWidth={true}
      onClose={handleClose}
    >
      <Box sx={{ display: 'flex', justifyContent: "space-between"}}>
        <Box>
          <DialogTitle mt={2}>Подробнее о товаре</DialogTitle>
          <DialogContentText mx={3}>
            Добавить конкурента для отслеживания
          </DialogContentText>
        </Box>
        <Box mt={4} mr={3} sx={{display: "flex", gap: "12px", alignItems: 'center'}}>
          <Button variant="contained" color="primary" type="submit">
            Сохранить
          </Button>
          <Button variant="contained" color="secondary" type="submit">
            Закрыть
          </Button>
        </Box>
      </Box>
      <form onSubmit={formik.handleSubmit}>
        <Stack mx={3} direction="row" gap={3} justifyContent={"space-between"}>
          <Box width={"100%"}>
            <CustomFormLabel>Ссылка на товар</CustomFormLabel>
            <CustomTextField
              fullWidth
              id="sale"
              type="number"
              name="sale"
              value={formik.values.sale}
              onChange={formik.handleChange}
              error={formik.touched.sale && Boolean(formik.errors.sale)}
              helperText={formik.touched.sale && formik.errors.sale}
            />
          </Box>
        </Stack>
        <Box
          display={"flex"}
          position={"relative"}
          mt={4}
          justifyContent={"center"}
        >
          <div className={styles.line}></div>
          <Typography
            sx={{ backgroundColor: "background.default" }}
            className={styles.text}
            color="textSecondary"
            variant="subtitle2"
          >
            Или
          </Typography>
        </Box>
        <Stack
          mx={3}
          direction="column"
          gap={1}
          justifyContent={"space-between"}
        >
          <Box width={"100%"}>
            <CustomFormLabel>PRODUCT ID</CustomFormLabel>
            <CustomTextField
              fullWidth
              id="sale"
              type="number"
              name="sale"
              value={formik.values.sale}
              onChange={formik.handleChange}
              error={formik.touched.sale && Boolean(formik.errors.sale)}
              helperText={formik.touched.sale && formik.errors.sale}
            />
          </Box>
          <Box width={"100%"}>
            <CustomFormLabel>SKU ID</CustomFormLabel>
            <CustomTextField
              fullWidth
              id="sale"
              type="number"
              name="sale"
              value={formik.values.sale}
              onChange={formik.handleChange}
              error={formik.touched.sale && Boolean(formik.errors.sale)}
              helperText={formik.touched.sale && formik.errors.sale}
            />
          </Box>
        </Stack>
        <Stack
          direction="row"
          px={3}
          pb={2}
          mb={2}
          mt={2}
          justifyContent={"flex-end"}
        >
          <Button variant="contained" color="primary" type="submit">
            Добавить
          </Button>
        </Stack>
        <Box
          display={"flex"}
          position={"relative"}
          mt={2}
          justifyContent={"center"}
        >
          <div className={styles.line}></div>
          <Typography
            sx={{ backgroundColor: "background.default" }}
            className={styles.text}
            color="textSecondary"
            variant="subtitle2"
          >
            Возможные конкуренты
          </Typography>
        </Box>
        <Box mx={3} mt={3}>
          <ProductTableEditConcurentsTable />
        </Box>
      </form>
    </Dialog>
  );
};

export default ProductTableEditConcurents;
