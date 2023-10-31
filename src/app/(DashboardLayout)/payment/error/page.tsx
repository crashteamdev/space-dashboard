"use client"
import PageContainer from '@/app/(DashboardLayout)/components/container/PageContainer';
import ParentCard from '@/app/(DashboardLayout)/components/shared/ParentCard';
import { Box } from '@mui/material';
import React from 'react';


const Success = () => (
  <>
    <PageContainer title="Form Wizard" description="this is Form Wizard">
      <Box mt={5}>
      <ParentCard title="Пополнение баланса">
        <Box width="100%">
          Прозошла ошибка при оплате, попробуйте еще раз или обратитесь к поддержке
        </Box>
      </ParentCard>
      </Box>
    </PageContainer>
  </>
);

export default Success;
