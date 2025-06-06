// import { Helmet } from 'react-helmet';
import React from "react";
import { Helmet, HelmetProvider } from "react-helmet-async";

type Props = {
  description?: string;
  children: JSX.Element | JSX.Element[];
  title?: string;
};

const PageContainer = ({ title, description, children }: Props) => (
  <HelmetProvider>
    <Helmet>
      <title>{title}</title>
      <meta name='description' content={description} />
    </Helmet>
    {children}
  </HelmetProvider>
);

export default PageContainer;
