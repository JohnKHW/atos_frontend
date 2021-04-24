/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useEffect } from "react";
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Dimensions,
  StatusBar,
  Alert,
} from "react-native";
import DefaultContainer from "src/containers/DefaultContainer";
import LoginPage from "src/containers/Login";
import HeaderIndex from "src/common/HeaderIndex";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import MyDrawer from "src/drawer/drawer";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Article from "src/containers/Article";
import Transport from "src/containers/Transport";
import Scan from "src/containers/Scan";
import Rank from "src/containers/Rank";
import LoadScreen from "src/containers/LoadScreen";
import Congrats from "src/containers/Congrats";
import Scan_2 from "src/containers/Scan_2";
import Report from "src/containers/Scan_report";
import Notification from "src/containers/Notification";
import ScanQR from "src/containers/ScanQR";
import Setting from "src/containers/Setting";
import Help from "src/containers/Help";
import Write from "src/containers/WriteArticle";
import Reply from "src/containers/ReplyArticle";
import Save from "src/containers/SaveCollection";
import ArticleDetail from "src/containers/ArticleDetail";
import ScanFood from "src/containers/ScanFood";
import FinishTutor from "src/containers/FinishTutor";
import Gift from "src/containers/Gift";
import GiftDetail from "src/containers/GiftDetail";
import SignUp from "src/containers/SignUp";
import MyGift from "src/containers/MyGift";
import api from "src/api";
import History from "src/containers/History";
// a drawer navigation bar in the left side
const Drawer = createDrawerNavigator();

// to authentication the identity to assign to which page
const AuthScreen = ({ navigation }) => {
  const loadData = async () => {
    try {
      const isLoggedIn = await AsyncStorage.getItem("LoggedIn"); // use to use the app whether using
      const first = await AsyncStorage.getItem("first"); // whether user is first time use
      //Alert.alert(isLoggedIn);
      //console.log("first",first);
      if (isLoggedIn === "1") {
        api.defaults.headers.common[
          "Authorization"
        ] = await AsyncStorage.getItem("TOKEN");
        if (first === "1") {
          // if first time , then go to help tutorial
          navigation.navigate("Help");
        } else {
          // other go to the home page
          navigation.navigate("DefaultContainer");
        }
      } else {
        // if user haven't login yet , then go to login page
        navigation.navigate("Login");
      }
    } catch (e) {
      //Alert.alert(e);
      console.error(e);
    }
  };
  useEffect(() => {
    // to call the loadData
    loadData();
  });

  return <></>;
};

const App = () => {
  return (
    <>
      <StatusBar barStyle="dark-content" />
      <View style={styles.container}>
        <View style={styles.context}>
          <NavigationContainer>
            <Drawer.Navigator //initialRouteName="AuthScreen"
              initialRouteName="AuthScreen"
              drawerStyle={{
                width: "100%",
                backgroundColor: "rgba(0, 0, 0,0.6)",
              }}
              drawerContent={({ navigation }) => (
                <MyDrawer navigation={navigation} />
              )} // this the drawer screen
              screenOptions={{ swipeEnabled: false }}
            >
              {
                //Here is the screen and the name
              }
              <Drawer.Screen
                name="DefaultContainer"
                component={DefaultContainer}
              />
              <Drawer.Screen name="Login" component={LoginPage} />
              <Drawer.Screen name="AuthScreen" component={AuthScreen} />
              <Drawer.Screen name="Article" component={Article} />
              <Drawer.Screen name="Transport" component={Transport} />
              <Drawer.Screen name="Scan" component={Scan} />
              <Drawer.Screen name="Rank" component={Rank} />
              <Drawer.Screen name="Load" component={LoadScreen} />
              <Drawer.Screen name="Congrats" component={Congrats} />
              <Drawer.Screen name="Scan_2" component={Scan_2} />
              <Drawer.Screen name="Report" component={Report} />
              <Drawer.Screen name="Notification" component={Notification} />
              <Drawer.Screen name="ScanQR" component={ScanQR} />
              <Drawer.Screen name="Setting" component={Setting} />
              <Drawer.Screen name="Help" component={Help} />
              <Drawer.Screen name="Write" component={Write} />
              <Drawer.Screen name="Reply" component={Reply} />
              <Drawer.Screen name="Save" component={Save} />
              <Drawer.Screen name="ArticleDetail" component={ArticleDetail} />
              <Drawer.Screen name="ScanFood" component={ScanFood} />
              <Drawer.Screen name="FinishTutor" component={FinishTutor} />
              <Drawer.Screen name="Gift" component={Gift} />
              <Drawer.Screen name="GiftDetail" component={GiftDetail} />
              <Drawer.Screen name="SignUp" component={SignUp} />
              <Drawer.Screen name="MyGift" component={MyGift} />
              <Drawer.Screen name="History" component={History} />
            </Drawer.Navigator>
          </NavigationContainer>
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#6e8ab5",
  },
  context: {
    backgroundColor: "#6e8ab5",
    height: "100%",
  },
});

export default App;
