"use client";

import React from "react";
import Layout1 from "./layout1/Layout1";

export type LayoutProps = {
  children: React.ReactNode;
};

const Layout = (props: LayoutProps) => {
  const { children } = props;

  return <Layout1>{children}</Layout1>;
};

export default Layout;
