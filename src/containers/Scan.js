import React from 'react';
import {View, Text, Image,StyleSheet, TouchableOpacity} from 'react-native';
import HeaderIndex from 'src/common/HeaderIndex';
import FooterIndex from 'src/common/FooterIndex';

import {componentStyles} from 'src/common/containerStyles';

const Scan = ({navigation}) => {
  return (
     <>
        <HeaderIndex navigation={navigation}/>
        <View style={[componentStyles.container_v2,{alignItems: "center"}]}>
            <Text>Scan</Text>
            <View style={styles.scanContainer}>
                <Text style={styles.scanText}>Scan to earn net point </Text>
                <Image style={styles.qrImage}source={require("src/assets/images/icon_QRcode.png")}></Image>
                <TouchableOpacity style={styles.scanBtnContainer}>
                  <Image style={styles.scanCam} source={require("src/assets/images/icon_scanQR_camera.png")}></Image>
                  <Text style={styles.scanBtnText}>Photo Scan</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.scanBtnContainer} onPress={()=>navigation.navigate("Scan_2")}>
                  <Text style={styles.scanBtnText}>Test Result</Text>
                </TouchableOpacity>
            </View>
        </View>
    <FooterIndex style={styles.footer} navigation={navigation}/>
    </>
  );
};

const styles = StyleSheet.create({
  footer: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    height: 84,
  },
  scanContainer: {
      backgroundColor: "rgba(255, 255, 255,0.3)",
      borderColor:"white",
      borderWidth:2,
      borderRadius:50,
      height:557,
      marginTop: 50,
      width:292,
      alignItems: "center",
      justifyContent: "center",
  },
  scanText: {
    fontSize:18,
    textAlign: 'center',
    fontWeight: 'bold',
    color: '#309397',
    textTransform: 'uppercase',
  },
  scanBtnContainer:{
    borderWidth:1,
    borderRadius:50,
    padding:10,
    width:170,
    backgroundColor:"#309397",
    flexDirection : "row",
    marginTop:50,
    
  },
  scanBtnText:{
    fontSize:16,
    textAlign: 'center',
    color: 'white',
  },
  scanCam:{
    marginRight:10,
    marginLeft:10,
  },
  qrImage:{
    marginTop:50
  }
});
export default Scan;
