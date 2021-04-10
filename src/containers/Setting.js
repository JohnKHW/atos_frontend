import React ,{useState}from 'react';
import {View, Text, Image,StyleSheet, TouchableOpacity,TextInput,Alert} from 'react-native';
import HeaderIndex from 'src/common/HeaderIndex';
import FooterIndex from 'src/common/FooterIndex';

import {componentStyles} from 'src/common/containerStyles';
import ConfigSetup from "src/common/ConfigSetup";
import AsyncStorage from "@react-native-async-storage/async-storage";
const Setting = ({navigation}) => {
    const [username, setUsername] = useState("");
    const changeNewName = () =>{
      fetch( ConfigSetup.getAPI()+'api/user/login', {
        method: 'POST',
        body:JSON.stringify({
            token: AsyncStorage.getItem("token"),
            username:username
        })
      })
        .then((response) => {
          if(response.status===201){
            return response.json();
          }
        })

        .then((data) => {
  
            console.log(JSON.stringify(data));
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
            <Text>Setting</Text>
            
            <View style={styles.nameContainer}>
              <Text style={{fontSize:20,fontWeight:'bold',paddingTop:200}}>You can change your name here</Text>
              <TextInput style={styles.input}
                    placeholder = "New name"
                    autoCapitalize = "none"
                    onChangeText = {username => setUsername(username)}
                    value = {username}
              />

              <TouchableOpacity style={styles.changeNameBtnConatiner}
                onPress={async()=>{
                  changeNewName();
                  try{
                    
                    await AsyncStorage.removeItem("username");
                    Alert.alert("removed")
                  }
                  catch(e){
                      console.error(e);
                  }

                  try{
                    await AsyncStorage.setItem("username", username);
                    Alert.alert("changed", await AsyncStorage.getItem("username") )
                  }catch(e){
                    console.error(e);
                  }
                  
                
                }}
              
              >
                <Text style={styles.changeNameBtnText}>
                  Change Name
                </Text>
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
  changeNameBtnConatiner:{
    borderWidth:1,
    borderRadius:20,
    padding:15,
    width:200,
    backgroundColor:"#309397",
    //flexDirection : "row",

    justifyContent: "center",
    alignItems:"center",
  },
  changeNameBtnText:{
    fontSize:16,
    textAlign: 'center',
    color: 'white',
    fontWeight: 'bold',

  },
  nameContainer:{
    width:'80%',
    height: '75%',
    backgroundColor: "rgba(255, 255, 255,0.3)",
    borderRadius:20,
    marginVertical:10,
    alignItems: "center"
  },
  input: {
    marginTop:20,
    marginBottom:20,
    paddingLeft:15,
    width:300,
    height:50,
    borderWidth:3,
    borderRadius:50,
    fontSize:25
},
});
export default Setting;
