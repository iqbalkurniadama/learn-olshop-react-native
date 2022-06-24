import React, { useState, useRef, useContext, useEffect } from "react";
import {
  Text,
  View,
  TextInput,
  Button,
  TouchableOpacity,
  Animated,
  ActivityIndicator,
} from "react-native";
import { Style } from "../styles/Style";
import { AuthContext } from "./AuthContext";
// import CheckBox from "@react-native-community/checkbox";

const Login = () => {
  const [data, setData] = useState([]);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState();
  const [message, setMessage] = useState();
  const [isLoading, setLoading] = useState(false);

  const { signIn } = useContext(AuthContext);

  const fadeAnim = useRef(new Animated.Value(0)).current;

  const animasi = (num) => {
    Animated.timing(fadeAnim, {
      toValue: num,
      duration: 3000,
    }).start();
  };
  const getData = () => {
    setLoading(true);
    fetch(
      "http://192.168.56.1:3000/login?email=" + email + "&password=" + password
    )
      .then((response) => response.json())
      .then((json) => {
        animasi(1);
        setMessage("gagal");
        setTimeout(() => {
          animasi(0);
          setLoading(false);
        }, 3000);
        if (json.length > 0) {
          setMessage("anda berhasil");
          signIn({
            id: json[0]["id"],
          });
          setLoading(true);
        }
        setData(json);
        // console.log(json);
      })
      .catch((err) => {
        console.log(err.message);
        setLoading(false);
      });
  };

  return (
    <View style={Style.container}>
      <ActivityIndicator size="large" color="crimson" animating={isLoading} />
      <Animated.View style={{ ...Style.text, opacity: fadeAnim }}>
        <Text>{message}</Text>
      </Animated.View>
      <View style={Style.wrapper}>
        <TextInput
          style={Style.input}
          value={email}
          onChangeText={(text) => setEmail(text)}
          placeholder="Masukkan Email"
        />
        <TextInput
          style={Style.input}
          value={password}
          onChangeText={(text) => setPassword(text)}
          placeholder="Masukkan Password"
          secureTextEntry
        />
        <Button color="crimson" title="masuk" onPress={() => getData()} />
      </View>
      <View style={{ flexDirection: "row", marginTop: 10 }}>
        <Text>apakah anda memiliki akun?</Text>
        <TouchableOpacity>
          <Text style={Style.link}> Register</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
export default Login;
