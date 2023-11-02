"use client";
import PageContainer from "@/components/ui/container/PageContainer";
import ParentCard from "@/components/ui/shared/ParentCard";
import { Box } from "@mui/material";
import React from "react";

const Success = () => (
  <>
    <PageContainer title="Form Wizard" description="this is Form Wizard">
      <Box mt={5}>
        <ParentCard title="Пополнение баланса">
          <Box width="100%">
            Прозошла ошибка при оплате, попробуйте еще раз или обратитесь к
            поддержке
          </Box>
        </ParentCard>
      </Box>
    </PageContainer>
  </>
);

export default Success;
