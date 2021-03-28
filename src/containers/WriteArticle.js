import React ,{useState} from 'react';
import {
    View, 
    Text, 
    StyleSheet,
    TouchableOpacity,
    Image, 
    Alert, 
    TextInput,
} from 'react-native';
import HeaderIndex from 'src/common/HeaderIndex';
import FooterIndex from 'src/common/FooterIndex';
import {componentStyles} from 'src/common/containerStyles';
import {useEffect } from 'react';
import AsyncStorage from "@react-native-async-storage/async-storage";


const WriteArticle = ({navigation}) => {

    const [title,setTitle] = useState("");
    const [content, setContent] = useState("");

    const send = () => {
        fetch('http://42.2.228.35:8000/api/user/login', {
            method: 'POST',
            body:JSON.stringify({
              title: title,
              content: content,
              token: AsyncStorage.getItem("token"),
            })
          })
            .then((response) => {
              if(response.status===201){
                return response.json();
              }
            })

            .then((data) => {
               // Alert.alert(""+ JSON.stringify(data))
                console.log(JSON.stringify(data));
                navigation.navigate("Notification");
            })

            .catch((error) => {
                
                console.error(error);
                //navigation.navigate("Notification");
            });    

    }

    return (
        <>
         <View style={styles.header}>
            <Text style={styles.writeTitle}>Write Your Artile</Text>
        </View>
        <TouchableOpacity style={styles.backArrow} onPress={()=>navigation.goBack()}>
                    <Image source={require("src/assets/images/icon_back.png")}></Image>
        </TouchableOpacity>

        <TouchableOpacity style={styles.send}>
            <Text style={styles.sendText}>Send</Text>
        </TouchableOpacity>

        <View style={componentStyles.container_v2}>
           
           <View style={styles.titleContainer}>
            <TextInput
                style={styles.inputTitle}
                placeholder="Title"
                autoCapitalize = "none"
                onChangeText = {title => setTitle(title)}
                value = {title}
            >
            </TextInput>
            </View>
            <View style={styles.inputContainer}>
            <TextInput
                style={styles.inputContent}
                placeholder="Content"
                autoCapitalize = "none"
                onChangeText = {content => setContent(content)}
                value = {content}
            >
            </TextInput>
            </View>
        </View>
        
    </>

    )
}
const styles = StyleSheet.create({
    writeTitle: {
        fontSize:20,
        textAlign: "center",
        bottom:25
    },
    inputTitle: {
        fontSize:20,

    },
    header:{
        backgroundColor: "grey",
        paddingTop:80
    },
    backArrow:{
        position: "absolute",
        borderWidth:3,
        borderTopColor: 'black',
        marginTop:50,
        marginLeft:50,
        
    },
    titleContainer:{
        borderBottomWidth:1,
        padding:10
    },
    inputContent:{
        fontSize:20,

    },
    inputContainer:{
        borderBottomWidth:1,
        padding:10,
        height:700
    },
    send:{
        position: "absolute",
        marginTop:50,
        marginLeft:50,
        borderWidth:3,
        borderColor: 'black',
        right:50,
        top:5
    },
    sendText:{
        fontSize:20,
    }
})

export default WriteArticle;