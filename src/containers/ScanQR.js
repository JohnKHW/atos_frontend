import React , {useState} from 'react';
import {View, Text, Image,StyleSheet, TouchableOpacity, Alert,Linking} from 'react-native';
import HeaderIndex from 'src/common/HeaderIndex';
import FooterIndex from 'src/common/FooterIndex';

import {componentStyles} from 'src/common/containerStyles';
import QRCodeScanner from 'react-native-qrcode-scanner';
import { RNCamera } from 'react-native-camera';
import AsyncStorage from "@react-native-async-storage/async-storage";
const ScanQR = ({navigation}) => {
  const [QRdata, setQRData] = useState("");
    const onSuccess = (e) => {
             Alert.alert("OK");
             setQRData(e.data);
             sendQRData();
      };

    const sendQRData = async() => {
      fetch(`http://42.2.228.35:8000/cashier/cal/${QRdata}`, {
          method: 'POST',
          body:JSON.stringify({
            QRdata: QRdata,
            token: AsyncStorage.getItem("token"),
          })
        })
          .then((response) => {
            if(response.status===201){
              return response.json();
            }
          })

          .then((data) => {
              Alert.alert(""+ JSON.stringify(data))
              navigation.navigate("Scan_2");
          })

          .catch((error) => {
              
              console.error(error);
              //navigation.navigate("Notification");
          });    
  }
  



    return (
     <>
        <HeaderIndex navigation={navigation}/>
        <View style={[componentStyles.container_v2,{alignItems: "center"}]}>
            <Text>ScanQR</Text>
            <View style={styles.scanContainer}>
                <QRCodeScanner
                    reactivate={true}
                    reactivateTimeout={3000}
                    containerStyle={styles.qrScan}
                    cameraStyle={{height:200,width:200}}
                    onRead={onSuccess}
                    topContent={
                    <Text style={styles.centerText}>
                        
                        <Text style={styles.textBold}>Scan please</Text> 
                    </Text>
                    }
                    bottomContent={
                    <TouchableOpacity style={styles.buttonTouchable}>
                        <Text style={styles.buttonText}>OK</Text>
                    </TouchableOpacity>
                    }
                
                />
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
      height:450,
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
  },
  centerText: {
    flex: 1,
    fontSize: 18,
    padding: 32,
    color: '#777'
  },
  textBold: {
    fontWeight: '500',
    color: '#000'
  },
  buttonText: {
    fontSize: 21,
    color: 'rgb(0,122,255)'
  },
  buttonTouchable: {
    padding: 16
  },
  qrScan:{
    justifyContent: 'center',
    alignItems: 'center'
  }
});
export default ScanQR;
