import { Box } from "@chakra-ui/react";
import React from "react";

interface WrapperProps {
  children: any;
  variant?: "regular" | "small";
}

const Wrapper = ({ children, variant }: WrapperProps) => {
  return (
    <Box
      mt={8}
      mx="auto"
      maxW={variant === "regular" ? "800px" : "400px"}
      w="100%"
    >
      {children}
    </Box>
  );
};

export default Wrapper;
