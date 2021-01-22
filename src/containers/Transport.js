import React from 'react';
import {View, Text, StyleSheet,Image,TouchableOpacity} from 'react-native';
import HeaderIndex from 'src/common/HeaderIndex';
import FooterIndex from 'src/common/FooterIndex';

import {componentStyles} from 'src/common/containerStyles';

const Transport = ({navigation}) => {



  return (
    <View style={componentStyles.container_v2}>
      <HeaderIndex navigation={navigation}/> 
      <View style={{borderWidth:1,borderColor:"#f5f5f5"}}></View>
        <Text style={styles.title}>Read To Walk the day?</Text>
        <Image style={styles.tree1} source={require("src/assets/images/icon_tree1.png")}></Image>
        <Image style={styles.tree2} source={require("src/assets/images/icon_tree2.png")}></Image>
        <Image style={styles.tree3} source={require("src/assets/images/icon_tree3.png")}></Image>
        <View style={{alignItems: "center",justifyContent: "center"}}>
            <TouchableOpacity style={styles.StartBtn}>
                <Text style={{fontSize:31, textAlign:"center", color:"white",padding:5}}>Start</Text>
            </TouchableOpacity>
        </View>
        
        <Image 
            source={require("src/assets/images/icon_transport_boy.png") }
            style={styles.boy}>
        </Image>
    
        <Image 
            source={require("src/assets/images/icon_transport_girl.png") }
            style={styles.girl}>
        </Image>
    
            <View style={styles.line}>
            </View>
      <FooterIndex style={styles.footer} navigation={navigation}/>

    </View>
  );
};

const styles = StyleSheet.create({
    footer: {
        position: 'absolute',
        bottom: 0,
        width: '100%',
        height: 84,
        
    },
    tree1:{
        transform : [{translateX: -125}],
        position: 'absolute',
        marginTop:130,
        zIndex:4,
    },
    tree2:{
        zIndex:3,
        position: "absolute",
        marginTop:280,
        transform : [{translateX: -10}],
    },
    tree3:{
        zIndex:2,
        position:"absolute",
        marginTop:350,
        transform : [{translateX: 110}],
    },
    line:{
        position: 'absolute',
        borderBottomColor: "black",
        borderBottomWidth: 2,
        marginTop: 100,
        width: '100%',
        transform : [{translateY: 550}],
    },
    title: {
        color: '#f5f5f5',
        textAlign: 'center',
        fontSize: 24,
        marginTop:40
    },
    StartBtn:{
        backgroundColor:"#309397",
        width:206,
        height:48,
        borderRadius:50,
        marginTop: 20,
    },
    boy:{
        zIndex:4,
        transform : [{translateX:50},{translateY:250}]
    },
    girl: {
        transform : [{translateX:300}]
    }
});
export default Transport;
