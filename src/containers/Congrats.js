import React ,{useState}from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import NetPoint from 'src/components/NetPoint'
import {componentStyles} from 'src/common/containerStyles';
import HeaderIndex from 'src/common/HeaderIndex';
import FooterIndex from 'src/common/FooterIndex';
import ConfigSetup from "src/common/ConfigSetup";
import AsyncStorage from "@react-native-async-storage/async-storage";
const Congrats = ({navigation}) => {
    const [netPoint, setNetPoint] = useState("");
    fetch(ConfigSetup.getAPI()+'api/user/login', {
        token: AsyncStorage.getItem("token"),
    }).then((response) => {
        if(response.status===201){
          return response.json();
        }
      
      })
//If response is in json then in success
      .then((data) => {
          //Success 
          setNetPoint(JSON.stringify(data.netPoint));
      })
      //If response is not in json then in error
      .catch((error) => {      
          //Error         
          console.error(error);
      });



    return (
        <>
            <HeaderIndex navigation={navigation} backgroundColor={"#FFC650"}/>
            <View style = {[componentStyles.container_v2,{alignItems: "center"}]}>
                <Text style={{fontSize:40,textTransform: 'uppercase',transform:[{translateY:50}],color:"#FF6319", fontWeight:"bold", marginTop:50,marginBottom:50}}>Conratulations!!</Text>
                <NetPoint netpoint={netPoint} text="you have earned"/>
                <TouchableOpacity style={styles.btn} onPress={()=>navigation.goBack()}>
                    <Text style={styles.btnText}>Start Again</Text>
                </TouchableOpacity>
            </View>
            <FooterIndex style={styles.footer} navigation={navigation}/>
            
        </>
    )
}
const styles = StyleSheet.create({
    footer: {
        position: 'absolute',
        bottom: 0,
        width: '100%',
        height: 84,
    },
    btn:{
        borderWidth:1,
        borderRadius:50,
        padding:5,
        width:150,
        transform : [{translateY:150}],
        backgroundColor:"#309397"
    },
    btnText:{
        fontSize: 26,
        textAlign:"center",
        color:"white"
    }
})

export default Congrats;