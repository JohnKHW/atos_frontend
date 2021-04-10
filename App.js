/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React ,{useState,useEffect} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Dimensions,
  StatusBar,
  Text,
  Button,
  Alert,
  Animated,
  Easing
} from 'react-native';
import DefaultContainer from 'src/containers/DefaultContainer';
import LoginPage from 'src/containers/Login';
import HeaderIndex from 'src/common/HeaderIndex';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import MyDrawer from 'src/drawer/drawer';
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
import Write from "src/containers/WriteArticle"
import Save from "src/containers/SaveCollection"
import ArticleDetail from "src/containers/ArticleDetail"
import ScanFood from "src/containers/ScanFood"
import FinishTutor from "src/containers/FinishTutor"
import Gift from "src/containers/Gift"
import GiftDetail from "src/containers/GiftDetail"
const Drawer = createDrawerNavigator();

const AuthScreen = ({navigation}) =>{

  const loadData = async() =>{
    try{
      const isLoggedIn = await AsyncStorage.getItem("token");
      //Alert.alert(isLoggedIn);
      if(isLoggedIn)
        navigation.navigate("Help" , {
          count:0
        });
      else
        navigation.navigate("Help",{
          count:1
        });
      //navigation.navigate((isLoggedIn !== 1) ? "Login": "DefaultContainer" );
    }catch(e){
      Alert.alert(e);
    }
  };
  loadData();
  return (
    <>
    </>
  )
}


const App = () => {
  return (
    <>
      <StatusBar barStyle="dark-content" />
      <View style={styles.container}>
        <View style={styles.context}>
          
          <NavigationContainer>
            <Drawer.Navigator //initialRouteName="AuthScreen"
            initialRouteName="Gift"
            drawerStyle={{
              width:"100%",
              backgroundColor: "rgba(0, 0, 0,0.6)"
            }
            }
            drawerContent={({navigation})=> (<MyDrawer navigation={navigation}/>)}>
              <Drawer.Screen name="DefaultContainer" component={DefaultContainer}/>
              <Drawer.Screen name='Login' component={LoginPage}/>
              <Drawer.Screen name='AuthScreen' component={AuthScreen}/>
              <Drawer.Screen name='Article' component={Article}/>
              <Drawer.Screen name='Transport' component={Transport}/>
              <Drawer.Screen name='Scan' component={Scan}/>
              <Drawer.Screen name='Rank' component={Rank}/>
              <Drawer.Screen name='Load' component={LoadScreen}/>
              <Drawer.Screen name='Congrats' component={Congrats}/>
              <Drawer.Screen name='Scan_2' component={Scan_2}/>
              <Drawer.Screen name='Report' component={Report}/>
              <Drawer.Screen name='Notification' component={Notification}/>
              <Drawer.Screen name='ScanQR' component={ScanQR}/>
              <Drawer.Screen name='Setting' component={Setting}/>
              <Drawer.Screen name='Help' component={Help}/>
              <Drawer.Screen name='Write' component={Write}/>
              <Drawer.Screen name='Save' component={Save}/>
              <Drawer.Screen name='ArticleDetail' component={ArticleDetail}/>
              <Drawer.Screen name='ScanFood' component={ScanFood}/>
              <Drawer.Screen name='FinishTutor' component={FinishTutor}/>
              <Drawer.Screen name='Gift' component={Gift}/>
              <Drawer.Screen name='GiftDetail' component={GiftDetail}/>
            </Drawer.Navigator>

          </NavigationContainer>
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#6e8ab5',
    
  },
  context: {
    backgroundColor: '#6e8ab5',
    height: '100%',
  },
});

export default App;
