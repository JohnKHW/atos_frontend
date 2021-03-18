import React , {useEffect,useState} from 'react';
import {View, Text,StyleSheet, TouchableOpacity} from 'react-native';
import HeaderIndex from 'src/common/HeaderIndex';
import FooterIndex from 'src/common/FooterIndex';

import {componentStyles} from 'src/common/containerStyles';
import TutorBox from 'src/components/tutorBox';
import ConfigSetup from "src/common/ConfigSetup";
const Help = ({navigation,route}) => {
  const countValue = JSON.stringify(route.params);
  const [getAPI,setAPI] = useState(ConfigSetup.getAPI());
 
  useEffect(() =>{
      const getData = navigation.addListener('focus' , () => {
          console.log(ConfigSetup.getAPI());
          setAPI(ConfigSetup.getAPI());
      })

    return () => {
        getData;
    }
  
  },[navigation])

  if(countValue === 0)
      navigation.navigate("DefaultContainer");
  else{
        return (
          <>
                <HeaderIndex navigation={navigation}/>
                <View style={[componentStyles.container_v2,{alignItems: "center"}]}> 
                    <Text>Help</Text>
                    <View style={styles.helpContainer}>
                        <Text style={styles.helpText}>Welcome to the community of CarboNet!</Text>
                        <View style={{marginTop:50}}>
                          <Text style={styles.helpText}>This is a tutorial to help you get familar with the application.</Text>
                        </View>
                        <TouchableOpacity style={styles.helpBtnContainer} 
                            onPress={()=>navigation.navigate("DefaultContainer",{
                                count: countValue, 
                            })
                        }>
            
                          <Text style={styles.helpBtnText}>Start</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={[styles.helpBtnContainer,{backgroundColor:"transparent"}]} 
                        
                          onPress={()=>navigation.navigate("DefaultContainer",{
                            count:0
                          })}>
                          <Text style={[styles.helpBtnText,{color:"#309397"}]}>Skip</Text>
                        </TouchableOpacity>
                    </View>
                    <TutorBox text={getAPI}/>
                </View> 
                
              <FooterIndex style={styles.footer} navigation={navigation} route={route}/> 
        
        
                </>    
        );
  }
};

const styles = StyleSheet.create({
  footer: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    height: 84,
  },
  helpContainer: {
      backgroundColor: "rgba(255, 255, 255,0.3)",
      borderColor:"white",
      borderWidth:2,
      borderRadius:50,
      height:453,
      marginTop: 50,
      width:292,
      alignItems: "center",
      justifyContent: "center",
  },
  helpText: {
    fontSize:18,
    textAlign: 'center',
    fontWeight: 'bold',
    color: '#309397',
    width: 250,
    textTransform: 'uppercase',
  },
  helpBtnContainer:{
    borderWidth:1,
    borderRadius:50,
    padding:10,
    width:170,
    backgroundColor:"#309397",
    flexDirection : "row",
    marginTop:25,
    alignItems: "center",
    justifyContent: "center"
    
  },
  helpBtnText:{
    fontSize:16,
    textAlign: 'center',
    color: 'white',
  },
});
export default Help;
