import React , {useState, useEffect} from 'react';
import {View, Text, StyleSheet,Image} from 'react-native';
import HeaderIndex from 'src/common/HeaderIndex';
import FooterIndex from 'src/common/FooterIndex';

import {componentStyles} from 'src/common/containerStyles';
import ConfigSetup from "src/common/ConfigSetup";
import AsyncStorage from "@react-native-async-storage/async-storage";
import TutorBox from 'src/components/TutorBox';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

// rank box render when call 
// * must have no, name and point in props
const RankUserContent = (props) =>{

  const [name, setName] = useState(props.name);
  const [netPoint, setNetPoint] = useState(props.point);
  
  return (
    <View style={styles.rankContent}>
        <View style={styles.rankNo}>
          <Text style={styles.rankNoText}>{props.no}</Text>
        </View>
        <View style={styles.rankUserRing}>
          <Image source={require("src/assets/images/icon_rankuser.png")}></Image>
        </View>
        <View style={styles.rankUserContent}>
          <Text style={styles.rankUserContentText}>{name}</Text>
          <Text style={styles.rankUserContentText}>{netPoint} pt</Text>
        </View>
    </View>

  )
}

// for ranking page
const Rank = (props) => {
  //feilds
  const rankTitle = "Regional Rank";
  const [hasNext, setHasNext] = useState(undefined);
  const [data , setData] = useState({});
  // fetching data
  const fetchingUsers = async() => {
      fetch(ConfigSetup.getAPI()+'api/rank/users/all', {
        token:  AsyncStorage.getItem("token"),
      }).then((response) => {
        if(response.status===201){
          return response.json();
        }
      
      })

      .then((data) => {
          //Success 
          setData(data);
      })
      
      .catch((error) => {      
          //Error         
          console.error(error);
      });
}
//update fetching
  useEffect(() =>{
    fetchingUsers();
  },[props.navigation])

  //any params in route then set value
  useEffect(() =>{
    if(props.route.params){
        console.log("",props.route.params)
        if(props.route.params.countHelp){
            
            setHasNext(parseInt(JSON.stringify(props.route.params.countHelp)))
        }else{
            setHasNext(0);
        }
        
    }
   
})
//clear data
useEffect(() =>{
  const clearData = props.navigation.addListener("blur" , () => {
      console.log("clear!");
      setHasNext((hasNext)=> hasNext=0);
      console.log("clear ", hasNext );

  })
  return clearData;
},[props.navigation])
  //const totalPoint = route.params.totalPoint;
  //const [netPoint, setNetPoint] = useState(route.params.totalPoint);
  //const total = setNetPoint(route.params);
  //setNetPoint(route.params.totalPoint);
  return (
    <>
    <HeaderIndex navigation={props.navigation}/>
      <View style={[componentStyles.container_v2,{alignItems: "center"}]}>
          <View style={styles.context}>
            <Text style={styles.rankTitle}>{rankTitle}</Text>
            <RankUserContent no={1} name="Name" point={"00000"}/>
            <RankUserContent no={2} name="Name" point={"00000"}/>
            <RankUserContent no={3} name="Name" point={"00000"}/>
            <RankUserContent no={'??'} name="You name" point={"00000"}/>
          </View>
      </View>
      
      <FooterIndex style={styles.footer} navigation={props.navigation}/>
      {hasNext===1&&
            <View style={{width:"100%",height:"100%",backgroundColor:"rgba(0,0,0,0.7)",position:"absolute"}}></View>
         }
                {hasNext===1&&
                   
                    <TutorBox
                        mouseNum={1}
                        text={"You can see the rank of your region here."}
                        mouse1left={340}
                        mouse1top={hp('90%')}
                        circle={1}
                        navigation={props.navigation}
                        isPlace={1}  
                        place ={"FinishTutor"}
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
  rankTitle:{
    fontSize:28,
    textAlign: 'center',
    marginVertical:20,
    color: "#309397",
    fontWeight: 'bold'
  },
  rankContent:{
    borderWidth:2,
    borderRadius:20,
    width:wp('80%'),
    height:hp('13%'),
    borderColor:"#FF6319",
    flexDirection: 'row',
    marginVertical:10
  },
  rankNo:{
    borderWidth:2,
    borderRadius:20,
    width:30,
    height:30,
    marginVertical:hp('5%'),
    marginHorizontal:20,
    borderColor:"#FF6319",
  },
  rankNoText:{
    fontSize:24,
    textAlign: 'center',
    fontWeight: 'bold',
    color: "#FF6319"
  },
  rankUserRing:{
    borderWidth:2,
    borderRadius:50,
    padding:19,
    marginVertical:hp('1%'),
    alignItems: "center",
    justifyContent: "center"
  },
  rankUserContent:{
    flexDirection: 'column',
    justifyContent: 'center',
    marginHorizontal:10
  },
  rankUserContentText:{
    fontSize: 25,
    color:"#FF6319",
    fontWeight: 'bold',
  },

  
});
export default Rank;
