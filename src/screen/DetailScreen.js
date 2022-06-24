import React, { useState, useEffect } from "react";
import Detail from "./DetailBox";
import {
  View,
  Text,
  Button,
  FlatList,
  StyleSheet,
  TextInput,
  Image,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import DetailBox from "./DetailBox";
import ProductsScreen from "./ProductsScreen";

const DetailScreen = ({ route, navigation }) => {
  const { id } = route.params;
  const [data, setData] = useState([]);
  const getDetail = () => {
    return fetch(
      `http://192.168.56.1:3000/products/${id}?_embed=product_images`
    )
      .then((response) => response.json())
      .then((json) => {
        // console.log(Object.keys(json).length);
        if (Object.keys(json).length > 0) {
          setData(json);
          // console.log(json);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };
  useEffect(() => {
    getDetail();
  }, []);

  return (
    <SafeAreaView
      style={{
        padding: 5,
      }}
    >
      {Object.keys(data).length > 0 ? (
        <>
          <DetailBox
            title={data.name}
            price={""}
            description={""}
            images={data["product_images"]}
          >
            <FlatList />
          </DetailBox>
          <ProductsScreen />
        </>
      ) : (
        <>
          <Text>isloading...</Text>
        </>
      )}
    </SafeAreaView>
  );
};

export default DetailScreen;
