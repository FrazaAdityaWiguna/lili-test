"use client";

import React, { useCallback, useState } from "react";
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";
import { Box, Stack } from "@mui/material";

interface CounterCountProps {
  initialValue: number;
  onChangeCounter: (val: number) => void;
}

const CounterCount = (props: CounterCountProps) => {
  const { initialValue, onChangeCounter } = props;
  const [count, setCount] = useState<number>(initialValue | 0);

  const handleIncrement = useCallback(() => {
    const updatedCount = count + 1;
    setCount(updatedCount);
    onChangeCounter(updatedCount);
  }, [count, onChangeCounter]);

  const handleDecrement = useCallback(() => {
    const updatedCount = count - 1;

    if (count > 1) {
      setCount(updatedCount);
      onChangeCounter(updatedCount);
    }
  }, [count, onChangeCounter]);

  let decrementStyle = {
    border: "1px solid #ccc",
    height: "30px",
    width: "30px",
  };

  if (count === 1) {
    decrementStyle = {
      ...decrementStyle,
      border: "1px solid #eee",
    };
  }

  return (
    <Box display="flex" alignItems="center">
      <Stack
        justifyContent="center"
        alignItems="center"
        sx={{ ...decrementStyle, cursor: "pointer" }}
        onClick={handleDecrement}
      >
        <RemoveIcon sx={{ color: count === 1 ? "#eee" : "" }} />
      </Stack>
      <Stack
        justifyContent="center"
        alignItems="center"
        sx={{
          px: 1,
          height: "30px",
          minWidth: "30px",
          borderTop: "1px solid #ccc",
          borderBottom: "1px solid #ccc",
        }}
      >
        {count}
      </Stack>
      <Stack
        justifyContent="center"
        alignItems="center"
        sx={{
          height: "30px",
          width: "30px",
          cursor: "pointer",
          border: "1px solid #ccc",
        }}
        onClick={handleIncrement}
      >
        <AddIcon />
      </Stack>
    </Box>
  );
};

export default CounterCount;
