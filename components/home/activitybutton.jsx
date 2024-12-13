// hooks/useSubscription.js

import moment from 'moment';

import {getSubscriptionForUserApi} from '../helperFunctions/Api';

import {useAtom} from 'jotai';
import {RESET, atomWithStorage, createJSONStorage} from 'jotai/utils';

import AsyncStorage from '@react-native-async-storage/async-storage';
const storage = createJSONStorage(() => AsyncStorage);

import Log from '../helperFunctions/Log';
import {analytics} from '../configs/analytics';
import mixpanel from '../configs/mixpanel';

export const storedSubscriptionAtom = atomWithStorage(
  '@isUserSubscribed',
  null,
  {...storage, delayInit: true},
);
export const storedSubscriptionEndDateAtom = atomWithStorage(
  '@subscriptionEndDate',
  '',
  {...storage, delayInit: true},
);

/**
 * Custom hook to check if the user is subscribed and get the subscription end date.
 * @returns {Object} An object with properties isUserSubscribed and subscriptionEndDate,
 * and a function **checkUserAlreadySubscribed** to manually trigger the check.
 */
export const useSubscription = () => {
  const [isUserSubscribed, setIsUserSubscribed] = useAtom(
    storedSubscriptionAtom,
  );
  const [subscriptionEndDate, setSubscriptionEndDate] = useAtom(
    storedSubscriptionEndDateAtom,
  );

  const checkUserAlreadySubscribed = async (userId, callback=()=>{}) => {
    try {
      let response = await getSubscriptionForUserApi({
        userId,
        
      });

      if (response.status === 200) {
       
        if (response?.data?.isSubscribed) {
          setIsUserSubscribed(true);
          setSubscriptionEndDate(
            moment(response?.data?.end_date * 1000).subtract(1, 'day')?.format('DD-MMM-YY'),
          );
          analytics.identify(userId, {
            isUserPremium: true,
          })
          mixpanel.getPeople().set("isUserPremium", true);

        } else {
          setIsUserSubscribed(false);
          setSubscriptionEndDate(RESET);
          analytics.identify(userId, {
            isUserPremium: false,
          })
          mixpanel.getPeople().set("isUserPremium", false)
        }
        callback();
      }
    } catch (error) {
      analytics.track('error getting membership plans');
      callback();
    }
  };

  const onResetSubscription = () => {
    setIsUserSubscribed(RESET);
    setSubscriptionEndDate(RESET);
  };

  return {
    isUserSubscribed,
    subscriptionEndDate,
    checkUserAlreadySubscribed, // to be removed and use checkSubscription only better name
    checkSubscription: checkUserAlreadySubscribed, 
    onResetSubscription,
  };
};
