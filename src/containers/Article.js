import React ,{useState} from 'react';
import {View, Text, StyleSheet,TouchableOpacity,Image, Alert, Dimensions, Linking} from 'react-native';
import HeaderIndex from 'src/common/HeaderIndex';
import FooterIndex from 'src/common/FooterIndex';
import {componentStyles} from 'src/common/containerStyles';
import { useEffect } from 'react';
import AsyncStorage from "@react-native-async-storage/async-storage";
import SavePost from 'src/common/SavePost';
const ScreenHight = Dimensions.get('screen').height;
//Alert.alert(""+ScreenHight);
const Articles = ({navigation, route}) => {
   
    const [post,setPost] = useState("");

    const testArt = [{
        "id": 1,
        "title": "Demo Article",
        "content": "Demo Content",
    
        },
        {
        "id": 2,
        "title": "Demo Article2",
        "content": "Demo Content2",
        },
        {
            "id": 3,
            "title": "Demo Article3sadsadddasasdas",
            "content": "Demo Content3Demo Content3Demo Content3Demo Content3Demo Content3Demo Content3Demo Content3Demo Content3Demo Content3Demo Content3Demo Content3Demo Content3Demo Content3Demo Content3Demo Content3Demo Content3Demo Content3Demo Content3Demo Content3Demo Content3Demo Content3Demo Content3",
            },
    ];

    const text = testArt;
    
    const [index , setIndex] = useState(0);
    const [currentText, setText] = useState(text[index].title);
    const [currentContent, setContent] = useState(text[index].content);
    fetch('http://42.2.228.35:8000/api/user/login', {
        method: 'POST',
        body:JSON.stringify({
            token: AsyncStorage.getItem("token"),
        })
      })
        .then((response) => {
          if(response.status===201){
            return response.json();
          }
        })

        .then((data) => {
            setPost(JSON.stringify(data));
            console.log(JSON.stringify(data));
        })

        .catch((error) => {
        
            console.error(error);
            //navigation.navigate("Notification");
        });   

    const addSave = () => {
        try{
            SavePost.set(testArt[index]);
            console.log("ADDed ", SavePost.get());
            
        }catch(e){
            console.error(e);
        }
    }

    const write = () => { 
        navigation.navigate("Write");
    }
    useEffect(()=>{
        setText(text[index].title);
        setContent(text[index].content);
        //Alert.alert(""+index);
        
    },[index])
    return (
        <>
            <HeaderIndex navigation={navigation}/>
        
            <View style={[componentStyles.container_v2,{alignItems: "center"}]}>
                <Text style={styles.newsTitle}>What's new today?</Text>
                <View style={styles.newsContainer}>
                    <View style={styles.titleContainer}>
                      <Text style={styles.text}>{currentText}</Text>
                      <TouchableOpacity onPress={()=> addSave()}>
                        <Image source={require("src/assets/images/icon_favour.png")}></Image>
            
                    </TouchableOpacity>
                </View>
                    <View style={{height:250,width:250}}>
                      <Text style={styles.content}>{currentContent}</Text>
                      <TouchableOpacity onPress={()=> addSave()}>
                        <Text style={{textAlign:'center',fontSize:25,color:'#2676ff'}}>
                            More...
                        </Text>
                    </TouchableOpacity>
                    </View>
                </View>
                <TouchableOpacity style={styles.nextArrowContainer} onPress={()=>{
                        setIndex(index=>(index<2)?index+1:index=0);
                        setText(text[index].title);
                        setContent(text[index].content);
                        //Alert.alert(""+ index);
                        console.log("" + index);
                    }
                }>
                    
                    <Image source={require("src/assets/images/icon_next.png")}></Image>
                </TouchableOpacity>
                <TouchableOpacity style={styles.backArrowContainer} onPress={()=>{
                    //Alert.alert(""+ index);
                    setIndex(index=>(index>0)?index-1:index=2);
                    //Alert.alert(""+ index);
                    console.log("" + index);
                }}>
                    <Image source={require("src/assets/images/icon_back.png")}></Image>
                </TouchableOpacity>
                <TouchableOpacity style={styles.favour} 
                    onPress={()=>{
                        navigation.navigate("Save");
                    }
                    }>
                    <Image source={require("src/assets/images/icon_favour.png")}></Image>
            
                </TouchableOpacity>
                <TouchableOpacity style={styles.write} onPress={()=>write()}>
                    <Image source={require("src/assets/images/icon_favour.png")}></Image>
            
                </TouchableOpacity>
            </View>
            
               
            
            
        <FooterIndex style={styles.footer} navigation={navigation} points={5000} route={route}/>
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
    newsTitle:{
        marginTop:40,
        fontSize:25,
        color: "#f5f5f5",
    },
    newsContainer: {
        borderColor:"white",
        borderWidth:1,
        borderRadius:50,
        height:450,
        marginTop: 20,
        padding:20,
        width:270,
        backgroundColor: 'rgba(255,255,255,0.5)',
        alignItems:"center",
       
    },
    text:{
        fontSize:30,
        fontWeight:'bold',
        flexDirection: 'row'
    },
    content:{
        fontSize:25,
    },


    nextArrowContainer:{
        borderWidth:3,
        borderTopColor: 'black',
        height:50,
        width:50,
        right:10,
        top:Dimensions.get('window').height/3 + 50,
        alignItems: "center",
        justifyContent: "center",
        position: "absolute",
    },
    backArrowContainer:{
        borderWidth:3,
        borderTopColor: 'black',
        height:50,
        width:50,
        left:10,
        top:Dimensions.get('window').height/3 + 50,
        justifyContent: 'center',
        alignItems: "center",
        position: "absolute",
    },
    favour:{
        position: "absolute",
        borderWidth:3,
        borderColor:"black",
        right:20,
        top:500
        
    },
    write:{
        position: "absolute",
        borderWidth:3,
        borderColor:"black",
        right:20,
        top:50
    },
    titleContainer:{
        flexDirection: 'row'
    },
    
});
export default Articles;
