"use client";

import React, { useCallback, useEffect, useState } from "react";
import {
  Box,
  Button,
  Card,
  Checkbox,
  Divider,
  FormControlLabel,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import RadioButtonUncheckedSharpIcon from "@mui/icons-material/RadioButtonUncheckedSharp";
import CheckCircleSharpIcon from "@mui/icons-material/CheckCircleSharp";
import CloseIcon from "@mui/icons-material/Close";
import Image from "next/image";
import CounterCount from "../CounterCount/CounterCount";
import {
  AddCartsResponseType,
  CartsResponseType,
  CartsSelectedType,
} from "@/types/Carts";
import serviceApi from "@/https/https";
import { debounce, formatRupiah } from "@/utils/common";
import { useRouter } from "next/navigation";

const ChartLists = () => {
  const router = useRouter();
  const [selectAll, setselectAll] = useState<boolean>(true);
  const [dataCarts, setDataCarts] = useState<CartsSelectedType[]>([]);
  const [totalCart, setTotalCart] = useState<number>(0);
  const [isSubmit, setIsSubmit] = useState<boolean>(false);

  const _getListCarts = useCallback(async () => {
    try {
      const response: CartsResponseType = await serviceApi.getCarts();

      const result = response.data.map((data) => {
        const newValue = {
          ...data,
          isChecked: true,
        };

        return newValue;
      });

      setDataCarts(result);
    } catch (err) {
      return err;
    }
  }, []);

  const _handleAddCart = useCallback(
    async (id: number, num: number) => {
      const payload = {
        quantity: num,
      };
      const response: AddCartsResponseType = await serviceApi.postAddCart(
        id,
        payload
      );

      const updatedCarts = dataCarts.map((cart) => {
        if (response.data.id === cart.id) {
          return {
            ...response.data,
            isChecked: cart.isChecked,
          };
        }
        return cart;
      });

      setDataCarts(updatedCarts);
    },
    [dataCarts]
  );

  const _submitCheckout = useCallback(async (data: CartsSelectedType[]) => {
    const payload = {
      id: Date.now(),
      orders: data,
    };

    setIsSubmit(true);

    const response = await serviceApi.postOrders(payload);

    setIsSubmit(false);

    return response;
  }, []);

  const hendleCounter = useCallback(
    async (id: number, num: number) => {
      debounce(() => _handleAddCart(id, num), 500)();
    },
    [_handleAddCart]
  );

  const handleSelectedCart = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>, id: number) => {
      const updatedCarts = dataCarts.map((cart) => {
        if (cart.id === id) {
          return {
            ...cart,
            isChecked: event.target.checked,
          };
        }
        return cart;
      });
      setDataCarts(updatedCarts);
    },
    [dataCarts]
  );

  const handleSelectAll = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      if (dataCarts.length > 0) {
        const updatedCarts = dataCarts.map((cart) => {
          return {
            ...cart,
            isChecked: event.target.checked,
          };
        });
        setDataCarts(updatedCarts);

        setselectAll(updatedCarts.every((val) => val.isChecked));
      }
    },
    [dataCarts]
  );

  const handleRemoveCartSelected = useCallback(
    (id: number) => {
      const updatedCarts = dataCarts.filter((cart) => cart.id !== id);
      setDataCarts(updatedCarts);
    },
    [dataCarts]
  );

  const handleRemoveSelectedCart = useCallback(() => {
    const updatedCarts = dataCarts.filter((cart) => !cart.isChecked);
    setDataCarts(updatedCarts);
  }, [dataCarts]);

  const handleGoToDetail = useCallback(
    (id: number) => {
      router.push(`/carts/${id}`);
    },
    [router]
  );

  const renderCartListInfo = useCallback(
    (data: CartsSelectedType) => {
      return (
        <Stack
          sx={{ p: 2 }}
          direction="row"
          alignItems="center"
          gap={2}
          key={data.id}
        >
          <Checkbox
            checked={data.isChecked}
            disableRipple
            icon={<RadioButtonUncheckedSharpIcon />}
            checkedIcon={<CheckCircleSharpIcon sx={{ color: "#eaea2a" }} />}
            sx={{ p: 0 }}
            onChange={(e) => handleSelectedCart(e, data.id)}
          />
          <Stack direction="row" sx={{ width: "100%" }} gap={2}>
            <Image
              src={data.thumbnailUrl}
              width={80}
              height={80}
              alt={data.name}
              priority
              style={{
                borderRadius: "16px",
                cursor: "pointer",
                height: "auto",
              }}
              onClick={() => handleGoToDetail(data.id)}
            />

            <Stack gap={1} sx={{ width: "100%" }}>
              <Stack
                direction="row"
                alignItems="center"
                justifyContent="space-between"
              >
                <Typography
                  sx={{ cursor: "pointer" }}
                  onClick={() => handleGoToDetail(data.id)}
                >
                  {data.name}
                </Typography>
                <IconButton
                  aria-label="delete"
                  color="primary"
                  onClick={() => handleRemoveCartSelected(data.id)}
                >
                  <CloseIcon sx={{ color: "#888" }} />
                </IconButton>
              </Stack>

              <Stack
                direction="row"
                alignItems="center"
                justifyContent="space-between"
              >
                <CounterCount
                  onChangeCounter={(num: number) => hendleCounter(data.id, num)}
                  initialValue={data.quantity}
                />
                <Typography
                  sx={{
                    fontWeight: "600",
                    fontSize: "15px",
                    cursor: "pointer",
                  }}
                  onClick={() => handleGoToDetail(data.id)}
                >
                  {formatRupiah(data.price * data.quantity, true)}
                </Typography>
              </Stack>
            </Stack>
          </Stack>
        </Stack>
      );
    },
    [
      handleGoToDetail,
      handleRemoveCartSelected,
      handleSelectedCart,
      hendleCounter,
    ]
  );

  useEffect(() => {
    _getListCarts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (dataCarts.length > 0) {
      setselectAll(dataCarts.every((val) => val.isChecked));
    } else {
      setselectAll(false);
    }
  }, [dataCarts]);

  useEffect(() => {
    let tempTotal = 0;

    dataCarts.forEach((cart) => {
      tempTotal = cart.price * cart.quantity + tempTotal;
    });

    setTotalCart(tempTotal);
  }, [dataCarts]);

  return (
    <Box>
      <Card>
        <Box sx={{ p: 2 }}>
          <Typography sx={{ fontWeight: "600", fontSize: "26px" }}>
            Cart
          </Typography>
        </Box>

        <Divider />

        <Stack
          sx={{ p: 2 }}
          direction="row"
          alignItems="center"
          justifyContent="space-between"
        >
          <FormControlLabel
            control={
              <Checkbox
                checked={selectAll}
                disableRipple
                icon={<RadioButtonUncheckedSharpIcon />}
                checkedIcon={<CheckCircleSharpIcon sx={{ color: "#eaea2a" }} />}
                onChange={handleSelectAll}
                disabled={dataCarts.length < 1}
              />
            }
            label={
              <Typography sx={{ fontWeight: "600", fontSize: "16px" }}>
                Pilih Semua
              </Typography>
            }
          />
          <Button
            variant="text"
            sx={{ textTransform: "none" }}
            onClick={handleRemoveSelectedCart}
            disabled={dataCarts.length < 1}
          >
            Delete
          </Button>
        </Stack>

        <Divider sx={{ borderBottomWidth: "2px" }} />

        {dataCarts &&
          dataCarts.map((data: CartsSelectedType) => renderCartListInfo(data))}

        {dataCarts.length > 0 && (
          <>
            <Divider />

            <Stack direction="row" justifyContent="space-between" p={2}>
              <Typography sx={{ color: "#999", fontWeight: "300" }}>
                {dataCarts.length} Products
              </Typography>

              <Typography sx={{ fontWeight: "600" }}>
                {formatRupiah(totalCart, true)}
              </Typography>
            </Stack>
          </>
        )}

        <Box p={2}>
          <Button
            sx={{
              backgroundColor: "#eaea2a",
              width: "100%",
              color: "#000",
              fontWeight: "700",
            }}
            onClick={() => _submitCheckout(dataCarts)}
            disabled={isSubmit}
          >
            Checkout
          </Button>
        </Box>
      </Card>
    </Box>
  );
};

export default ChartLists;
