import React ,{useState,useEffect} from 'react';
import {View, Text, StyleSheet,Button, useWindowDimensions, Image} from 'react-native';
import HeaderIndex from 'src/common/HeaderIndex';
import FooterIndex from 'src/common/FooterIndex';
import NavContainer from 'src/containers/NavContainer';
import {createDrawerNavigator} from "@react-navigation/drawer";
import {componentStyles} from 'src/common/containerStyles';
import NetPoint from 'src/components/NetPoint';
import ConfigSetup from "src/common/ConfigSetup";
const Drawer = createDrawerNavigator();

const DefaultContainer = ({navigation}) => {
  
const [username, setUsername]= useState("Brian Wong");
useEffect(() => {
  const getName = navigation.addListener('focus' , () => {
      //setUsername(ConfigSetup.getAPI());
  })
  return () => {
    getName;
  }
},[navigation])
  return (
    <View style={componentStyles.container_v2}>
      <HeaderIndex navigation={navigation}/>

      <View>
        <Text style={[styles.welcomeText,{marginTop:50}]}>
            Welcome Back!
        </Text>
        <Text style={styles.welcomeText}>
            {username}
        </Text>
        <View style={styles.iconContain}>
          <Image style={styles.icon}
            source={require("src/assets/images/icon_icon.png")}>
            </Image> 
          <View style={styles.contry}>
            <Image source={require('src/assets/images/icon_hongkongFlag.png')} />
            <Text style={styles.loca}>Hong Kong</Text>
          </View>
        </View>
        <NetPoint netpoint="00000" text="you now have earned"/>
      </View>
      <FooterIndex style={styles.footer} navigation={navigation}/>

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    //alignSelf: 'center',
  },
  footer: {
    //backgroundColor: '#defef3',
    position: 'absolute',
    bottom: 0,
    width: '100%',
    height: 84,
  },
  loca:{
    fontSize: 14,
    alignSelf: 'center',
    color: '#676767',  
  },
  iconContain: {
    margin: 6,
    alignSelf: 'center',
    width: 200,
    height: 200,
    backgroundColor: '#EFEFEF',
    borderRadius: 500,
    shadowRadius: 6,
    shadowOpacity: 0.52,
    shadowOffset: {
      height: 1,
    },
    shadowColor: '#9A9A9A',
  },
  icon: {
    alignSelf: 'center',
    width: '100%',
    height: '100%',
    borderRadius: 500,
  },
  contry: {
    alignSelf: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    width: 174,
    fontSize: 14,
    paddingHorizontal: 25,
    paddingVertical: 5,
    marginTop:25,
    marginBottom:25,
    backgroundColor: '#F5F5F5',
    borderRadius: 16,
    shadowRadius: 6,
    shadowOpacity: 0.52,
    shadowOffset: {
      height: 4,
    },
    shadowColor: '#9A9A9A',
  },
  welcomeText: {
    color: '#f5f5f5',
    fontSize: 24,
    fontWeight: 'bold',
    shadowRadius: 6,
    shadowOpacity: 0.52,
    shadowOffset: {
      height: 4,
    },
    shadowColor: '#9A9A9A',
    justifyContent: 'center',
    alignSelf: 'center',
    transform: [{translateY: -15}],
  },
});
export default DefaultContainer;
