import React, { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

// Containers
import HomeScreen from "./containers/HomeScreen";
import RoomScreen from "./containers/RoomScreen";
import ProfileScreen from "./containers/ProfileScreen";
import SignInScreen from "./containers/SignInScreen";
import SignUpScreen from "./containers/SignUpScreen";
import SettingsScreen from "./containers/SettingsScreen";

// Components

import Logo from "./components/Logo";
import BackButton from "./components/BackButton";

// Icons
import {
  Ionicons,
  MaterialCommunityIcons,
  AntDesign,
} from "@expo/vector-icons";

// Colors
import colors from "./assets/colors";

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [userToken, setUserToken] = useState(null);
  const [userId, setUserId] = useState(null);

  const setToken = async (token) => {
    if (token) {
      AsyncStorage.setItem("userToken", token);
      setUserToken(token);
    } else {
      AsyncStorage.removeItem("userToken");
      setUserToken(null);
    }
  };

  const setId = async (id) => {
    if (id) {
      AsyncStorage.setItem("userId", id);
      setUserId(id);
    } else {
      AsyncStorage.removeItem("userId");
      setUserId(null);
    }
  };

  useEffect(() => {
    const bootstrapAsync = async () => {
      const userToken = await AsyncStorage.getItem("userToken");
      const userId = await AsyncStorage.getItem("userId");
      setUserToken(userToken);
      setUserId(userId);
      setIsLoading(false);
    };

    bootstrapAsync();
  }, []);

  return (
    <NavigationContainer>
      {isLoading ? null : userToken === null ? (
        <Stack.Navigator
          initialRouteName="SignIn"
          screenOptions={{ headerShown: false }}
        >
          <Stack.Screen name="SignIn">
            {() => <SignInScreen setToken={setToken} setId={setId} />}
          </Stack.Screen>
          <Stack.Screen name="SignUp">
            {() => <SignUpScreen setToken={setToken} setId={setId} />}
          </Stack.Screen>
        </Stack.Navigator>
      ) : (
        // User is signed in
        <Stack.Navigator>
          <Stack.Screen name="Tab" options={{ headerShown: false }}>
            {() => (
              <Tab.Navigator
                tabBarOptions={{
                  activeTintColor: colors.pink,
                  inactiveTintColor: colors.grey,
                }}
              >
                <Tab.Screen
                  name="Home"
                  options={{
                    tabBarLabel: "Home",
                    tabBarIcon: ({ color, size }) => (
                      <Ionicons name={"ios-home"} size={size} color={color} />
                    ),
                  }}
                >
                  {() => (
                    <Stack.Navigator
                      screenOptions={{
                        headerShown: true,
                      }}
                    >
                      <Stack.Screen
                        name="Home"
                        options={{
                          headerTitle: () => <Logo size={"small"} />,
                        }}
                      >
                        {(props) => <HomeScreen {...props} />}
                      </Stack.Screen>
                      <Stack.Screen
                        name="Room1"
                        options={{
                          headerTitle: () => <Logo size={"small"} />,
                          headerLeft: () => <BackButton />,
                        }}
                      >
                        {(props) => <RoomScreen {...props} />}
                      </Stack.Screen>
                    </Stack.Navigator>
                  )}
                </Tab.Screen>

                <Tab.Screen
                  name="Settings"
                  options={{
                    tabBarLabel: "Settings",
                    tabBarIcon: ({ color, size }) => (
                      <Ionicons
                        name={"ios-options"}
                        size={size}
                        color={color}
                      />
                    ),
                  }}
                >
                  {() => (
                    <Stack.Navigator>
                      <Stack.Screen
                        name="Settings"
                        options={{ title: "Settings", tabBarLabel: "Settings" }}
                      >
                        {() => <SettingsScreen setToken={setToken} />}
                      </Stack.Screen>
                    </Stack.Navigator>
                  )}
                </Tab.Screen>
              </Tab.Navigator>
            )}
          </Stack.Screen>
        </Stack.Navigator>
      )}
    </NavigationContainer>
  );
}
