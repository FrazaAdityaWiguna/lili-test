import {  Container } from "@mui/material";
import React from "react";

export type Layout1Props = {
  children: React.ReactNode;
};

const Layout1 = (props: Layout1Props) => {
  const { children } = props;

  return (
    <Container maxWidth="sm" sx={{ pt: 3 }}>
      {children}
    </Container>
  );
};

export default Layout1;
