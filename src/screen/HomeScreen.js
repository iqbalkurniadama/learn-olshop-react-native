import React, { useState, useEffect, useContext } from "react";
import { View, Text, Button, FlatList, StyleSheet } from "react-native";
import { AuthContext } from "./AuthContext";

const HomeScreen = ({ navigation, userToken }) => {
  const { signOut } = useContext(AuthContext);
  const { getToken } = useContext(AuthContext);
  const [data, setData] = useState();
  return (
    <View>
      {/* <View display={getToken() == null ? "flex" : "none"}> */}
      {getToken() == null ? (
        <Button
          color="crimson"
          title="Login"
          onPress={() => navigation.navigate("loginHome")}
        />
      ) : (
        <Button color="crimson" title="signOut" onPress={() => signOut()} />
      )}
      <Button
        title="to store"
        onPress={() => navigation.navigate("ProductsScreen")}
      />
    </View>
  );
};

export default HomeScreen;
