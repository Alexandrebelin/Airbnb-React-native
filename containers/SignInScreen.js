import React, { useState } from "react";
import { useNavigation } from "@react-navigation/core";
import {
  StatusBar,
  Text,
  TextInput,
  View,
  TouchableOpacity,
  KeyboardAvoidingView,
  StyleSheet,
  Dimensions,
  SafeAreaView,
  Platform,
  ScrollView,
} from "react-native";
import Constants from "expo-constants";

import { Entypo } from "@expo/vector-icons";

// Colors
import colors from "../assets/colors";

import Logo from "../components/Logo";

import ScreenTitle from "../components/ScreenTitle";
import Message from "../components/Message";
import Button from "../components/Button";
import RedirectButton from "../components/RedirectButton";

// Dimensions
const windowHeight = Dimensions.get("window").height;
const statusBarHeight = Constants.statusBarHeight;
const scrollViewHeight = windowHeight - statusBarHeight;

const SignInScreen = ({ setToken }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(null);
  return (
    <SafeAreaView style={styles.safeAreaView}>
      <StatusBar
        barStyle={Platform.OS === "ios" ? "dark-content" : "light-content"}
      />

      <KeyboardAvoidingView>
        <ScrollView contentContainerStyle={styles.scrollView}>
          <View style={styles.view}>
            <Logo size={"large"} />
            <ScreenTitle title={"Sign in"} />
          </View>
          <View style={styles.view}>
            <TextInput
              setFunction={setEmail}
              keyboardType={"email-address"}
              placeholder={"email"}
            />

            <TextInput
              setFunction={setPassword}
              secureTextEntry={true}
              placeholder={"password"}
            />
          </View>
          <View style={styles.view}>
            <Message message={errorMessage} color="error" />
            <Button text="Sign in" />
            <RedirectButton text="No account ? Register" screen="SignUp" />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default SignInScreen;

const styles = StyleSheet.create({
  safeAreaView: {
    backgroundColor: colors.bgColor,
  },
  scrollView: {
    // flex: 1,
    backgroundColor: colors.bgColor,
    alignItems: "center",
    justifyContent: "space-around",
    height: scrollViewHeight,
  },
  view: {
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  input: {},
});
