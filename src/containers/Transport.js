import React ,{useState,useEffect} from 'react';
import {
    View, 
    Text, 
    StyleSheet,
    Image,
    TouchableOpacity,
    Dimensions, 
    Alert, 
    Animated, 
    Easing,
} from 'react-native';
import HeaderIndex from 'src/common/HeaderIndex';
import FooterIndex from 'src/common/FooterIndex';

import {componentStyles} from 'src/common/containerStyles';
import Step from 'src/components/Step';
import NetPoint from 'src/components/NetPoint';
import TutorBox from 'src/components/TutorBox';
import {
    accelerometer,
    gyroscope,
    setUpdateIntervalForType,
    SensorTypes
  } from "react-native-sensors";
  import { map, filter } from "rxjs/operators";
  import AsyncStorage from "@react-native-async-storage/async-storage";
  import ConfigSetup from "src/common/ConfigSetup";
const pointText = "you have earned";


const MoveBackground = () => {
    return (
        <>
            
            <Image style={styles.tree1} source={require("src/assets/images/icon_tree1.png")}></Image>
            <Image style={styles.tree2} source={require("src/assets/images/icon_tree2.png")}></Image>
            <Image style={styles.tree3} source={require("src/assets/images/icon_tree3.png")}></Image>
            
            <Image 
                source={require("src/assets/images/icon_transport_boy.png") }
                style={styles.boy}>
            </Image>
        
            <Image 
                source={require("src/assets/images/icon_transport_girl.png") }
                style={styles.girl}>
            </Image>

                <View style={styles.line}>
                </View>
                
        </>
    )
}

const movebg = new Animated.Value(0);
const movebg2 = new Animated.Value(0);
const movebg3 = new Animated.Value(0);

const startAm = () => {
    Animated.loop(
        //Animated.parallel([
            Animated.timing(movebg,{
                toValue:1,
                duration: 15000,
                easing: Easing.linear,
                useNativeDriver:false,
                
            })      
    ).start();
    Animated.loop(
        //Animated.parallel([
           
        Animated.timing(movebg2,{
            toValue:1,
            duration: 15000,
            easing: Easing.linear,
            useNativeDriver:false,
           
        }),

    ).start();
    Animated.loop(
        Animated.timing(movebg3,{
            toValue:1,
            duration: 15000,
            easing: Easing.linear,
            useNativeDriver:false,
            
        }),
    ).start();
}

const resetAM = () => {
    Animated.timing(movebg).reset();
    Animated.timing(movebg2).reset();
    Animated.timing(movebg3).reset();
}

const stopAM = () => {
    Animated.timing(movebg).stop();
    Animated.timing(movebg2).stop();
    Animated.timing(movebg3).stop();
}

const moveX = movebg.interpolate({
    inputRange: [0,1],
    outputRange: [0,-1000]
});
    
const moveX_B = movebg2.interpolate({
    inputRange: [0,1],
    outputRange: [550,-500]
});
const moveX_C = movebg3.interpolate({
    inputRange: [0,1],
    outputRange: [1100,0]
});

const Transport = (props) => {
    const [hasNext, setHasNext] = useState(undefined);
    const [helpCount, setHelpCount] = useState(undefined);

    const [hidden, setHidden] = useState(false);
    const [start, setStart] = useState(true);
    const [click, setClick] = useState(false);
    const [text, setText] = useState("");
    const [subscription, setSubscription] = useState(undefined);
    const [countVal, setCountVal] = useState(0);
    var magnitude;
    var delta;
    var MagnitudePrevious;
    var stepCount = 0;
    
    const sendData = () => {
        fetch(ConfigSetup.getAPI()+'api/user/login', {
            count:countVal,
            token: AsyncStorage.getItem("token"),
        }).then((response) => {
            if(response.status===201){
              return response.json();
            }
          
          })
  //If response is in json then in success
          .then((data) => {
              //Success 
              props.navigation.navigate("Congrats");
          })
          //If response is not in json then in error
          .catch((error) => {      
              //Error 
              props.navigation.navigate("Congrats");        
              console.error(error);
          });
    }

    const counter = () => {
        setUpdateIntervalForType(SensorTypes.accelerometer, 400);  
        setSubscription(accelerometer.subscribe(({ x, y, z }) =>{
            //console.log({ x, y, z })
            const added = (Math.sqrt(x*x+y*y+z*z)).toString();
            console.log(added);

            magnitude = added;
            
           
            //Alert.alert(stepCount) );
            //const temp = magnitude;
            //console.log("temp" , temp);

            delta = magnitude - MagnitudePrevious;
            MagnitudePrevious = magnitude;
        
            stepCount = delta>0.3? ++stepCount : stepCount;
            setCountVal(stepCount);
            console.log("mag = ", magnitude );
            console.log("delta=" , delta);
            console.log("MaP=" , MagnitudePrevious);
            console.log("step= ", stepCount);
        }));
    }
     
    useEffect(() => {
    
        const unsubscribe = props.navigation.addListener('focus', () => {
            setHidden(false);
            setStart(false);
            setClick(false);
            resetAM();
            setCountVal(0);
            magnitude= 0;
            MagnitudePrevious = 0;
            delta = 0;
            stepCount = 0;
        });
         
        //console.log("mag = ", magnitude );
        //console.log("delta=" , delta);
        //console.log("MaP=" , MagnitudePrevious);
        //onsole.log(magnitude);
        //console.log("step= ", stepCount);
        /*  
        
*/      
        return () => {
          unsubscribe;
          //subscription.unsubscribe();
        };
      }, [props.navigation]);
      useEffect(() =>{
        
        setText(countVal);
    
      },[countVal])

      useEffect(() =>{
        if(props.route.params){
           
            if(props.route.params.helpCount){
                
                setHelpCount(parseInt(JSON.stringify(props.route.params.helpCount)));
            
            }
            else{
                setHelpCount(undefined);
            }
           
            if(props.route.params.countHelp){
                
                setHasNext(parseInt(JSON.stringify(props.route.params.countHelp)))
            }
            else{
                setHasNext(0);
            }
            
        }
       
    })

    useEffect(() =>{
        const clearData = props.navigation.addListener("blur" , () => {
            setHelpCount(undefined);
            setHasNext(0);

        })
        return clearData;
    },[props.navigation])
      //console.log("delta" , delta);
      //console.log("MaP" , MagnitudePrevious);
      //console.log(magnitude);
      //console.log(stepCount);
  return (
    <View style={componentStyles.container_v2}>
      <HeaderIndex navigation={props.navigation}/> 
      
      <View style={hidden? styles.startContainerHidden :styles.startContainer}>
            <Text style={styles.title}>Read To Walk the day?</Text>
                <TouchableOpacity style={styles.StartBtn} onPress={()=>{
                    setHidden(true);
                    startAm();
                    setStart(true);
                    counter();
                }}>
                    <Text style={{fontSize:31, textAlign:"center", color:"white",padding:5}}>Start</Text>
                </TouchableOpacity>
        </View>
        <View style={hidden?styles.netpoint:styles.netpointHidden}>
            <Step step={countVal} text="You have earned"/>
            {/*
            <TouchableOpacity onPress={()=>{
                setClick((click)=>{return !click});
                stopAM();
                subscription.unsubscribe();
                
                }} style={click?styles.pauseBtnHidden:styles.pauseBtn}>
                <Image source={require("src/assets/images/icon_pause.png")}></Image>
            </TouchableOpacity>
            */}
            <TouchableOpacity onPress={()=>{
                setClick((click)=>{return !click});
                startAm();
                
                }} style={click?styles.playBtn:styles.playBtnHidden}>
                <Image source={require("src/assets/images/icon_play.png")}></Image>
            </TouchableOpacity>
            <TouchableOpacity onPress={()=>{
                setStart(false);
                sendData();
              
            }} 
                style={styles.stopBtn}>
                <Image source={require("src/assets/images/icon_stop.png")}></Image>
            </TouchableOpacity>
        </View>
        <View style={styles.controlAmView}>
            <Animated.View style={styles.moveA}>
                <MoveBackground/>
            </Animated.View>
            <Animated.View style={styles.moveB}>
                    <MoveBackground/>
            </Animated.View>
            <Animated.View style={styles.moveC}>
                    <MoveBackground/>
            </Animated.View>
       </View>
      <FooterIndex style={styles.footer} navigation={props.navigation}/>
      {hasNext===1&&
            <View style={{width:"100%",height:"100%",backgroundColor:"rgba(0,0,0,0.7)",position:"absolute"}}></View>
         }
                {helpCount===undefined&&hasNext===1&&
                   
                    <TutorBox
                        mouseNum={1}
                        text={"You can earn net points by walking more here."}
                        mouse1left={140}
                        mouse1top={800}
                        circle={1}
                        navigation={props.navigation}
                        isPlace={1}  
                        place ={"Congrats"}
                        boxtop={100}
                        haveCount={0}
                        hasNext={1}
                        
                    />
                }
    </View>
  );
};

const styles = StyleSheet.create({
    footer: {
        position: 'absolute',
        bottom: 0,
        width: '100%',
        height: 84,
        
    },
    tree1:{
        transform : [{translateX: -125}],
        position: 'absolute',
        marginTop:-70,
        zIndex:4,
    },
    tree2:{
        zIndex:3,
        position: "absolute",
        marginTop:80,
        transform : [{translateX: -10}],
    },
    tree3:{
        zIndex:2,
        position:"absolute",
        marginTop:150,
        transform : [{translateX: 110}],
    },
    line:{
        position: 'absolute',
        borderBottomColor: "black",
        borderBottomWidth: 2,
        marginTop: -100,
        width: 1000,
        transform : [{translateY: 550}],
    },
    title: {
        color: '#f5f5f5',
        textAlign: 'center',
        fontSize: 24,
        marginTop:40
    },
    startContainerHidden:{
        opacity:0,
        //display: "none",
        alignItems: "center",
        justifyContent: "center"
    },
    startContainer:{
        opacity:1,
        //display: "flex",
        alignItems: "center",
        justifyContent: "center"
    },
    StartBtn:{
        backgroundColor:"#309397",
        width:206,
        height:48,
        borderRadius:50,
        marginTop: 20,
    },
    boy:{
        zIndex:4,
        transform : [{translateX:50},{translateY:250}]
    },
    girl: {
        transform : [{translateX:300}]
    },
    netpoint:{
        transform : [{translateX:(Dimensions.get("window").width)/2-110},{translateY:75}],
        position: 'absolute',
        zIndex:5,
        display: "flex"
    },
    netpointHidden:{
        transform : [{translateX:(Dimensions.get("window").width)/2-110},{translateY:75}],
        position: 'absolute',
        zIndex:5,
        display: "none"
    },
    moveA:{
         transform : [{translateX:moveX}]
     },

    moveB:{
       transform : [{translateY:-448},{translateX:moveX_B}],
        //transform : [{translateX:moveX}]
    },
    moveC:{
        transform : [{translateY:-896},{translateX:moveX_C}]
    },
    stopBtn:{
        position: 'absolute',
        display: "flex",
        transform : [{translateY:110}, {translateX:220}]
    },
    pauseBtn:{
        position: 'absolute',
        display: "flex",
        transform : [{translateY:110}, {translateX:-40}]
    },
    pauseBtnHidden:{
        position: 'absolute',
        display: "none",
        transform : [{translateY:110}, {translateX:-40}]
    },
    playBtn:{
        position: 'absolute',
        display: "flex",
        transform : [{translateY:110}, {translateX:-40}]
    },
    playBtnHidden:{
        position: 'absolute',
        display: "none",
        transform : [{translateY:110}, {translateX:-40}]
    }
});
export default Transport;
