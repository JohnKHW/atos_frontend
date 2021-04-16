import React , {useState,useEffect}from 'react';
import {View, Text, Image,StyleSheet, TouchableOpacity} from 'react-native';
import HeaderIndex from 'src/common/HeaderIndex';
import FooterIndex from 'src/common/FooterIndex';

import {componentStyles} from 'src/common/containerStyles';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import TutorBox from 'src/components/TutorBox';
const Scan = (props) => {
  const [hasNext, setHasNext] = useState(undefined);
  const [helpCount, setHelpCount] = useState(undefined);
  
  useEffect(() =>{
    if(props.route.params){
      console.log(props.route.params);
      if(props.route.params.helpCount){
        console.log("setted");
        setHelpCount(parseInt(JSON.stringify(props.route.params.helpCount)));
    
    }else{
      console.log("it is zero");
      setHelpCount(undefined);
    }
        if(props.route.params.countHelp){
          console.log("setted");
            setHasNext(parseInt(JSON.stringify(props.route.params.countHelp)))
        }
        else{
          console.log("it is zero");
          setHasNext(0);
        }
    }
   
})
useEffect(() =>{
  const clearData = props.navigation.addListener("blur" , () => {
      setHelpCount(undefined);
      setHasNext(undefined);
      props.navigation.setParams({
        helpCount:null,
        hasNext:null,
        countHelp:null})
  })
  return clearData;
},[props.navigation])
  return (
     <>
        <HeaderIndex navigation={props.navigation}/>
        <View style={[componentStyles.container_v2,{alignItems: "center"}]}>
            <Text>Scan</Text>
            <View style={styles.scanContainer}>
                <Text style={styles.scanText}>Scan to earn net point </Text>
                <Image style={styles.qrImage}source={require("src/assets/images/icon_QRcode.png")}></Image>
                <TouchableOpacity style={styles.scanBtnContainer} onPress={()=>props.navigation.navigate("ScanQR",{countHelp:0})}>
                  <Image style={styles.scanCam} source={require("src/assets/images/icon_scanQR_camera.png")}></Image>
                  <Text style={styles.scanBtnText}>Scan QR code</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.scanBtnContainer} 
                    onPress={()=> 
                        props.navigation.navigate("ScanFood",{
                          countHelp:0
                        })
                    }
                    
                >
                  <Text style={styles.scanBtnText}>Scan Food</Text>
                </TouchableOpacity>
              
            </View>
        </View>
    <FooterIndex style={styles.footer} navigation={props.navigation} route={props.route}/>
    {hasNext===1&&
            <View style={{width:"100%",height:"100%",backgroundColor:"rgba(0,0,0,0.7)",position:"absolute"}}></View>
         }
                {helpCount===undefined&&hasNext===1?
                   
                    <TutorBox
                        mouseNum={1}
                        text={"You can scan the QR code and food here"}
                        mouse1left={250}
                        mouse1top={hp('90%')}
                        circle={1}
                        navigation={props.navigation}
                        isPlace={1}  
                        place ={"Scan"}
                        boxtop={0}
                        haveCount={1}
                        nowCount ={2}
                        
                    />:helpCount===2?
                    <TutorBox
                        mouseNum={1}
                        text={"You can also scan QR code to get your net points"}
                        mouse1left={300}
                        mouse1top={hp('58%')}
                        circle={0}
                        navigation={props.navigation}
                        isPlace={1}  
                        place ={"ScanQR"}
                        boxtop={0}
                        haveCount={0}
                        hasNext={1}
                        
                    />:helpCount===3&&
                    <TutorBox
                        mouseNum={1}
                        text={"You can also use the photo scan to take a photo of the food directly"}
                        mouse1left={300}
                        mouse1top={hp('66%')}
                        circle={0}
                        navigation={props.navigation}
                        isPlace={1}  
                        place ={"ScanFood"}
                        boxtop={-10}
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
  scanContainer: {
      backgroundColor: "rgba(255, 255, 255,0.3)",
      borderColor:"white",
      borderWidth:2,
      borderRadius:50,
      height:hp('60%'),
      marginTop: 50,
      width:wp('80%'),
      alignItems: "center",
      justifyContent: "center",
  },
  scanText: {
    fontSize:18,
    textAlign: 'center',
    fontWeight: 'bold',
    color: '#309397',
    textTransform: 'uppercase',
  },
  scanBtnContainer:{
    borderWidth:1,
    borderRadius:50,
    padding:10,
    width:170,
    backgroundColor:"#309397",
    flexDirection : "row",
    marginTop:30,
    justifyContent: "center"
    
  },
  scanBtnText:{
    fontSize:16,
    textAlign: 'center',
    color: 'white',
  },
  scanCam:{
    marginRight:10,
    marginLeft:10,
  },
  qrImage:{
    marginTop:50
  }
});
export default Scan;
