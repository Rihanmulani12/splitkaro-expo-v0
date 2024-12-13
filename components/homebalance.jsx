import React, {
  useState,
  useImperativeHandle,
  forwardRef,
  useEffect,
  useContext,
} from "react";
import {
  StyleSheet,
  Text,
  Pressable,
  View,
  Dimensions,
  TextInput,
  FlatList,
  Platform,
} from "react-native";
import { AuthContext } from "../contexts/authContext";

import { useNavigation } from "@react-navigation/native";

import { FriendBalanceContext } from "../contexts/friendBalanceContext";
import { RFValue } from "react-native-responsive-fontsize";



import { instantCountAtom } from "../atom/instantCountAtom";
import { useAtom } from "jotai";
import { userCurrency } from "../helperfunctions/userCurrency";
import Svg, { Path } from "react-native-svg";

const HomeBalance = (props, ref) => {
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);
  const { updateData, friendBalanceState } = useContext(FriendBalanceContext);
  const [balance, updateBalance] = useState(friendBalanceState.balance);

  const { state } = React.useContext(AuthContext);
  const userData = JSON.parse(state.userData);
  const userToken = userData && userData.token;
  const userId = userData && userData.user_id;
  const [instantCount] = useAtom(instantCountAtom);

  const windowHeight = Dimensions.get("window").height;

  useImperativeHandle(ref, () => ({
    refetchBalance: () => {
      getFriendData();
    },
  }));

  const getFriendData = async () => {
    await updateData();
    setLoading(false);
  };
  useEffect(() => {
    updateBalance(friendBalanceState.balance);
  }, [friendBalanceState.balance]);

  useEffect(() => {
    getFriendData();
  }, []);

  return (
    <>
      {/* <View style={props.type=="home"?{...styles.homeBalance}:null}> */}
      <View
        style={{
          flexDirection: "row",
          height: 120,
          marginHorizontal: 16,
          borderRadius: 17,
          marginTop: props.type == "home" ? -60 : null,
        }}
      >
        <View
          style={{
            backgroundColor: props.type == "home" ? "#343A6C" : "#FFF6ED",
            flex: 1,
            justifyContent: "center",
            borderRadius: 20,
            overflow: "hidden",
          }}
        >
          <Pressable
            android_ripple={{ color: "#FFF6EE", radius: 200 }}
            onPress={() => {
              navigation.navigate("Friends");
            }}
            style={{ flex: 1, flexDirection: "row", alignItems: "center" }}
          >
            <View
              style={{
                flex: 1.5,
                marginLeft: 25,
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <View>
                <Text
                  allowFontScaling={false}
                  style={{
                    fontFamily: "Metropolis-Medium",
                    color: props.type == "home" ? "white" : "black",
                    fontSize: RFValue(
                      Platform.OS == "ios" ? 14 : 15,
                      windowHeight
                    ),
                    marginRight: 15,
                  }}
                >
                  Total Balance
                </Text>
                <Text
                  allowFontScaling={false}
                  style={{
                    fontFamily: "Metropolis-SemiBold",
                    color:
                      balance.positiveBalance - balance.negativeBalance > 0
                        ? "#70cf97"
                        : balance.positiveBalance - balance.negativeBalance == 0
                        ? props.type == "home"
                          ? "white"
                          : "black"
                        : "#fe6370",
                    marginTop: 2,
                    fontSize: RFValue(
                      Platform.OS == "ios" ? 14 : 15,
                      windowHeight
                    ),
                  }}
                >
                  {userCurrency(userData)}
                  {Math.abs(
                    balance.positiveBalance - balance.negativeBalance
                  ).toFixed(2)}
                </Text>
              </View>

              {props.type == "home" ? (
                <Svg
                  style={{ marginLeft: -45, transform: [{ rotate: "90deg" }] }}
                  width="100"
                  height="6"
                  viewBox="0 0 140 4"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M2.5 3.5C3.32843 3.5 4 2.82843 4 2C4 1.17157 3.32843 0.5 2.5 0.5V3.5ZM7.5 0.5C6.67157 0.5 6 1.17157 6 2C6 2.82843 6.67157 3.5 7.5 3.5V0.5ZM12.5 3.5C13.3284 3.5 14 2.82843 14 2C14 1.17157 13.3284 0.5 12.5 0.5V3.5ZM17.5 0.5C16.6716 0.5 16 1.17157 16 2C16 2.82843 16.6716 3.5 17.5 3.5V0.5ZM22.5 3.5C23.3284 3.5 24 2.82843 24 2C24 1.17157 23.3284 0.5 22.5 0.5V3.5ZM27.5 0.5C26.6716 0.5 26 1.17157 26 2C26 2.82843 26.6716 3.5 27.5 3.5V0.5ZM32.5 3.5C33.3284 3.5 34 2.82843 34 2C34 1.17157 33.3284 0.5 32.5 0.5V3.5ZM37.5 0.5C36.6716 0.5 36 1.17157 36 2C36 2.82843 36.6716 3.5 37.5 3.5V0.5ZM42.5 3.5C43.3284 3.5 44 2.82843 44 2C44 1.17157 43.3284 0.5 42.5 0.5V3.5ZM47.5 0.5C46.6716 0.5 46 1.17157 46 2C46 2.82843 46.6716 3.5 47.5 3.5V0.5ZM52.5 3.5C53.3284 3.5 54 2.82843 54 2C54 1.17157 53.3284 0.5 52.5 0.5V3.5ZM57.5 0.5C56.6716 0.5 56 1.17157 56 2C56 2.82843 56.6716 3.5 57.5 3.5V0.5ZM62.5 3.5C63.3284 3.5 64 2.82843 64 2C64 1.17157 63.3284 0.5 62.5 0.5V3.5ZM67.5 0.5C66.6716 0.5 66 1.17157 66 2C66 2.82843 66.6716 3.5 67.5 3.5V0.5ZM72.5 3.5C73.3284 3.5 74 2.82843 74 2C74 1.17157 73.3284 0.5 72.5 0.5V3.5ZM77.5 0.5C76.6716 0.5 76 1.17157 76 2C76 2.82843 76.6716 3.5 77.5 3.5V0.5ZM82.5 3.5C83.3284 3.5 84 2.82843 84 2C84 1.17157 83.3284 0.5 82.5 0.5V3.5ZM87.5 0.5C86.6716 0.5 86 1.17157 86 2C86 2.82843 86.6716 3.5 87.5 3.5V0.5ZM92.5 3.5C93.3284 3.5 94 2.82843 94 2C94 1.17157 93.3284 0.5 92.5 0.5V3.5ZM97.5 0.5C96.6716 0.5 96 1.17157 96 2C96 2.82843 96.6716 3.5 97.5 3.5V0.5ZM102.5 3.5C103.328 3.5 104 2.82843 104 2C104 1.17157 103.328 0.5 102.5 0.5V3.5ZM107.5 0.5C106.672 0.5 106 1.17157 106 2C106 2.82843 106.672 3.5 107.5 3.5V0.5ZM112.5 3.5C113.328 3.5 114 2.82843 114 2C114 1.17157 113.328 0.5 112.5 0.5V3.5ZM117.5 0.5C116.672 0.5 116 1.17157 116 2C116 2.82843 116.672 3.5 117.5 3.5V0.5ZM122.5 3.5C123.328 3.5 124 2.82843 124 2C124 1.17157 123.328 0.5 122.5 0.5V3.5ZM127.5 0.5C126.672 0.5 126 1.17157 126 2C126 2.82843 126.672 3.5 127.5 3.5V0.5ZM132.5 3.5C133.328 3.5 134 2.82843 134 2C134 1.17157 133.328 0.5 132.5 0.5V3.5ZM137.5 0.5C136.672 0.5 136 1.17157 136 2C136 2.82843 136.672 3.5 137.5 3.5V0.5ZM142.5 3.5C143.328 3.5 144 2.82843 144 2C144 1.17157 143.328 0.5 142.5 0.5V3.5ZM147.5 0.5C146.672 0.5 146 1.17157 146 2C146 2.82843 146.672 3.5 147.5 3.5V0.5ZM152.5 3.5C153.328 3.5 154 2.82843 154 2C154 1.17157 153.328 0.5 152.5 0.5V3.5ZM157.5 0.5C156.672 0.5 156 1.17157 156 2C156 2.82843 156.672 3.5 157.5 3.5V0.5ZM162.5 3.5C163.328 3.5 164 2.82843 164 2C164 1.17157 163.328 0.5 162.5 0.5V3.5ZM167.5 0.5C166.672 0.5 166 1.17157 166 2C166 2.82843 166.672 3.5 167.5 3.5V0.5ZM172.5 3.5C173.328 3.5 174 2.82843 174 2C174 1.17157 173.328 0.5 172.5 0.5V3.5ZM177.5 0.5C176.672 0.5 176 1.17157 176 2C176 2.82843 176.672 3.5 177.5 3.5V0.5ZM182.5 3.5C183.328 3.5 184 2.82843 184 2C184 1.17157 183.328 0.5 182.5 0.5V3.5ZM187.5 0.5C186.672 0.5 186 1.17157 186 2C186 2.82843 186.672 3.5 187.5 3.5V0.5ZM192.5 3.5C193.328 3.5 194 2.82843 194 2C194 1.17157 193.328 0.5 192.5 0.5V3.5ZM197.5 0.5C196.672 0.5 196 1.17157 196 2C196 2.82843 196.672 3.5 197.5 3.5V0.5ZM202.5 3.5C203.328 3.5 204 2.82843 204 2C204 1.17157 203.328 0.5 202.5 0.5V3.5ZM207.5 0.5C206.672 0.5 206 1.17157 206 2C206 2.82843 206.672 3.5 207.5 3.5V0.5ZM212.5 3.5C213.328 3.5 214 2.82843 214 2C214 1.17157 213.328 0.5 212.5 0.5V3.5ZM217.5 0.5C216.672 0.5 216 1.17157 216 2C216 2.82843 216.672 3.5 217.5 3.5V0.5ZM0 3.5H2.5V0.5H0V3.5ZM7.5 3.5H12.5V0.5H7.5V3.5ZM17.5 3.5H22.5V0.5H17.5V3.5ZM27.5 3.5H32.5V0.5H27.5V3.5ZM37.5 3.5H42.5V0.5H37.5V3.5ZM47.5 3.5H52.5V0.5H47.5V3.5ZM57.5 3.5H62.5V0.5H57.5V3.5ZM67.5 3.5H72.5V0.5H67.5V3.5ZM77.5 3.5H82.5V0.5H77.5V3.5ZM87.5 3.5H92.5V0.5H87.5V3.5ZM97.5 3.5H102.5V0.5H97.5V3.5ZM107.5 3.5H112.5V0.5H107.5V3.5ZM117.5 3.5H122.5V0.5H117.5V3.5ZM127.5 3.5H132.5V0.5H127.5V3.5ZM137.5 3.5H142.5V0.5H137.5V3.5ZM147.5 3.5H152.5V0.5H147.5V3.5ZM157.5 3.5H162.5V0.5H157.5V3.5ZM167.5 3.5H172.5V0.5H167.5V3.5ZM177.5 3.5H182.5V0.5H177.5V3.5ZM187.5 3.5H192.5V0.5H187.5V3.5ZM197.5 3.5H202.5V0.5H197.5V3.5ZM207.5 3.5H212.5V0.5H207.5V3.5ZM217.5 3.5H220V0.5H217.5V3.5Z"
                    fill="#2C2E57"
                  />
                </Svg>
              ) : (
                <Svg
                  style={{ marginLeft: -45, transform: [{ rotate: "90deg" }] }}
                  width="100"
                  height="6"
                  viewBox="0 0 140 4"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <Path
                    d="M2.5 3.5C3.32843 3.5 4 2.82843 4 2C4 1.17157 3.32843 0.5 2.5 0.5V3.5ZM7.5 0.5C6.67157 0.5 6 1.17157 6 2C6 2.82843 6.67157 3.5 7.5 3.5V0.5ZM12.5 3.5C13.3284 3.5 14 2.82843 14 2C14 1.17157 13.3284 0.5 12.5 0.5V3.5ZM17.5 0.5C16.6716 0.5 16 1.17157 16 2C16 2.82843 16.6716 3.5 17.5 3.5V0.5ZM22.5 3.5C23.3284 3.5 24 2.82843 24 2C24 1.17157 23.3284 0.5 22.5 0.5V3.5ZM27.5 0.5C26.6716 0.5 26 1.17157 26 2C26 2.82843 26.6716 3.5 27.5 3.5V0.5ZM32.5 3.5C33.3284 3.5 34 2.82843 34 2C34 1.17157 33.3284 0.5 32.5 0.5V3.5ZM37.5 0.5C36.6716 0.5 36 1.17157 36 2C36 2.82843 36.6716 3.5 37.5 3.5V0.5ZM42.5 3.5C43.3284 3.5 44 2.82843 44 2C44 1.17157 43.3284 0.5 42.5 0.5V3.5ZM47.5 0.5C46.6716 0.5 46 1.17157 46 2C46 2.82843 46.6716 3.5 47.5 3.5V0.5ZM52.5 3.5C53.3284 3.5 54 2.82843 54 2C54 1.17157 53.3284 0.5 52.5 0.5V3.5ZM57.5 0.5C56.6716 0.5 56 1.17157 56 2C56 2.82843 56.6716 3.5 57.5 3.5V0.5ZM62.5 3.5C63.3284 3.5 64 2.82843 64 2C64 1.17157 63.3284 0.5 62.5 0.5V3.5ZM67.5 0.5C66.6716 0.5 66 1.17157 66 2C66 2.82843 66.6716 3.5 67.5 3.5V0.5ZM72.5 3.5C73.3284 3.5 74 2.82843 74 2C74 1.17157 73.3284 0.5 72.5 0.5V3.5ZM77.5 0.5C76.6716 0.5 76 1.17157 76 2C76 2.82843 76.6716 3.5 77.5 3.5V0.5ZM82.5 3.5C83.3284 3.5 84 2.82843 84 2C84 1.17157 83.3284 0.5 82.5 0.5V3.5ZM87.5 0.5C86.6716 0.5 86 1.17157 86 2C86 2.82843 86.6716 3.5 87.5 3.5V0.5ZM92.5 3.5C93.3284 3.5 94 2.82843 94 2C94 1.17157 93.3284 0.5 92.5 0.5V3.5ZM97.5 0.5C96.6716 0.5 96 1.17157 96 2C96 2.82843 96.6716 3.5 97.5 3.5V0.5ZM102.5 3.5C103.328 3.5 104 2.82843 104 2C104 1.17157 103.328 0.5 102.5 0.5V3.5ZM107.5 0.5C106.672 0.5 106 1.17157 106 2C106 2.82843 106.672 3.5 107.5 3.5V0.5ZM112.5 3.5C113.328 3.5 114 2.82843 114 2C114 1.17157 113.328 0.5 112.5 0.5V3.5ZM117.5 0.5C116.672 0.5 116 1.17157 116 2C116 2.82843 116.672 3.5 117.5 3.5V0.5ZM122.5 3.5C123.328 3.5 124 2.82843 124 2C124 1.17157 123.328 0.5 122.5 0.5V3.5ZM127.5 0.5C126.672 0.5 126 1.17157 126 2C126 2.82843 126.672 3.5 127.5 3.5V0.5ZM132.5 3.5C133.328 3.5 134 2.82843 134 2C134 1.17157 133.328 0.5 132.5 0.5V3.5ZM137.5 0.5C136.672 0.5 136 1.17157 136 2C136 2.82843 136.672 3.5 137.5 3.5V0.5ZM142.5 3.5C143.328 3.5 144 2.82843 144 2C144 1.17157 143.328 0.5 142.5 0.5V3.5ZM147.5 0.5C146.672 0.5 146 1.17157 146 2C146 2.82843 146.672 3.5 147.5 3.5V0.5ZM152.5 3.5C153.328 3.5 154 2.82843 154 2C154 1.17157 153.328 0.5 152.5 0.5V3.5ZM157.5 0.5C156.672 0.5 156 1.17157 156 2C156 2.82843 156.672 3.5 157.5 3.5V0.5ZM162.5 3.5C163.328 3.5 164 2.82843 164 2C164 1.17157 163.328 0.5 162.5 0.5V3.5ZM167.5 0.5C166.672 0.5 166 1.17157 166 2C166 2.82843 166.672 3.5 167.5 3.5V0.5ZM172.5 3.5C173.328 3.5 174 2.82843 174 2C174 1.17157 173.328 0.5 172.5 0.5V3.5ZM177.5 0.5C176.672 0.5 176 1.17157 176 2C176 2.82843 176.672 3.5 177.5 3.5V0.5ZM182.5 3.5C183.328 3.5 184 2.82843 184 2C184 1.17157 183.328 0.5 182.5 0.5V3.5ZM187.5 0.5C186.672 0.5 186 1.17157 186 2C186 2.82843 186.672 3.5 187.5 3.5V0.5ZM192.5 3.5C193.328 3.5 194 2.82843 194 2C194 1.17157 193.328 0.5 192.5 0.5V3.5ZM197.5 0.5C196.672 0.5 196 1.17157 196 2C196 2.82843 196.672 3.5 197.5 3.5V0.5ZM202.5 3.5C203.328 3.5 204 2.82843 204 2C204 1.17157 203.328 0.5 202.5 0.5V3.5ZM207.5 0.5C206.672 0.5 206 1.17157 206 2C206 2.82843 206.672 3.5 207.5 3.5V0.5ZM212.5 3.5C213.328 3.5 214 2.82843 214 2C214 1.17157 213.328 0.5 212.5 0.5V3.5ZM217.5 0.5C216.672 0.5 216 1.17157 216 2C216 2.82843 216.672 3.5 217.5 3.5V0.5ZM0 3.5H2.5V0.5H0V3.5ZM7.5 3.5H12.5V0.5H7.5V3.5ZM17.5 3.5H22.5V0.5H17.5V3.5ZM27.5 3.5H32.5V0.5H27.5V3.5ZM37.5 3.5H42.5V0.5H37.5V3.5ZM47.5 3.5H52.5V0.5H47.5V3.5ZM57.5 3.5H62.5V0.5H57.5V3.5ZM67.5 3.5H72.5V0.5H67.5V3.5ZM77.5 3.5H82.5V0.5H77.5V3.5ZM87.5 3.5H92.5V0.5H87.5V3.5ZM97.5 3.5H102.5V0.5H97.5V3.5ZM107.5 3.5H112.5V0.5H107.5V3.5ZM117.5 3.5H122.5V0.5H117.5V3.5ZM127.5 3.5H132.5V0.5H127.5V3.5ZM137.5 3.5H142.5V0.5H137.5V3.5ZM147.5 3.5H152.5V0.5H147.5V3.5ZM157.5 3.5H162.5V0.5H157.5V3.5ZM167.5 3.5H172.5V0.5H167.5V3.5ZM177.5 3.5H182.5V0.5H177.5V3.5ZM187.5 3.5H192.5V0.5H187.5V3.5ZM197.5 3.5H202.5V0.5H197.5V3.5ZM207.5 3.5H212.5V0.5H207.5V3.5ZM217.5 3.5H220V0.5H217.5V3.5Z"
                    fill="#f7dac5"
                  />
                </Svg>
              )}
            </View>

            <View style={{ flex: 1 }}>
              <Text
                allowFontScaling={false}
                numberOfLines={1}
                style={{
                  fontFamily: "Metropolis-SemiBold",
                  color: "#70cf97",
                  fontSize: RFValue(
                    Platform.OS == "ios" ? 14 : 15,
                    windowHeight
                  ),
                }}
              >
                {userCurrency(userData)}
                {Math.abs(balance.positiveBalance)}
              </Text>
              <Text
                allowFontScaling={false}
                numberOfLines={1}
                style={{
                  fontFamily: "Metropolis-Medium",
                  color: props.type == "home" ? "white" : "black",
                  marginTop: 2,
                  fontSize: RFValue(
                    Platform.OS == "ios" ? 14 : 15,
                    windowHeight
                  ),
                }}
              >
                will get
              </Text>
            </View>
            <View style={{ flex: 1 }}>
              <Text
                numberOfLines={1}
                allowFontScaling={false}
                style={{
                  fontFamily: "Metropolis-SemiBold",
                  color: "#fe6370",
                  fontSize: RFValue(
                    Platform.OS == "ios" ? 14 : 15,
                    windowHeight
                  ),
                }}
              >
                {userCurrency(userData)}
                {Math.abs(balance.negativeBalance)}
              </Text>
              <Text
                numberOfLines={1}
                allowFontScaling={false}
                style={{
                  fontFamily: "Metropolis-Medium",
                  color: props.type == "home" ? "white" : "black",
                  marginTop: 2,
                  fontSize: RFValue(
                    Platform.OS == "ios" ? 14 : 15,
                    windowHeight
                  ),
                }}
              >
                will pay
              </Text>
            </View>
          </Pressable>
        </View>
      </View>
      {/* </View> */}
    </>
  );
};

const styles = StyleSheet.create({
  header: {
    backgroundColor: "white",
    shadowColor: "#000000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 3,
  },
  homeBalance: {
    // height: 120,
    marginTop: -37.5,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    backgroundColor: "#5765DB",
  },
});

export default forwardRef(HomeBalance);
