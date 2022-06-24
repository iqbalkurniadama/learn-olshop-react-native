import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect, useRef } from "react";
import { StyleSheet, Text, View } from "react-native";
import { DrawerActions, NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createDrawerNavigator } from "@react-navigation/drawer";
import HomeScreen from "./src/screen/HomeScreen";
import Login from "./src/screen/Login";
import { AuthContext } from "./src/screen/AuthContext";
// import Card from "./src/screen/Card";
import ProductsScreen from "./src/screen/ProductsScreen";
import DetailScreen from "./src/screen/DetailScreen";
import ProductDetailViewScreen from "./src/screen/ProductDetailViewScreen";

const Stack = createNativeStackNavigator();

export default function App() {
  const [state, dispatch] = React.useReducer(
    (prevState, action) => {
      switch (action.type) {
        case "RESTORE_TOKEN":
          return {
            ...prevState,
            userToken: action.token,
            isLoading: false,
          };
        case "SIGN_IN":
          return {
            ...prevState,
            isSignout: false,
            userToken: action.token,
          };
        case "SIGN_OUT":
          return {
            ...prevState,
            isSignout: true,
            userToken: null,
          };
      }
    },
    {
      isLoading: true,
      isSignout: false,
      userToken: null,
    }
  );

  React.useEffect(() => {
    // Fetch the token from storage then navigate to our appropriate place
    const bootstrapAsync = async () => {
      let userToken;

      try {
        userToken = await SecureStore.getItemAsync("userToken");
      } catch (e) {
        // Restoring token failed
      }
      dispatch({ type: "RESTORE_TOKEN", token: userToken });
    };

    bootstrapAsync();
  }, []);

  const authContext = React.useMemo(
    () => ({
      signIn: async (data) => {
        dispatch({ type: "SIGN_IN", token: data.id });
        console.log(data.id);
      },
      signOut: () => dispatch({ type: "SIGN_OUT" }),
      signUp: async (data) => {
        dispatch({ type: "SIGN_IN", token: "dummy-auth-token" });
      },
      getToken: () => {
        // console.log(state.userToken);
        return state.userToken;
      },
    }),
    [state.userToken]
  );

  // const LoginScreen = (props) => {
  //   return <Login authContext={AuthContext} />;
  // };
  // const Home = ({ navigation }) => {
  //   return (
  //     <HomeScreen
  //       navigation={navigation}
  //       authContext={AuthContext}
  //       userToken={state.userToken}
  //     />
  //   );
  // };

  return (
    <AuthContext.Provider value={authContext}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="HomeScreen"
            options={{ headerShown: true }}
            component={HomeScreen}
          />
          <Stack.Screen
            name="ProductsScreen"
            options={{ headerShown: true }}
            component={ProductsScreen}
          />
          <Stack.Screen
            name="DetailScreen"
            options={{ headerShown: true }}
            component={DetailScreen}
          />
          <Stack.Screen
            name="ProductDetailViewScreen"
            options={{ headerShown: true }}
            component={ProductDetailViewScreen}
          />
          {state.userToken == null ? (
            <>
              <Stack.Screen
                name="loginHome"
                component={Login}
                options={{ headerShown: false }}
              />
            </>
          ) : (
            <></>
          )}
        </Stack.Navigator>
      </NavigationContainer>
    </AuthContext.Provider>
  );
}
