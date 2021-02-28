import React , {useState, useEffect} from 'react';
import {View , Text, StyleSheet, Animated, Easing} from 'react-native';
import {componentStyles} from 'src/common/containerStyles';
const LoadScreen = ({navigation}) => {
    
    const spinValue = new Animated.Value(0);
    const zoomValue = new Animated.Value(0);


    // First set up animation 

    Animated.loop(
      Animated.sequence([
          Animated.timing(
            spinValue,
          {
            toValue: 1,
            duration: 1000,
            easing: Easing.linear,
            useNativeDriver: false,  // To make use of native driver for performance
            
          }
        ),
          Animated.timing(
            spinValue,
          {
            toValue: 0,
            duration: 1000,
            easing: Easing.linear,
            useNativeDriver: false,  // To make use of native driver for performance
            
          }
        ),
        Animated.timing(
          zoomValue,
        {
          toValue: 1,
          duration: 1000,
          easing: Easing.ease,
          useNativeDriver: false,  // To make use of native driver for performance
          
        }
      )
      ])
   
    ).start();
        
    
    // Next, interpolate beginning and end values (in this case 0 and 1)
    const spin = spinValue.interpolate({
      inputRange: [0, 1],
      outputRange: ["90deg", "-90deg"]
      });

    const zoomX = zoomValue.interpolate({
      inputRange: [0,1],
      outputRange: [1,50]
    });
    const zoomY = zoomValue.interpolate({
      inputRange: [0,1],
      outputRange: [1,50]
    });
    
      setTimeout(()=>{
        //Alert.alert("OK");
        //setStop(true);
        navigation.navigate("DefaultContainer");
      },3000);

  
  return ( 

    <View>
        {
          
          <View style={[componentStyles.container_v2,{alignItems: "center",justifyContent: "center"}]}>
            <Animated.Image
              source={require("src/assets/images/icon_earth.png")}
              style={{transform: [{rotate: spin},{scaleX: zoomX},{scaleY: zoomY}],fontSize:50,color:"white"}}
            >
              
            </Animated.Image>
            
          </View>
        }
    </View>
    
  )
}

export default LoadScreen;