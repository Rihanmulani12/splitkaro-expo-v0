import remoteConfig from '@react-native-firebase/remote-config';

const getRemoteValues = async (key : string) => {
  await remoteConfig().setDefaults({
    [key]: 'default_value',
  });
  await remoteConfig().fetchAndActivate();
  const value = remoteConfig().getValue(key);
  return value.asString(); // Return the value in the required format
};

export default getRemoteValues;