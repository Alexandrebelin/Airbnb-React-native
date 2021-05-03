import React, { useState } from "react";

import {
  StatusBar,
  View,
  StyleSheet,
  Dimensions,
  SafeAreaView,
  Platform,
  ScrollView,
} from "react-native";

import axios from "axios";
import Constants from "expo-constants";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

// Colors
import colors from "../assets/colors";

// Components
import Logo from "../components/Logo";
import ScreenTitle from "../components/ScreenTitle";
import Message from "../components/Message";
import Button from "../components/Button";
import RedirectButton from "../components/RedirectButton";
import Input from "../components/Input";

// Dimensions
const windowHeight = Dimensions.get("window").height;
const statusBarHeight = Constants.statusBarHeight;
const scrollViewHeight = windowHeight - statusBarHeight;

const SignInScreen = ({ setToken, setId }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(null);

  const handleSubmit = async () => {
    if (email && password) {
      if (errorMessage !== null) {
        setErrorMessage(null);
      }
      try {
        const response = await axios.post(
          "https://express-airbnb-api.herokuapp.com/user/log_in",
          { email: email, password: password }
        );

        if (response.data.token && response.data.id) {
          const token = response.data.token;
          const id = response.data.id;
          setToken(token);
          setId(id);
        } else {
          setErrorMessage("An error occurred");
        }
      } catch (error) {
        if (error.response.status === 401) {
          setErrorMessage("Incorrect credentials");
        } else {
          setErrorMessage("An error occurred");
        }
      }
    } else {
      setErrorMessage("Please fill all fields");
    }
  };

  return (
    <SafeAreaView style={styles.safeAreaView}>
      <StatusBar
        barStyle={Platform.OS === "ios" ? "dark-content" : "light-content"}
      />

      <KeyboardAwareScrollView>
        <ScrollView contentContainerStyle={styles.scrollView}>
          <View style={styles.view}>
            <Logo size={"large"} />
            <ScreenTitle title={"Sign in"} />
          </View>
          <View style={styles.view}>
            <Input
              setFunction={setEmail}
              keyboardType={"email-address"}
              placeholder={"email"}
            />

            <Input
              setFunction={setPassword}
              secureTextEntry={true}
              placeholder={"password"}
            />
          </View>
          <View style={styles.view}>
            <Message message={errorMessage} color="error" />
            <Button text="Sign in" setFunction={handleSubmit} />
            <RedirectButton text="No account ? Register" screen="SignUp" />
          </View>
        </ScrollView>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
};

export default SignInScreen;

const styles = StyleSheet.create({
  safeAreaView: {
    backgroundColor: colors.bgColor,
  },
  scrollView: {
    flex: 1,
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
