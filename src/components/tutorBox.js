import React , {useState}from 'react';
import { 
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    Image,
    Dimensions,
    Alert
} from 'react-native';

const TutorBox = (props) => {
    const [mouseNum, setMouseNum] = useState(props.mouseNum);
    const backgroundColor = props.backgroundColor;
    const boxText = props.text;
    const circle = props.circle;
    const isPlace = props.isPlace;
    const isCount = props.haveCount;
    const hasNext = props.hasNext;
    return (
       <>
          
            <View style={[styles.textContainer,{top:props.boxtop}]}>
                <Text style={styles.text}>{boxText}</Text>
                <TouchableOpacity style={styles.btnContainer}
                    onPress={()=>
                        {
                            if(isPlace===1){
                                props.navigation.navigate(props.place);
                            }
                            else{
                                props.navigation.openDrawer();
                            }
                            if(isCount===1){
                               
                                props.navigation.navigate(props.place,{
                                    helpCount:props.nowCount,
                                    countHelp:1
                                });
                                
                            }    
                            else if(hasNext===1){
                                
                                props.navigation.navigate(props.place,{
                                    countHelp:hasNext
                                });
                            }
                           
                        }
                    }
                >
                    <Text style={styles.btnText}>Next</Text> 
                </TouchableOpacity>
            </View>
            {mouseNum===1&&
            <View style={[styles.mousePoint,{left:props.mouse1left,flexDirection:"row",top:props.mouse1top}]}>
                 {circle===1&&
                        <Image source={require("src/assets/images/icon_mouse_circle.png")}></Image>
                }
                <View style={{top:50,right:20}}>
                    <Image source={require("src/assets/images/icon_tutor_mouse.png")}></Image>
                </View>
            </View>
            }
            {mouseNum===2&&
               <View style={styles.mousePoint}>
                    <View style={{left:props.mouse1left,flexDirection:"row",top:props.mouse1top}}>
                        {circle===1&&
                        <Image source={require("src/assets/images/icon_mouse_circle.png")}></Image>
                        }
                        <View  style={{top:50,right:20}}>
                            <Image source={require("src/assets/images/icon_tutor_mouse.png")}></Image>
                        </View>
                    </View>
                    
                
                    <View style={{left:props.mouse2left,flexDirection:"row",top:props.mouse2top}}>
                        {circle===1&&
                        <Image source={require("src/assets/images/icon_mouse_circle.png")}></Image>
                        }
                        <View  style={{top:50,right:20}}>
                            <Image source={require("src/assets/images/icon_tutor_mouse.png")}></Image>
                        </View>
                    </View>
                    
                    </View> 
            }
            
        </>
    );
};

const styles = StyleSheet.create({
    text:{
        fontSize:25,
        width: 250,
        textAlign: 'center'
    },
    textContainer: {
        backgroundColor: "rgba(255,255,255,0.7)",
        borderRadius:20,
        alignItems: 'center',
        marginHorizontal:Dimensions.get("screen").width/6,
        padding:10,
        position: 'absolute',
        marginVertical: Dimensions.get("screen").height/3,
        
    },
    btnContainer:{
        borderRadius:50,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#309397",
        marginTop: 20,
        width: 100
    },
    btnText:{
        fontSize:25,
        color:"white",
    },
    mousePoint:{
        position: 'absolute',
    },
    wholeContainer:{
        width: "100%",
        height:"100%",
        backgroundColor: "rgba(0,0,0,0.6)",
        position: "absolute",
    }
});

export default TutorBox;
