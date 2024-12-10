let debug;

if (__DEV__) {
  debug = {
    logs: true,
  };
} else {
  debug = {
    logs: false,
  };
}

export const DEBUG = debug;