import { FlatList, Text, SafeAreaView } from "react-native";
import React, { useState, useEffect } from "react";
import CardBox from "./CardBox";

const ProductsScreen = (navigation) => {
  const [data, setData] = useState([]);

  const getProducts = () => {
    return fetch("http://192.168.56.1:3000/products?_embed=product_images")
      .then((response) => response.json())
      .then((json) => {
        setData(json);
      })
      .catch((error) => {
        console.error(error);
      });
  };
  useEffect(() => {
    getProducts();
  }, []);
  //  navigation.navigate(url: name, {
  //   id: item.id
  //  })
  return (
    <SafeAreaView
      style={{
        padding: 5,
        alignItems: "center",
      }}
    >
      <FlatList
        data={data}
        renderItem={({ item }) => (
          <CardBox
            title={item.name}
            price={item.price}
            showDetail={() => {
              console.log("Go to detail screen");
            }}
            addToChart={() => {
              // console.log("Add to chart click")
              navigation.navigate("DetailScreen", {
                id: item.id,
                // name: item.name,
                // images: item.images["product_images"],
              });
            }}
            addToChart2={() => {
              // console.log("Add to chart click")
              navigation.navigate("ProductDetailViewScreen", {
                id: item.id,
              });
            }}
            imagesDefault={
              item.product_images && item.product_images.length > 0
                ? item.product_images[0]["path"]
                : "https://via.placeholder.com/256x128.png?text=notfound"
            }
          >
            {/* <Text>this is `props.children`</Text> */}
          </CardBox>
        )}
        numColumns={2}
      />
    </SafeAreaView>
  );
};

export default ProductsScreen;
