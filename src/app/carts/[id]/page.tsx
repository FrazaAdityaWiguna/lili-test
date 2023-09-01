"use client";

import DetailCart from "@/components/DetailCart/DetailCart";
import dynamic from "next/dynamic";
import React from "react";

export interface PageDetailCartsParams {
  id: string;
}

interface PageDetailCartsProps {
  params: PageDetailCartsParams;
}

const PageDetailCarts = (props: PageDetailCartsProps) => {
  const { params } = props;

  return (
    <div>
      <DetailCart params={params} />
    </div>
  );
};

export default dynamic(() => Promise.resolve(PageDetailCarts), {
  ssr: false,
});
