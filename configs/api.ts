let api;
if (__DEV__) {
  api = 'https://staging3.splitkaro.com/v1';
} else {
  api = 'https://api.splitkaro.com/v1';
}

export const API = api;