import React , {useState, useEffect} from 'react';
import {View, Text, StyleSheet,Image} from 'react-native';
import HeaderIndex from 'src/common/HeaderIndex';
import FooterIndex from 'src/common/FooterIndex';

import {componentStyles} from 'src/common/containerStyles';
import ConfigSetup from "src/common/ConfigSetup";
import AsyncStorage from "@react-native-async-storage/async-storage";

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


const Rank = ({navigation}) => {

  const rankTitle = "Regional Rank";
  const [data , setData] = useState({});
  const fetchingData = async() => {fetch(ConfigSetup.getAPI()+'api/user/login', {
    token:  AsyncStorage.getItem("token"),
  }).then((response) => {
    if(response.status===201){
      return response.json();
    }
  
  })
//If response is in json then in success
  .then((data) => {
      //Success 
      setData(data);
  })
  //If response is not in json then in error
  .catch((error) => {      
      //Error         
      console.error(error);
  });
}
  useEffect(() =>{
    fetchingData();
  },[navigation])


  //const totalPoint = route.params.totalPoint;
  //const [netPoint, setNetPoint] = useState(route.params.totalPoint);
  //const total = setNetPoint(route.params);
  //setNetPoint(route.params.totalPoint);
  return (
    <>
    <HeaderIndex navigation={navigation}/>
      <View style={[componentStyles.container_v2,{alignItems: "center"}]}>
        
          <Text style={styles.rankTitle}>{rankTitle}</Text>
          <RankUserContent no={1} name="Name" point={"00000"}/>
          <RankUserContent no={2} name="Name" point={"00000"}/>
          <RankUserContent no={3} name="Name" point={"00000"}/>
          <RankUserContent no={'??'} name="You name" point={"00000"}/>
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
    width:289,
    height:121,
    borderColor:"#FF6319",
    flexDirection: 'row',
    marginVertical:10
  },
  rankNo:{
    borderWidth:2,
    borderRadius:20,
    width:30,
    height:30,
    marginVertical:45,
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
    width:80,
    height:80,
    marginVertical:20,
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
  }
  
});
export default Rank;
