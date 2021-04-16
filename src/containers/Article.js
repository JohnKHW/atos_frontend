import React ,{useState} from 'react';
import {View, Text, StyleSheet,TouchableOpacity,Image, Alert, Dimensions, Linking} from 'react-native';
import HeaderIndex from 'src/common/HeaderIndex';
import FooterIndex from 'src/common/FooterIndex';
import {componentStyles} from 'src/common/containerStyles';
import { useEffect } from 'react';
import AsyncStorage from "@react-native-async-storage/async-storage";
import SavePost from 'src/common/SavePost';
import TutorBox from 'src/components/TutorBox';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import ConfigSetup from "src/common/ConfigSetup";
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
            "content": "Demo ContentDemContenDemoContenDemoContenDemoContenDemoContenDemoContenDemoContenDemoContenDemoContenDemoContenDemooContentDemContenDemoContenDemoContenDemoContenDemoContenDemoContenDemoContenDemoContenDemoContenDemoContenDemoo ContenDemo ContentDemo ContentDemo ContentDemo ContentDemo ContentDemo ContentDemo ContenttDemo ContentDemo ContentDemo ContentDemo ContentDemo ContentDemo ContentDemo ContentDemo ContentDemo ContentDemo ContentDemo ContentDemo ContentDemo ContentDemo ContentDemo ContentDemo ContentDemo ContentDemo ContentDemo ContentDemo ContentDemo ContentDemo ContentDemo ContentDemo ContentDemo ContentDemo ContentDemo ContentDemo Content",
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
    fetch(ConfigSetup.getAPI()+'api/articles', {
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
        const clearData = props.navigation.addListener("blur" , () => {
            setHelpCount(undefined);
            setHasNext(0);
            props.navigation.setParams({
                helpCount:null,
                hasNext:null,
                countHelp:null})
        })

       
        return clearData;
    },[props.navigation])


    useEffect(() =>{
        console.log("has ", props.route.params );
        console.log("has ", hasNext);
        if(props.route.params){
            console.log(props.route.params)
            if(props.route.params.helpCount){
                console.log("has enter helpCount");
                setHelpCount((helpCount)=>helpCount = parseInt(JSON.stringify(props.route.params.helpCount)));
            
            }
            else{
                setHelpCount(undefined);
                console.log("nothing has enter helpCount");
            }
           
            if(props.route.params.countHelp){
                console.log("has enter hasNext");
                setHasNext((hasNext)=> hasNext = parseInt(JSON.stringify(props.route.params.countHelp)))
            }
            else{
                setHasNext(0);
                console.log("nothing has enter hasNext");
            }
            
        }
        console.log("has add", hasNext);
        console.log("has add", helpCount);
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
                    <View style={styles.newsContext}>
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
                        mouse1left={wp('2%')}
                        mouse1top={hp('52%')}
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
                        mouse1top={hp('28%')}
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
                    mouse1top={hp('5.5%')}
                    circle={1}
                    navigation={props.navigation}
                    isPlace={1}  
                    place ={"Save"}
                    boxtop={100}
                    haveCount={0}
                    hasNext={1}
                    />
                    :helpCount===3&&
                    <TutorBox
                        mouseNum={1}
                        text={"You can write your own article tips to the others here."}
                        mouse1left={Dimensions.get("screen").width-130}
                        mouse1top={hp('28%')}
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
        height: hp('10%'),
    },
    newsTitle:{
        marginTop:40,
        fontSize:hp('3.5%'),
        color: "#f5f5f5",
    },
    newsContainer: {
        borderColor:"white",
        borderWidth:1,
        borderRadius:50,
        
        marginVertical:50,
        marginHorizontal:5,
        padding:15,
        width:wp('65%'),
        height:hp('58%'),
        backgroundColor: 'rgba(255,255,255,0.5)',
        alignItems:"stretch"
       
    },
    text:{
        fontSize:hp('3.3%'),
        fontWeight:'bold',
        flexDirection: 'row'
    },
    content:{
        fontSize:hp('2.7%'),
    },

    nextArrowContainer:{
        borderWidth:3,
        borderTopColor: 'black',
        height:hp('5.5%'),
        width:wp('12%'),
        right:wp('2%'),
        top:hp('40%'),
        alignItems: "center",
        justifyContent: "center",
        position: "absolute",
    },
    backArrowContainer:{
        borderWidth:3,
        borderTopColor: 'black',
        height:hp('5.5%'),
        width:wp('12%'),
        left:wp('2%'),
        top:hp('40%'),
        justifyContent: 'center',
        alignItems: "center",
        position: "absolute",
    },
    write:{
        position: "absolute",
        borderWidth:3,
        borderColor:"black",
        right:hp('3%'),
        top:hp('4.5%'),
    },
    titleContainer:{
        flexDirection: 'row',
       
    },
    newsContext:{
     
        height:hp('40%')
    }
});
export default Articles;
