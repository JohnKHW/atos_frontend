import React from 'react';
import {Image, Text, TouchableOpacity, StyleSheet,Alert} from 'react-native';
import AsyncStorage from "@react-native-async-storage/async-storage";
import ConfigSetup from "src/common/ConfigSetup";
const NavButton = (props)=> {
  
  //assign to the props given screen
  const goToScreen = async() => {
    
      switch(props.title){
        case "Logout":
            await AsyncStorage.removeItem("LoggedIn"); // clear local storage
            return props.navigation.navigate("Login");
        case "Setting":
            return props.navigation.navigate("Setting");
        case "Help":
            return props.navigation.navigate("Help");
      }
    

  }

  return (
    <TouchableOpacity onPress={goToScreen} style={[styles.icon, props.style]}>
      <Image style={styles.image} source={props.img} />
      <Text style={styles.title}>{props.title}</Text>
    </TouchableOpacity>
   
  );
};

const styles = StyleSheet.create({
  icon: {
    flexDirection: 'row',
    width: 130,
    shadowRadius: 6,
    shadowOpacity: 0.52,
    shadowOffset: {
      height: 3,
    },
    shadowColor: '#9A9A9A',
    
  },
  title: {
    fontSize: 17,
    marginLeft: 20,
    fontWeight: 'bold',
    color: 'white',
    alignSelf: 'center',
  },
  image: {
    tintColor:"white",
  },

});
export default NavButton;
