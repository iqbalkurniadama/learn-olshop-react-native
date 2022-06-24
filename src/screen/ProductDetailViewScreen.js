import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Button,
  FlatList,
  StyleSheet,
  TextInput,
  Image,
  TouchableOpacity,
  ScrollView,
  StatusBar,
  Dimensions,
} from "react-native";
import DetailBox from "./DetailBox";

const ProductDetailViewScreen = (props) => {
  const [imageData, setImageData] = useState([]);

  useEffect(() => {
    showImage(0);
  }, []);

  const showImage = (index) => {
    const defaulImage = "https://via.placeholder.com/256x128.png";
    let imgData = [
      {
        id: 0,
        productId: 0,
        path: defaulImage,
      },
    ];
    if (props.images.length > 0) {
      imgData = props.images;
    }
    setImageData(imgData);
  };

  return (
    <View>
      <View style={styles.box}>
        <ScrollView style={styles.scrollView} horizontal={true}>
          {imageData.map((v, i) => (
            <TouchableOpacity
              style={{
                width: Dimensions.get("window"),
                ...styles.showImage(v.isShow),
              }}
              onPress={() => {
                showImage(1 + i);
              }}
            >
              <Image
                source={{
                  uri: v.path,
                }}
                style={styles.image}
              />
              <Text>{1 + i}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        <View style={styles.addToChartBox}>
          <Text style={styles.title}>{props.title}</Text>
          <Text style={styles.readyQty}></Text>
        </View>
        <View style={styles.addToChartBox}>
          <Button title="-" style={styles.qtyBtn} />
          <TextInput style={styles.textInput} defaultValue="  1" />
          <Button title="+" style={styles.qtyBtn} />
          <View style={styles.addToChartBtn}>
            <Button title="ADD" />
          </View>
        </View>
        <Text style={styles.description}></Text>
      </View>
      <View></View>
    </View>
  );
};

const styles = StyleSheet.create({
  box: {
    backgroundColor: "#FFF",
  },
  image: {
    height: 200,
  },
  scrollView: {},

  title: {
    padding: 10,
  },
  addToChartBox: {
    flexDirection: "row",
    paddingLeft: 10,
  },
  qtyBtn: {},
  textInput: {
    borderWidth: 1,
  },
  addToChartBtn: {
    position: "absolute",
    right: 0,
    paddingRight: 10,
  },
  description: {
    padding: 10,
  },
  readyQty: {
    position: "absolute",
    right: 0,
    paddingRight: 10,
  },
  showImage: (isShow) => ({
    display: isShow ? "flex" : "none",
  }),
});

export default ProductDetailViewScreen;
