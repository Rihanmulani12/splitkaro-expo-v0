// make a function which takes callingCode from user profile and return currency symbol i have a  array list of countries in following format
// {
//   name: 'Austria',
//   currency: 'EUR',
//   code: 'AT',
//   symbol: '€',
//   flag: '🇦🇹',
//   callingCode: '+43',
//   region: 'Europe',
//   subRegion: 'Western Europe',
// },

import { UserDataTypes } from '@/lib/types';
import {countries} from '@/lib/countries';

export const userCurrency = (userData :UserDataTypes): string => {
    const {country_code} = userData;
  const country = countries.find(
    country => country.callingCode === country_code,
  );
  return country?.symbol || '₹';
};
