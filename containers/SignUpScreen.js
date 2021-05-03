import React, { useState } from "react";
import {
  Platform,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  View,
} from "react-native";

import axios from "axios";
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
import LargeInput from "../components/Largeinput";

const SignUpScreen = ({ setToken, setId }) => {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [description, setDescription] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(null);

  const handleSubmit = async () => {
    if (email && username && description && password && confirmPassword) {
      if (password === confirmPassword) {
        if (errorMessage !== null) {
          setErrorMessage(null);
        }
        try {
          const response = await axios.post(
            "https://express-airbnb-api.herokuapp.com/user/sign_up",
            {
              email: email,
              username: username,
              description: description,
              password: password,
            }
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
          const errorMessage = error.response.data.error;
          if (
            errorMessage === "This email already has an account." ||
            errorMessage === "This username already has an account."
          ) {
            setErrorMessage(errorMessage);
          } else {
            setErrorMessage("An error occurred");
          }
        }
      } else {
        setErrorMessage("Passwords must be the same");
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
      <KeyboardAwareScrollView style={styles.keyboard}>
        <ScrollView contentContainerStyle={styles.scrollView}>
          <Logo size={"large"} />
          <ScreenTitle title="Sign up" />

          <Input
            keyboardType="email-address"
            placeholder="email"
            setFunction={setEmail}
          />
          <Input placeholder="username" setFunction={setUsername} />
          <LargeInput
            setFunction={setDescription}
            placeholder={"Describe yourself in a few words..."}
          />
          <Input
            placeholder="password"
            secureTextEntry={true}
            setFunction={setPassword}
          />
          <Input
            placeholder="confirm password"
            secureTextEntry={true}
            setFunction={setConfirmPassword}
          />
          <View style={styles.view}>
            <Message message={errorMessage} color="error" />
            <Button text="Sign up" setFunction={handleSubmit} />
            <RedirectButton
              text="Already have an account? Sign in"
              screen="SignIn"
            />
          </View>
        </ScrollView>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
};

export default SignUpScreen;

const styles = StyleSheet.create({
  safeAreaView: {
    flex: 1,
    backgroundColor: colors.bgColor,
  },
  scrollView: {
    backgroundColor: colors.bgColor,
    alignItems: "center",
    justifyContent: "center",
  },
  keyboard: {
    color: colors.bgColor,
  },

  view: {
    marginTop: 30,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
});
