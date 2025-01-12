import React, { useState, useEffect } from "react";
import HeaderIndex from "src/common/HeaderIndex";
import FooterIndex from "src/common/FooterIndex";
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Text,
  Dimensions,
  TextInput,
  Alert,
  Image,
  FlatList,
} from "react-native";
import { ComponentStyles } from "src/common/ContainerStyles";
import BaseButton from "src/components/BaseButton";
import DefaultContainer from "src/containers/DefaultContainer";
import AsyncStorage from "@react-native-async-storage/async-storage";
import LoadScreen from "src/containers/LoadScreen";
import api from "../api";
const window = Dimensions.get("window");

//login page
const Login = ({ navigation }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [load, setLoad] = useState(true);

  const icon = {
    loginIcon: {
      img: require("src/assets/images/icon_loginIcon.png"),
    },
  };

  const authentication = async () => {
    // fetching data
    const formData = new FormData();
    formData.append("username", username);
    formData.append("password", password);
    api
      .post("/api/user/login", formData, {})
      .then(async (response) => {
        console.log("response", response.data);
        const data = response.data;
        const TOKEN = "Bearer " + data.token;
        await AsyncStorage.setItem("TOKEN", TOKEN);
        await AsyncStorage.setItem("LoggedIn", "1");
        await AsyncStorage.setItem("first", "1");
        await AsyncStorage.setItem("username", data.user.name);
        api.defaults.headers.common["Authorization"] = TOKEN;
        navigation.navigate("Load");
      })
      .catch(function (error) {
        console.log(error);
        Alert.alert("Login Fail");
        setUsername("");
        setPassword("");
      });
  };
  //clear data
  useEffect(() => {
    const clearData = navigation.addListener("focus", () => {
      setUsername("");
      setPassword("");
    });
    return () => {
      clearData;
    };
  }, [navigation]);

  return (
    <>
      <View style={[ComponentStyles.container_v2, { alignItems: "center" }]}>
        <View>
          <Image source={icon.loginIcon.img} style={styles.logo} />
        </View>
        <View style={styles.container}>
          <TextInput
            style={styles.input}
            placeholder="User ID"
            autoCapitalize="none"
            onChangeText={(username) => setUsername(username)}
            value={username}
          />
          <TextInput
            style={styles.input}
            placeholder="Password"
            secureTextEntry={true}
            autoCapitalize="none"
            onChangeText={(password) => setPassword(password)}
            value={password}
          />
          <TouchableOpacity style={styles.LoginBtn} onPress={authentication}>
            <Text style={styles.LoginText}>Login</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.Register}
            onPress={() => navigation.navigate("SignUp")}
          >
            <Text style={styles.LoginText}>Register Now</Text>
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  LoginBtn: {
    borderWidth: 3,
    borderRadius: 50,
    borderColor: "#0f0f0f",
    justifyContent: "center",
    alignItems: "center",
    width: 170,
    padding: 10,
    marginTop: 50,
    backgroundColor: "#6488E4",
  },
  LoginText: {
    fontSize: 25,
    color: "#ffffff",
  },
  container: {
    justifyContent: "center",
    alignItems: "center",
  },
  input: {
    marginTop: 20,
    marginBottom: 20,
    paddingLeft: 15,
    width: 300,
    height: 50,
    borderWidth: 3,
    borderRadius: 50,
    fontSize: 25,
  },
  logo: {
    height: 200,
    width: 200,
    marginTop: 100,
    marginBottom: 40,
  },

  Register: {
    borderWidth: 3,
    borderRadius: 50,
    borderColor: "#0f0f0f",
    justifyContent: "center",
    alignItems: "center",
    width: 170,
    padding: 10,
    marginTop: 20,
  },
  loadingScreen: {},
});

export default Login;
