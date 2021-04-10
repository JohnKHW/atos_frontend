import React , {useState,useEffect}from 'react';
import {View, Text, Image,StyleSheet,FlatList,Alert,TouchableOpacity} from 'react-native';
import HeaderIndex from 'src/common/HeaderIndex';
import FooterIndex from 'src/common/FooterIndex';

import {componentStyles} from 'src/common/containerStyles';
import SavePost from 'src/common/SavePost';
import AsyncStorage from "@react-native-async-storage/async-storage";
import TutorBox from 'src/components/TutorBox';

const SaveCollection = (props) => {
    const [data, setData] = useState({});
    const [currentTime, setTime] = useState(0);
    const [hasNext, setHasNext] = useState(undefined);
    var mytime;
    useEffect(() =>{
        const reRun = props.navigation.addListener('focus' , () => {
             
            setTime(Date.now().toString());
            
            console.log("focus");
        });
        mytime = setTimeout(() => {
            setTime(Date.now().toString());
            //Alert.alert("Time " + currentTime);
        }, 3000);
       

        const unsubscribe = props.navigation.addListener('blur' , () => {
            clearTimeout(mytime);
            console.log("I done clear")
        })
        return () => {
            unsubscribe;
            reRun;
        }
    })

    useEffect(() =>{
        
        const reRun = props.navigation.addListener('focus' , async() => {
            setData(SavePost.get());
            /*
            try{
                setData(JSON.parse(await AsyncStorage.getItem("SavedPost")));
            }catch(e){
                console.error(e);
            }
            */
        });

    
        return () =>{
            reRun;
            
        }
        //console.log("getted data", testData);
    },[props.navigation]);
  

    useEffect(() =>{
        if(props.route.params){
           
            if(props.route.params.countHelp){
                
                setHasNext(parseInt(JSON.stringify(props.route.params.countHelp)))
            }
            
        }
       
    })
    return (
     <>
        <HeaderIndex navigation={props.navigation}/>
        <View style={[componentStyles.container_v2,{alignItems: "center"}]}>
            <Image source={require("src/assets/images/icon_favour.png")}></Image>
            <Text style={styles.title}>Save Article</Text>
                    
                    <FlatList
                        
                        data={data}
                        extraData={currentTime}
                        keyExtractor={({ id }) => id.toString()}
                        renderItem={({ item }) => (
                            data === null? <Text>No any save post</Text>:
                                <TouchableOpacity onPress={()=>
                                    props.navigation.navigate("ArticleDetail",{
                                        title:item.title,
                                        content:item.content,
                                        author:item.author,
                                    })
                                
                                }>
                                    <View style={styles.saveContainer}>
                                    
                                        <Text style={styles.saveTitle}>{item.title}</Text>
                                        
                                    </View>
                                </TouchableOpacity>  
                        )}
                    />
                        
                
           
        </View>
    <FooterIndex style={styles.footer} navigation={props.navigation}/>
    {hasNext===1&&
            <View style={{width:"100%",height:"100%",backgroundColor:"rgba(0,0,0,0.7)",position:"absolute"}}></View>
         }
                {hasNext===1&&
                   
                    <TutorBox
                        mouseNum={1}
                        text={"You can read the article you have saved all-in-one here."}
                        mouse1left={200}
                        mouse1top={200}
                        circle={0}
                        navigation={props.navigation}
                        isPlace={1}  
                        place ={"Article"}
                        boxtop={100}
                        haveCount={1}
                        nowCount={3}
                        
                    />
                }
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
    title: {
        fontSize:25,
        color:'#FF6319'
    },
    saveContainer: {
        backgroundColor: "rgba(255, 255, 255,0.3)",
        borderColor:"white",
        borderWidth:2,
        borderRadius:30,
        height:115,
        marginTop: 20,
        width:298,
        flexDirection:'column',
    },
    saveTitle:{
        textAlign: 'center',
        fontSize:24,
        marginTop:10,
        color: '#FF6319',
        fontWeight: 'bold'
    },
    saveContent:{
        marginHorizontal : 30,
        marginVertical : 10,
    },
});
export default SaveCollection;
