import React ,{useState} from 'react';
import {View, Text, StyleSheet,TouchableOpacity,Image, Alert, Dimensions, Linking} from 'react-native';
import HeaderIndex from 'src/common/HeaderIndex';
import FooterIndex from 'src/common/FooterIndex';
import {componentStyles} from 'src/common/containerStyles';
import { useEffect } from 'react';


const ScreenHight = Dimensions.get('screen').height;
//Alert.alert(""+ScreenHight);
const Articles = ({navigation}) => {
   
    const text = [
        "HO",
        "Hi",
        "test",
    ];
    const [index , setIndex] = useState(0);
    const [currentText, setText] = useState(text[index]);
  
    useEffect(()=>{
        setText(text[index]);
        //Alert.alert(""+index);
    },[index])
    return (
        <>
            <HeaderIndex navigation={navigation}/>
        
            <View style={[componentStyles.container_v2,{alignItems: "center"}]}>
                <Text style={styles.newsTitle}>What's new today?</Text>
                <View style={styles.newsContainer}>
                      <Text style={styles.text} onPress={()=>Linking.openURL("https://google.com")}>{currentText}</Text>
                </View>
                    <TouchableOpacity onPress={()=>{
                            setIndex(index=>(index<2)?index+1:index=0);
                            setText(text[index]);
                        }
                        }>
                        
                            <Image style={styles.next} source={require("src/assets/images/icon_next.png")}></Image>
                        </TouchableOpacity>
                <TouchableOpacity onPress={()=>{
                    //Alert.alert(""+ index);
                    setIndex(index=>(index>0)?index-1:index=2);
                
                    }}>
                    <Image style={styles.back} source={require("src/assets/images/icon_back.png")}></Image>
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
    newsTitle:{
        marginTop:40,
        fontSize:25,
        color: "#f5f5f5",
    },
    newsContainer: {
        borderColor:"white",
        borderWidth:1,
        borderRadius:50,
        height:484,
        marginTop: 50,
        width:270,
        backgroundColor: 'rgba(255,255,255,0.5)',
        justifyContent: 'center',
        alignItems:"center",
    },
    text:{
        fontSize:50,
    },
    back:{
       position: 'absolute',
        right:160,
        bottom:230
        
    },
    next:{
        position: 'absolute',
        left:160,
        bottom:225
    }
});
export default Articles;
