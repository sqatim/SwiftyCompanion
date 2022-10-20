import React, { useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Login from "./Login";
import Home from "./Home";
import User from "./User";
import { useAuthContext } from "./AuthProviderContext";
// import * as Linking from "expo-linking";

const Stack = createNativeStackNavigator();

export default function Routes() {
  let { state } = useAuthContext();
  // const prefix = Linking.createURL("/");
  // const linking = {
  //   prefixes: [prefix],
  // };
  // useEffect(() => {
  //   console.log("prefix:", state);
  // }, [state]);
  return (
    <NavigationContainer>
      <Stack.Navigator>
        {state.userToken ? (
          <>
            <Stack.Screen name="Home" component={Home} />
            <Stack.Screen name="User" component={User} />
          </>
        ) : (
          <Stack.Screen name="Login" component={Login} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
