import React ,{useState} from 'react';
import {View, Text, StyleSheet,Button, useWindowDimensions} from 'react-native';
import HeaderIndex from 'src/common/HeaderIndex';
import FooterIndex from 'src/common/FooterIndex';
import NavContainer from 'src/containers/NavContainer';
import {createDrawerNavigator} from "@react-navigation/drawer";
import {componentStyles} from 'src/common/containerStyles';
const Drawer = createDrawerNavigator();


const DefaultContainer = ({navigation}) => {
  return (
    <View style={componentStyles.container}>
      <HeaderIndex navigation={navigation}/>
    
      <FooterIndex style={styles.footer} navigation={navigation}/>

    </View>
  );
};

const styles = StyleSheet.create({
  footer: {
    //backgroundColor: '#defef3',
    position: 'absolute',
    bottom: 0,
    width: '100%',
    height: 84,
  },
});
export default DefaultContainer;
