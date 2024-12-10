import {Dimensions} from 'react-native';
const {width: W, height: H} = Dimensions.get('window');
import {createVariant, createRestyleComponent} from '@shopify/restyle';

export const cardVariants = {
  defaults: {
    // We can define defaults for the variant here.
    // This will be applied after the defaults passed to createVariant and before the variant defined below.
  },
  regular: {
    padding: {
      phone: 's',
      tablet: 'm',
    },
    borderRadius: 's',
  },
  elevated: {
    backgroundColor: 'white',
    shadowColor: 'grey100',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
    paddingVertical: 15,
    justifyContent: 'space-between',
  },
  centeredModal: {
    maxHeight: W,
    elevation: 5,
    width: W * 0.8,
    shadowRadius: 4,
    borderRadius: 10,
    overflow: 'hidden',
    shadowOpacity: 0.25,
    paddingVertical: 'm',
    shadowColor: 'grey100',
    backgroundColor: 'primaryWhite',
    shadowOffset: {width: 1, height: 2},
  },
  lightGreen: {
    flexDirection: 'row',
    backgroundColor: 'lightGreen',
  },

  redChips: {
    borderRadius: 10,
    paddingHorizontal: 5,
    justifyContent: 'center',
    backgroundColor: 'lightPink',
  },
};

const variant = createVariant({
  themeKey: 'cardVariants',
});

export const Card = createRestyleComponent([variant]);
