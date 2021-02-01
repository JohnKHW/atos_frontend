import React from 'react';
import {Image, Text, TouchableOpacity, StyleSheet,Alert} from 'react-native';
import AsyncStorage from "@react-native-async-storage/async-storage";
const NavButton = (props)=> {
  const goToScreen = async() => {
    {
      switch(props.title){
        case "Logout":
            //await AsyncStorage.clear();
            
            return props.navigation.navigate("Login");
            
      }
    }

      {/*
      return ({
        Logout: (props.title == "Logout") ? props.navigation.navigate("Login"): null , 
        //DefaultContainer: (props.title == "Help") ? props.navigation.navigate("DefaultContainer"): null , 

        }
      );*/
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
