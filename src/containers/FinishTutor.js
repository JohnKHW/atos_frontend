import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import HeaderIndex from 'src/common/HeaderIndex';
import FooterIndex from 'src/common/FooterIndex';
import AsyncStorage from "@react-native-async-storage/async-storage";
import {componentStyles} from 'src/common/containerStyles';
const FinishTutor = (props) => {
    return (
        <>
        <HeaderIndex navigation={props.navigation}/>
            <View style = {[componentStyles.container_v2,{alignItems: "center"}]}>
               
            <View style={styles.helpContainer}>
                        <Text style={styles.helpText}>That's the end of the tutorial!</Text>
                        <View style={{marginTop:50}}>
                          <Text style={styles.helpText}>You can watch it again anytime under help of the menu. </Text>
                        </View>
                        <View style={{marginTop:50}}>
                          <Text style={styles.helpText}>Hope you can enjoy the journey of decarbonization. </Text>
                        </View>
                        <TouchableOpacity style={styles.helpBtnContainer} 
                            onPress={async()=>{
                              await AsyncStorage.removeItem("first");

                              props.navigation.navigate("DefaultContainer",{
                                  countHelp:0
                              });
                          }
                        }>
            
                          <Text style={styles.helpBtnText}>Got it</Text>
                        </TouchableOpacity>
                        
                    </View>
            </View>
            <FooterIndex style={styles.footer} navigation={props.navigation}/>
        </>
    )
}

const styles = StyleSheet.create({
    footer: {
        position: 'absolute',
        bottom: 0,
        width: '100%',
        height: 84,
      },
      helpContainer: {
          backgroundColor: "rgba(255, 255, 255,0.3)",
          borderColor:"white",
          borderWidth:2,
          borderRadius:50,
          height:453,
          marginTop: 50,
          width:292,
          alignItems: "center",
          justifyContent: "center",
      },
      helpText: {
        fontSize:18,
        textAlign: 'center',
        fontWeight: 'bold',
        color: '#309397',
        width: 250,
        textTransform: 'uppercase',
      },
      helpBtnContainer:{
        borderWidth:1,
        borderRadius:50,
        padding:10,
        width:170,
        backgroundColor:"#309397",
        flexDirection : "row",
        marginTop:25,
        alignItems: "center",
        justifyContent: "center"
        
      },
      helpBtnText:{
        fontSize:16,
        textAlign: 'center',
        color: 'white',
      },
})

export default FinishTutor;