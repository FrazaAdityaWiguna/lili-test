import { PageDetailCartsParams } from "@/app/carts/[id]/page";
import serviceApi from "@/https/https";
import { CartsType, DetailCartsResponseType } from "@/types/Carts";
import { formatRupiah } from "@/utils/common";
import { Box, Button, Card, Divider, Stack, Typography } from "@mui/material";
import Image from "next/image";
import React, { useCallback, useEffect, useState } from "react";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import Link from "next/link";

interface DetailCartProps {
  params: PageDetailCartsParams;
}

const DetailCart = (props: DetailCartProps) => {
  const { params } = props;

  const [dataDetailCart, setDataDetailCart] = useState<CartsType>();

  const _getDetailCart = useCallback(async () => {
    try {
      const payload = {
        id: params.id,
      };
      const response: DetailCartsResponseType = await serviceApi.getDetailCart(
        payload
      );

      setDataDetailCart(response.data);
    } catch (err) {
      return err;
    }
  }, [params.id]);

  useEffect(() => {
    _getDetailCart();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Card>
      <Stack direction="row" mb={1} p={2}>
        <Button
          variant="text"
          startIcon={<ArrowBackIosNewIcon sx={{ height: "15px" }} />}
          sx={{ textTransform: "none", color: "#888" }}
          component={Link}
          href="/"
        >
          Back To Carts
        </Button>
      </Stack>

      <Divider />

      <Box mt={1} p={2}>
        <Typography sx={{ fontWeight: "600", fontSize: "20px" }} mb={2}>
          Detail Cart
        </Typography>

        {dataDetailCart && (
          <Stack direction="row" gap={2}>
            <Image
              src={dataDetailCart.thumbnailUrl}
              width={100}
              height={100}
              alt={dataDetailCart.name}
              style={{ borderRadius: "16px" }}
            />

            <Stack gap={1}>
              <Typography sx={{ fontWeight: "600" }}>
                {dataDetailCart.name}
              </Typography>

              <Stack direction="row" gap={2}>
                <Typography>{dataDetailCart.quantity}x</Typography>
                <Typography>
                  {formatRupiah(dataDetailCart.price, true)}
                </Typography>
              </Stack>

              <Stack direction="row" gap={2} alignItems="center">
                <Typography sx={{ fontSize: "18px", fontWeight: "600" }}>
                  Total :
                </Typography>
                <Typography sx={{ fontSize: "18px", fontWeight: "600" }}>
                  {formatRupiah(
                    dataDetailCart.price * dataDetailCart.quantity,
                    true
                  )}
                </Typography>
              </Stack>
            </Stack>
          </Stack>
        )}
      </Box>
    </Card>
  );
};

export default DetailCart;
