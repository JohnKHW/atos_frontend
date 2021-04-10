import React ,{useState} from 'react';
import {View, Text, StyleSheet,TouchableOpacity,Image, Alert, Dimensions, Linking} from 'react-native';
import HeaderIndex from 'src/common/HeaderIndex';
import FooterIndex from 'src/common/FooterIndex';
import {componentStyles} from 'src/common/containerStyles';
import { useEffect } from 'react';
import AsyncStorage from "@react-native-async-storage/async-storage";
import SavePost from 'src/common/SavePost';
import TutorBox from 'src/components/TutorBox';
const ScreenHight = Dimensions.get('screen').height;

//Alert.alert(""+ScreenHight);
const Articles = (props) => {
   
    const [post,setPost] = useState("");
    const [helpCount, setHelpCount] = useState(undefined);
    const [hasNext, setHasNext] = useState(undefined);
    const testArt = [
        {
            "id": 1,
            "title": "Demo Article",
            "content": "Demo Content",
            "author" : "Brian Wong"
        },
        {
            "id": 2,
            "title": "Demo Article2",
            "content": "Demo Content2",
            "author" : "Brian Wong"
        },
        {
            "id": 3,
            "title": "Demo Article3sadsadddasasdasadadadsads",
            "content": "Seee",
            "author" : "Brian Wong"
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
        props.navigation.navigate("Write");
    }
    useEffect(()=>{
        setText(text[index].title);
        setContent(text[index].content);
        //Alert.alert(""+index);
        
    },[index])
    useEffect(() =>{
        if(props.route.params){
            
            if(props.route.params.helpCount){
                
                setHelpCount(parseInt(JSON.stringify(props.route.params.helpCount)));
            
            }
           
            if(props.route.params.countHelp){
                
                setHasNext(parseInt(JSON.stringify(props.route.params.countHelp)))
            }
            
        }
       
    })


    return (
        <>
            <HeaderIndex navigation={props.navigation}/>
        
            <View style={[componentStyles.container_v2,{alignItems: "center"}]}>
                <Text style={styles.newsTitle}>What's new today?</Text>
                <View style={styles.newsContainer}>
                    <View style={styles.titleContainer}>
                      <Text style={styles.text}>{currentText}</Text>
                        <View style={{borderWidth:1, position:"absolute",right:0}}>  
                            <TouchableOpacity onPress={()=> addSave()}>
                            <Image source={require("src/assets/images/icon_favour.png")}></Image>
                
                            </TouchableOpacity>
                        </View>
                    
                </View>
                    <View style={{height:250,width:250}}>
                      <Text style={styles.content}>{currentContent}</Text>
                      <TouchableOpacity 
                        onPress={()=>{
                            console.log("now passing title ", text[index].title);
                            console.log("now passing content ", text[index].content);
                            props.navigation.navigate("ArticleDetail",{
                                title: text[index].title,
                                content: text[index].content,
                                author: text[index].author
                            })
                        }

                        }>
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
         
                <TouchableOpacity style={styles.write} onPress={()=>write()}>
                    <Image source={require("src/assets/images/icon_favour.png")}></Image>
            
                </TouchableOpacity>
            </View>
            
               
            
            
        <FooterIndex style={styles.footer} navigation={props.navigation} points={5000} route={props.route}/>
        {hasNext===1&&
            <View style={{width:"100%",height:"100%",backgroundColor:"rgba(0,0,0,0.7)",position:"absolute"}}></View>
         }
                {helpCount===undefined&&hasNext===1?
                   
                    <TutorBox
                                    mouseNum={1}
                                    text={"You can read the latest article about decarbonization here!"}
                                    mouse1left={20}
                                    mouse1top={800}
                                    circle={1}
                                    navigation={props.navigation}
                                    isPlace={1}  
                                    place ={"Article"}
                                    boxtop={100}
                                    haveCount={1}
                                    nowCount={1}
                                 
                    />

                    :helpCount===1?
                    <TutorBox
                        mouseNum={1}
                        text={"Also pressing the heart to save the article you like"}
                        mouse1left={280}
                        mouse1top={240}
                        circle={1}
                        navigation={props.navigation}
                        isPlace={1}  
                        place ={"Article"}
                        boxtop={100}
                        haveCount={1}
                        nowCount={2}
                       

                    />:helpCount===2?
                    <TutorBox
                    mouseNum={1}
                    text={"You can read the article you have saved by passing here."}
                    mouse1left={Dimensions.get("screen").width-70}
                    mouse1top={65}
                    circle={1}
                    navigation={props.navigation}
                    isPlace={1}  
                    place ={"Save"}
                    boxtop={100}
                    haveCount={0}
                    hasNext={1}
                    />
                    :
                    <TutorBox
                        mouseNum={1}
                        text={"You can write your own article tips to the others here."}
                        mouse1left={Dimensions.get("screen").width-130}
                        mouse1top={250}
                        circle={1}
                        navigation={props.navigation}
                        isPlace={1} 
                        place ={"Write"}
                        boxtop={100}
                        haveCount={0}
                        hasNext={1}
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
        marginVertical:50,
        marginHorizontal:5,
        padding:15,
        width:270,
        backgroundColor: 'rgba(255,255,255,0.5)',
        alignItems:"stretch"
       
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
        flexDirection: 'row',
    },
    
});
export default Articles;
