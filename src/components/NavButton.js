import React from 'react';
import {Image, Text, TouchableOpacity, StyleSheet} from 'react-native';
import AsyncStorage from "@react-native-async-storage/async-storage";
const NavButton = (props)=> {
  
  const goToScreen = () => {
    
      switch(props.title){
        case "Logout":
           // await AsyncStorage.clear();
            return props.navigation.navigate("Logout");
        case "Setting":
            return props.navigation.navigate("Setting");
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
