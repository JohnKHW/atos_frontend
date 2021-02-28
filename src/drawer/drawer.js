import React from 'react';
import NavContainer from 'src/containers/NavContainer';
import {View,Button,Alert} from "react-native";
import {DrawerItem} from "@react-navigation/drawer";
export default function MyDrawer ({navigation}){
  //const navigation = useNavigation();
  return (
        <View>
           <NavContainer navigation={navigation}/>
          </View>
  );
}
