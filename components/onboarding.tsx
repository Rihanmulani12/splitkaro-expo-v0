import { getLocales } from 'expo-localization';

const getTimeZone = () => {
    const locales = getLocales();
    return locales[0].regionCode;
};

export const onboarding = getTimeZone()?.toLowerCase().includes("asia")? [
  {
    id: 1,
    title: 'Split Bills, not Friendship',
    photo: require('../assets/icons/onboarding/onboarding1.png'),
    description:
      'Fairly split your shared expenses to save money while keeping your friendship healthy!',
  },
  {
    id: 2,
    title: 'Track Balances',
    photo: require('../assets/icons/onboarding/onboarding2.png'),
    description:
      'Keep track of your money and remind your friends to pay back on time.',
  },
  {
    id: 3,
    title: 'Manage Expenses in Groups of Friends',
    photo: require('../assets/icons/onboarding/onboarding3.png'),
    description:
      'Organize & manage shared costs with friends, flatmates, colleagues, partners etc.',
  },
  {
    id: 4,
    title: 'Split Payments from UPI',
    photo: require('../assets/icons/onboarding/onboarding4.png'),
    description:
      'Add your bills fast & directly from UPI apps like Google Pay, PhonePe, Paytm & Cred.',
  },
]:[
  {
    id: 1,
    title: 'Split Bills, not Friendship',
    photo: require('../assets/icons/onboarding/onboarding1_us.png'),
    description:
      'Fairly split your shared expenses to save money while keeping your friendship healthy!',
  },
  {
    id: 2,
    title: 'Track Balances',
    photo: require('../assets/icons/onboarding/onboarding2_us.png'),
    description:
      'Keep track of your money and remind your friends to pay back on time.',
  },
  {
    id: 3,
    title: 'Manage Expenses in Groups of Friends',
    photo: require('../assets/icons/onboarding/onboarding3.png'),
    description:
      'Organize & manage shared costs with friends, flatmates, colleagues, partners etc.',
  },
];

export const userSelectionData = [
  // id is important please do not change id and sequence, id=5 for invited with referral_code
  {
    id: 1,
    title: 'Track Expenses with Flatmates',
    photo: require('../assets/icons/userType/flat2x.png'),
  },
  {
    id: 2,
    title: 'A Planned Trip',
    photo: require('../assets/icons/userType/friends2x.png'),
  },
  {
    id: 3,
    title: 'Manage Expenses with a Friend',
    photo: require('../assets/icons/userType/friends2x.png'),
  },
  {
    id: 4,
    title: 'Just to Explore',
    photo: require('../assets/icons/userType/telescope2x.png'),
  },
  // id -= 5 for invited user
];

export const AVATARS=[
  {name:'men01', id:"men01", type:"men01"},
  {name:'men02', id:"men02", type:"men02"},
  {name:'men03', id:"men03", type:"men03"},
  {name:'women01', id:"women01", type:"women01"},
  {name:'women02', id:"women02", type:"women02"},
  {name:'women03', id:"women03", type:"women03"},
]

export const availableAvatars=[...AVATARS.map(item=> item.name.toLowerCase())]

export const randomizedAvatar=AVATARS.map(value => ({value, sort: Math.random() }))
.sort((a, b) => a.sort - b.sort)
.map(({ value }) => value)