import React from "react";
import { View, Text, StyleSheet, Button, Image } from "react-native";
import ProductDetailViewScreen from "./ProductDetailViewScreen";

const CardBox = ({ navigation, ...props }) => {
  const [color, setColor] = React.useState("#FFEB3B");

  return (
    <View style={styles.box}>
      <View style={styles.imageBox}>
        <Image
          style={styles.image}
          source={{
            uri: props.imagesDefault,
          }}
        />
        <View style={styles.liteBox}></View>
      </View>
      <View style={styles.innerBox}>
        <Text style={styles.title} onPress={props.showDetail}>
          {props.title}
        </Text>
        <Text style={styles.price}>{props.price}</Text>
        <View style={styles.addToChartBtn}>
          <Button
            color="#FFEE58"
            title="Add To Chart"
            onPress={props.addToChart}
          />
        </View>
        <View style={styles.addToChartBtn}>
          <Button
            color="#2980b9"
            title="Add To Chart 2"
            onPress={props.ProductDetailViewScreen}
          />
        </View>
        {props.children}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  box: {
    backgroundColor: "#fff",
    margin: 4,
    minHeight: 250,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: "#fff",
  },
  innerBox: {
    padding: 20,
  },
  title: {
    margin: 4,
  },
  price: {
    color: "#81C784",
    margin: 4,
  },
  addToChartBtn: {
    marginTop: 16,
  },
  image: {
    width: 50,
    height: 50,
    position: "absolute",
    left: 40,
    top: 50,
    zIndex: 1,
  },
  imageBox: {
    height: 115,
  },
  liteBox: {
    backgroundColor: "#FB8C00",
    width: 100,
    height: 115,
    borderTopLeftRadius: 50,
    borderBottomRightRadius: 50,
    position: "absolute",
    right: 0,
  },
});

export default CardBox;
