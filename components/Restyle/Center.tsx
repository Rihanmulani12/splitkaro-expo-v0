import { Box } from "@/constants/Theme";
import React from 'react';
export const Center:FC<IFlexContainer> = ({
    children ,
    align = 'center',
    justify = 'center',
    ...props
  }) => {
    return (
      <Box alignItems={align} justifyContent={justify} {...props}>
        {children}
      </Box>
    );
  };