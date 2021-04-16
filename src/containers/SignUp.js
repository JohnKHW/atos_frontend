import React , {useState,useEffect} from 'react';
import HeaderIndex from 'src/common/HeaderIndex';
import FooterIndex from 'src/common/FooterIndex';
import {
    StyleSheet,
    View,
    TouchableOpacity,
    Text,
    TextInput,
    Alert,
    Image
} from 'react-native';
import {componentStyles} from 'src/common/containerStyles';

import AsyncStorage from "@react-native-async-storage/async-storage";

import ConfigSetup from "src/common/ConfigSetup";

const SignUp = (props)=> {
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [cPassword, setCPassword] = useState("");
   
    const icon ={
        loginIcon:{
            img:require('src/assets/images/icon_loginIcon.png')
        }
    };
    

    const setupData = async() => {  
       if(cPassword === password){
            fetch(`${ConfigSetup.get()}"api/user/register?username=${username}&password=${password}`, {
                method: 'POST'
            })
                .then((response) => {
                if(response.status===201){
                    return response.json();
                }
                
                })
        //If response is in json then in success
                .then((data) => {
                    //Success 
                    console.log(JSON.stringify(data));
                })
                //If response is not in json then in error
                .catch((error) => {      
                    //Error         
                    console.error(error);
                });
        }
    }

    useEffect(() =>{
        const clearData = props.navigation.addListener('focus' , () => {
            setUsername("");
            setPassword("");
            setEmail("");
        })
        return () => {
            clearData;
        }
    },[props.navigation]);



    
    return (
        <>
        <View style={[componentStyles.container_v2,{alignItems:"center"}]}>
            <View>
                <Image source={icon.loginIcon.img} style={styles.logo}/>
            </View>
            <View style={styles.container} >
                <TextInput style={styles.input}
                        placeholder = "Email"
                        autoCapitalize = "none"
                        onChangeText = {email => setUsername(email)}
                        value = {email}
                />
                <TextInput style={styles.input}
                    placeholder = "User ID"
                    autoCapitalize = "none"
                    onChangeText = {username => setUsername(username)}
                    value = {username}
                />
                <TextInput style={styles.input}
                    placeholder = "Password"
                    secureTextEntry = {true}
                    autoCapitalize = "none"
                    onChangeText = {password => setPassword(password)}
                    value = {password}
                />
                <TextInput style={styles.input}
                    placeholder = "Confirm your password"
                    secureTextEntry = {true}
                    autoCapitalize = "none"
                    onChangeText = {cPassword => setPassword(cPassword)}
                    value = {cPassword}
                />
                <TouchableOpacity 
                    style={styles.SignupBtn}
                    onPress={setupData}>
                        <Text style={styles.LoginText}>Sign Up</Text>
                </TouchableOpacity>
    
                
            </View>
        </View>
      </>
    );
}

const styles = StyleSheet.create({
    SignupBtn:{
        borderWidth:3,
        borderRadius:50,
        borderColor:"#0f0f0f",
        justifyContent: "center",
        alignItems: "center",
        width:170,
        padding:10,
        marginTop:20,
        backgroundColor: '#6488E4',
    },
    LoginText:{
        fontSize:25,
        color :'#ffffff'
    },
    container:{
        justifyContent: "center",
        alignItems: "center",
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
    logo:{
        height:200,
        width:200,
        marginTop:100,
        marginBottom:40,
    },

    Register: {
        borderWidth:3,
        borderRadius:50,
        borderColor:"#0f0f0f",
        justifyContent: "center",
        alignItems: "center",
        width:170,
        padding:10,
        marginTop:20,
    },
    loadingScreen:{
        
    }
});

export default SignUp;