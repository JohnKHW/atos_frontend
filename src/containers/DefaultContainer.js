import React ,{useState,useEffect} from 'react';
import {View, Text, StyleSheet,Button, useWindowDimensions, Image,Alert} from 'react-native';
import HeaderIndex from 'src/common/HeaderIndex';
import FooterIndex from 'src/common/FooterIndex';
import NavContainer from 'src/containers/NavContainer';
import {createDrawerNavigator} from "@react-navigation/drawer";
import {componentStyles} from 'src/common/containerStyles';
import NetPoint from 'src/components/NetPoint';
import AsyncStorage from "@react-native-async-storage/async-storage";
import SavePost from 'src/common/SavePost';
import TutorBox from 'src/components/TutorBox';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
const Drawer = createDrawerNavigator();

const DefaultContainer = (props) => {
  
const [username, setUsername]= useState("Brian Wong");
const [countSave, setCountSave] = useState(0);
const [countHelp, setCountHelp] = useState(0);

const getUserName = async() => {
  try{
    setUsername(await AsyncStorage.getItem("username"));
    //Alert.alert("added");
  }
  catch(e){
    console.error(e);
    
  }
}
const updateSavedPost = async() =>{
  if(SavePost.get().length===0){
    console.log("it is null");
    const savedPost = JSON.parse(await AsyncStorage.getItem("SavedPost"));
    console.log("Saved post in storage", JSON.parse(await AsyncStorage.getItem("SavedPost")));
    SavePost.setSave(savedPost);
    console.log("done");
    console.log("Saved post ", SavePost.get());
    setCountSave((countSave) => countSave++);
  }
  else{
    console.log("nothing happened " , SavePost.get());
    
  }
}

useEffect(() =>{ 
  const add = props.navigation.addListener('focus' , () => {
    if(countSave===0){
      updateSavedPost();
    }
    getUserName();
  })
  return () => {
      add;
  }
},[props.navigation])
useEffect(() =>{
  if(props.route.params){
    setCountHelp(parseInt(JSON.stringify(props.route.params.countHelp)));
  }
  else{
   //Alert.alert("nothing");
    setCountHelp(0);
  }
  
})
  return (
    <View style={componentStyles.container_v2}>
      <HeaderIndex navigation={props.navigation} />

      <View>
        <Text style={[styles.welcomeText,{marginTop:50}]}>
            Welcome Back!
        </Text>
        <Text style={styles.welcomeText}>
            {username}
        </Text>
        <View style={styles.iconContain}>
          <Image style={styles.icon}
            source={require("src/assets/images/icon_icon.png")}>
            </Image> 
          <View style={styles.contry}>
            <Image source={require('src/assets/images/icon_hongkongFlag.png')} />
            <Text style={styles.loca}>Hong Kong</Text>
          </View>
        </View>
        <NetPoint netpoint="00000" text="you now have earned"/>
      </View>
      <FooterIndex style={styles.footer} navigation={props.navigation}/>
      {countHelp===1&&
      <View style={{width:"100%",height:"100%",backgroundColor:"rgba(0,0,0,0.7)",position:"absolute"}}></View>
      }
             {countHelp===1&&
      <TutorBox
                            mouseNum={2}
                            text={"You can set your information and see the current net points here!"}
                            mouse1left={65}
                            mouse1top={45}
                            mouse2left={300}
                            mouse2top={500}
                            circle={0}
                            navigation={props.navigation}
                            isPlace={1}  
                            place ={"Article"}
                            haveCount={0}
                            boxtop = {0}
                            hasNext = {countHelp}
                           
                            
              />
             }
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    //alignSelf: 'center',
  },
  footer: {
    //backgroundColor: '#defef3',
    position: 'absolute',
    bottom: 0,
    width: '100%',
    height: hp('10%'),
  },
  loca:{
    fontSize: hp('1.8%'),
    alignSelf: 'center',
    color: '#676767',  
  },
  iconContain: {
    margin: 6,
    alignSelf: 'center',
    width: wp('50%'),
    height: hp('23%'),
    backgroundColor: '#EFEFEF',
    borderRadius: 500,
    shadowRadius: 6,
    shadowOpacity: 0.52,
    shadowOffset: {
      height: 1,
    },
    shadowColor: '#9A9A9A',
  },
  icon: {
    alignSelf: 'center',
    width: '100%',
    height: '100%',
    borderRadius: 50,
  },
  contry: {
    alignSelf: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    width: wp('45%'),
    fontSize: 14,
    paddingHorizontal: 25,
    paddingVertical: 5,
    marginTop:25,
    marginBottom:25,
    backgroundColor: '#F5F5F5',
    borderRadius: 16,
    shadowRadius: 6,
    shadowOpacity: 0.52,
    shadowOffset: {
      height: 4,
    },
    shadowColor: '#9A9A9A',
  },
  welcomeText: {
    color: '#f5f5f5',
    fontSize: 24,
    fontWeight: 'bold',
    shadowRadius: 6,
    shadowOpacity: 0.52,
    shadowOffset: {
      height: 4,
    },
    shadowColor: '#9A9A9A',
    justifyContent: 'center',
    alignSelf: 'center',
    transform: [{translateY: -15}],
  },
});
export default DefaultContainer;
