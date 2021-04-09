import React , {useState} from 'react';
import {View, Text, Image,StyleSheet, TouchableOpacity, Alert,Linking} from 'react-native';
import HeaderIndex from 'src/common/HeaderIndex';
import FooterIndex from 'src/common/FooterIndex';

import {componentStyles} from 'src/common/containerStyles';

import AsyncStorage from "@react-native-async-storage/async-storage";
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
const ScanFood = ({navigation}) => {
    const [response, setResponse] = useState(null);
    const [didCancel, setDidCancel] = useState(true);
    const [uri, setUri] = useState(null);

    const createData = (photo, body) => {
        const data = new FormData();

        data.append("photo", {
            name: photo.fileName,
            type: photo.type,
            uri: 
                photo.uri
        });

        Object.keys(body).forEach(key =>{
            data.append(key, body[key]);
        });
        return data;
    }

    const sendFoodData = async() => {
      fetch(`http://42.2.228.35:8000/cashier/cal`, {
          method: 'POST',
          body:createData(response, await AsyncStorage.getItem("token"))
          
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
            <Text>Scan Food</Text>
            <View style={styles.scanContainer}>
                <TouchableOpacity
                    onPress={()=>{
                        launchCamera(
                            {
                              mediaType: 'photo',
                              includeBase64: false,
                              maxHeight: 200,
                              maxWidth: 200,
                              //saveToPhotos:true,
                            },
                            (response) => {
                                
                              setResponse(response);
                              console.log("s " , JSON.stringify(response.didCancel));
                              setDidCancel(JSON.stringify(response.didCancel));
                              if(response.uri){
                                setUri(JSON.stringify(response.uri));
                              }
                                
                            },
                          );
                          
                        }
                        
                    }
                    style={styles.scanBtnContainer}
                >
                    <Text style={styles.scanBtnText}>Take photo</Text>
                    
                </TouchableOpacity>
                <Text> This is response {JSON.stringify(response)}</Text>
                <TouchableOpacity style={styles.scanBtnContainer}
                    onPress={()=>{
                        if(!didCancel){
                            sendFoodData()
                        }
                        else{
                            Alert.alert("You haven't take a photo yet!")
                        }
                        
                    }
                    }
                >
                    <Text style={styles.scanBtnText}>Send</Text>
                </TouchableOpacity>
                {!didCancel && (
                    <View style={styles.image}>
                        <Image
                        style={{width: 200, height: 200}}
                        source={{uri: response.uri}}
                        />
                    </View>
                    )}
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
  scanBtnText:{
    fontSize:16,
    textAlign: 'center',
    color: 'white',
  },
  scanBtnContainer:{
    borderWidth:1,
    borderRadius:50,
    padding:10,
    width:170,
    backgroundColor:"#309397",
    flexDirection : "row",
    marginTop:30,
    justifyContent: "center"
    
  },
});
export default ScanFood;
