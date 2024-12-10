import {font} from './Font';

export const textVariants = {
  defaults: {
    fontSize: 14,
    lineHeight: 16,
    color: 'primaryBlack',
    // fontFamily: font.mRegular,
  },

  regular: {
    fontSize: 14,
    lineHeight: 16,
    color: 'primaryBlack',
    fontFamily: font.mRegular,
  },
  semiBold: {
    fontSize: 14,
    lineHeight: 16,
    color: 'primaryBlack',
    fontFamily: font.mSemiBold,
  },
  screenHeaderBlack: {
    fontSize: 18,
    lineHeight: 24,
    paddingVertical: 10,
    color: 'primaryBlack',
    fontFamily: font.mSemiBold,
  },
  bold: {
    fontSize: 14,
    lineHeight: 16,
    color: 'primaryBlack',
    fontFamily: font.mBold,
  },
  extraBold: {
    fontSize: 14,
    lineHeight: 16,
    color: 'primaryBlack',
    fontFamily: font.mBlack,
  },
  medium: {
    fontSize: 14,
    lineHeight: 16,
    color: 'primaryBlack',
    fontFamily: font.mMedium,
  },
  date: {
    fontSize: 12,
    fontFamily: font.mRegular,
    lineHeight:16,
    color: 'grey200',
  },


  info: {
    fontSize: 12,
    lineHeight: 18,
    color: 'grey200',
    fontFamily: font.mRegular,
  },
  error: {
    fontSize: 14,
    lineHeight: 16,
    color: 'primaryRed',
    fontFamily: font.mRegular,
  },
  light: {
    fontSize: 14,
    lineHeight: 16,
    fontFamily: font.mRegular,
  },

  screenHeader: {
    fontSize: 22,
    lineHeight: 30,
    paddingVertical: 10,
    color: 'primaryBlue',
    fontFamily: font.mBold,
  },
  screenSubHeader: {
    fontSize: 14,
    lineHeight: 20,
    color: 'primaryBlack',
    fontFamily: font.mMedium,
  },

  header: {
    fontSize: 30,
    lineHeight: 36,
    color: 'primaryBlue',
    fontFamily: font.mBold,
  },

  fieldText: {
    fontSize: 14,
    lineHeight: 16,
    color: 'grey200',
    fontFamily: font.mSemiBold,
  },
  italic: {
    fontSize: 14,
    lineHeight: 16,
    color: 'grey100',
    fontFamily: font.mMedium,
  },
};
