"use client"

import { Box } from '@mui/material';
import Breadcrumb from '@/app/(DashboardLayout)/layout/shared/breadcrumb/Breadcrumb';
import PageContainer from '@/app/(DashboardLayout)/components/container/PageContainer';
import ProductChecout from '@/app/(DashboardLayout)/components/apps/ecommerce/productCheckout/ProductCheckout';
import ChildCard from '@/app/(DashboardLayout)/components/shared/ChildCard';

const BCrumb = [
  {
    to: '/',
    title: 'Home',
  },
  {
    title: 'Checkout',
  },
];

const EcommerceCheckout = () => {
  return (
    <PageContainer title="Checkout" description="this is Checkout">
      {/* breadcrumb */}
      <Breadcrumb title="Checkout" items={BCrumb} />
      <ChildCard>
        {/* ------------------------------------------- */}
        {/* Right part */}
        {/* ------------------------------------------- */}
        <Box p={3} flexGrow={1}>
          <ProductChecout />
        </Box>
      </ChildCard>
    </PageContainer>
  );
};

export default EcommerceCheckout;
