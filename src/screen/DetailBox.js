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
} from "react-native";

const DetailBox = (props) => {
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
        isShow: true,
      },
    ];
    if (props.images.length > 0) {
      imgData = props.images.map((v, i) => {
        let isShown = false;
        if (index < imageData.length) {
          isShown = index === i;
        } else {
          isShown = i === 0;
        }
        return {
          ...v,
          isShow: isShown,
        };
      });
    }
    setImageData(imgData);
  };

  return (
    <View>
      <View style={styles.box}>
        {imageData.map((v, i) => (
          <TouchableOpacity
            style={styles.showImage(v.isShow)}
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
    paddingTop: 16,
  },
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

export default DetailBox;
