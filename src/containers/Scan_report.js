import React , {useState} from 'react';
import {View, Text, Image,StyleSheet, TouchableOpacity,TextInput, Alert} from 'react-native';
import HeaderIndex from 'src/common/HeaderIndex';
import FooterIndex from 'src/common/FooterIndex';

import {componentStyles} from 'src/common/containerStyles';

const Scan_report = ({navigation}) => {
    const [reportText, setText] = useState("");

    const sendReport = () => {
        fetch('http://42.2.228.35:8000/api/user/login', {
            method: 'POST',
            body:JSON.stringify({
              reportText: reportText,
            })
          })
            .then((response) => {
              if(response.status===200){
                return response.json();
              }
            })

            .then((data) => {
                Alert.alert(""+ JSON.stringify(data))
                navigation.navigate("Notification");
            })

            .catch((error) => {
                
                console.error(error);
                navigation.navigate("Notification");
            });    
    }
   

    return (
        <>
            <HeaderIndex navigation={navigation}/>
            <View style={[componentStyles.container_v2,{alignItems: "center"}]}>
                <Text>Report</Text>
                <Text style={styles.reportTitle}>Something's wrong? </Text>
                <View style={styles.reportContainer}>
                    <TextInput 
                        style = {styles.reportContent} 
                        multiline={true}
                        placeholder="I have some problems in..."
                        onChangeText={reportText => setText(reportText)}
                        defaultValue={reportText}
                    />

                </View>
                <TouchableOpacity 
                    style={styles.sendBtnContainer} 
                    onPress={sendReport}
                >
                   
                    <Text style={styles.sendBtnText}>Report Problem</Text>
                </TouchableOpacity>
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
  reportContainer: {
      backgroundColor: "rgba(255, 255, 255,0.8)",
      borderColor:"white",
      borderWidth:2,
      borderRadius:50,
      height:350,
      marginTop: 50,
      width:300,
      alignItems: "center"
      
  },
  reportTitle: {
    fontSize:22,
    textAlign: 'center',
    fontWeight: 'bold',
    color: '#FF6319',
    textTransform: 'uppercase',
    marginTop:50
  },
  sendBtnContainer:{
    borderWidth:1,
    borderRadius:50,
    padding:10,
    width:170,
    backgroundColor:"#309397",
    marginTop:50,
    
    
  },
  sendBtnText:{
    fontSize:18,
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
  reportContent:{
      marginHorizontal:30,
      marginVertical:30,
      fontSize:16,
      
      
  }
});
export default Scan_report;
