import { Box } from "@/constants/Theme";
import {BaseTheme, BoxProps} from '@shopify/restyle';



interface IFlexContainer extends BoxProps<BaseTheme> {
    children: React.ReactNode;
    style?:StyleProp<ViewStyle>;
    align?: 'center' | 'flex-start' | 'flex-end';
    justify?: 'center' | 'space-between' | 'space-around' | 'flex-start' | 'flex-end';
  }
  export const Flex:FC<IFlexContainer> = ({
    children,
    align = 'center',
    justify = 'space-between',
    ...props
  }) => {
    return (
      <Box
        flexDirection={'row'}
        alignItems={align}
        justifyContent={justify}
        {...props}>
        {children}
      </Box>
    );
  };
  