import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Text,
  TextInput,
  Alert,
  Image,
  ScrollView,
} from "react-native";
import { ComponentStyles } from "src/common/ContainerStyles";

import AsyncStorage from "@react-native-async-storage/async-storage";

import ConfigSetup from "src/common/ConfigSetup";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import api from "../api";
//this is the signup page
const SignUp = (props) => {
  // fields
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [cPassword, setCPassword] = useState(""); // for confirm password

  const icon = {
    loginIcon: {
      img: require("src/assets/images/icon_loginIcon.png"),
    },
  };
  const reset = () => {
    setUsername("");
    setPassword("");
    setName("");
    setCPassword("");
    setEmail("");
  };
  const setupData = async () => {
    if (cPassword === password) {
      const formData = new FormData();
      formData.append("username", username);
      formData.append("email", email);
      formData.append("name", name);
      formData.append("password", password);
      api
        .post("/api/user/register", formData, {})
        .then(async (response) => {
          console.log("response", response.data);
          const data = response.data;
          const TOKEN = "Bearer " + data.token;
          await AsyncStorage.setItem("TOKEN", TOKEN);
          await AsyncStorage.setItem("LoggedIn", "1");
          await AsyncStorage.setItem("first", "1");
          await AsyncStorage.setItem("username", data.user.name);
          api.defaults.headers.common["Authorization"] = TOKEN;
          props.navigation.navigate("Load");
        })
        .catch(function (error) {
          console.log(error);
          Alert.alert("Register Fail");
          reset();
        });
      // check equal, yes then send data
      /*  fetch(
        `${ConfigSetup.getAPI()}api/user/register?username=${username}&name=${username}&email=${email}&password=${password}`,
        {
          method: "POST",
        }
      )
        .then((response) => {
          if (response.status === 200) {
            return response.json();
          }
        })
        //If response is in json then in success
        .then(async (data) => {
          //Success
          console.log(JSON.stringify(data));
          await AsyncStorage.setItem("first", "1");
          props.navigation.navigate("Login");
        })
        //If response is not in json then in error
        .catch((error) => {
          //Error
          console.error(error);
        }); */
    }
  };
  // clear data
  useEffect(() => {
    const clearData = props.navigation.addListener("focus", () => {
      reset();
    });
    return () => {
      clearData;
    };
  }, [props.navigation]);

  return (
    <>
      <View style={[ComponentStyles.container_v2, { alignItems: "center" }]}>
        <View style={{ marginTop: hp("-5%") }}>
          <Image source={icon.loginIcon.img} style={styles.logo} />
        </View>
        <View style={[styles.container]}>
          <TextInput
            style={styles.input}
            placeholder="Email"
            autoCapitalize="none"
            onChangeText={(email) => setEmail(email)}
            value={email}
          />
          <TextInput
            style={styles.input}
            placeholder="User ID"
            autoCapitalize="none"
            onChangeText={(username) => setUsername(username)}
            value={username}
          />
          <TextInput
            style={styles.input}
            placeholder="Display Name"
            autoCapitalize="none"
            onChangeText={(name) => setName(name)}
            value={name}
          />
          <TextInput
            style={styles.input}
            placeholder="Password"
            secureTextEntry={true}
            autoCapitalize="none"
            onChangeText={(password) => setPassword(password)}
            value={password}
          />
          <TextInput
            style={styles.input}
            placeholder="Confirm your password"
            secureTextEntry={true}
            autoCapitalize="none"
            onChangeText={(cPassword) => setCPassword(cPassword)}
            value={cPassword}
          />

          <View>
            <TouchableOpacity style={styles.SignupBtn} onPress={setupData}>
              <Text style={styles.LoginText}>Sign Up</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.SignupBtn}
              onPress={() => props.navigation.navigate("Login")}
            >
              <Text style={styles.LoginText}>Sign In</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  SignupBtn: {
    borderWidth: 3,
    borderRadius: 50,
    borderColor: "#0f0f0f",
    justifyContent: "center",
    alignItems: "center",
    width: 170,
    padding: 10,
    marginTop: hp("1%"),
    backgroundColor: "#6488E4",
    marginVertical: 5,
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
    marginVertical: 5,
    paddingLeft: 15,
    width: wp("70%"),
    height: hp("7%"),
    borderWidth: 3,
    borderRadius: 50,
    fontSize: 25,
  },
  logo: {
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

export default SignUp;
