import React , {useState, useEffect} from 'react';
import {View, Text, Image,StyleSheet, TouchableOpacity,FlatList} from 'react-native';
import HeaderIndex from 'src/common/HeaderIndex';
import FooterIndex from 'src/common/FooterIndex';

import {componentStyles} from 'src/common/containerStyles';
import ConfigSetup from "src/common/ConfigSetup";
import AsyncStorage from "@react-native-async-storage/async-storage";
import TutorBox from 'src/components/TutorBox';
const Scan_2 = (props) => {

    const [title, setTitle] = useState("Title");
    const [point, setPoint] = useState("Point");
    const [data, setData] = useState(undefined);
    const [hasNext, setHasNext] = useState(undefined);

    const titleobj = [{
        id:'1',
        title:'Chicken',
        point:'50'
      },
      {
        id:'2',
          title:'Local',
          point:'25'
      },
      {
        id:'3',
          title:'No Plastic',
          point:'50'
      }
    ]
    const [totalPoint, setTotalPoint] = useState(0);
    

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
        // for counting the point added to the total the user has
        setTotalPoint((totalPoint) => {totalPoint += point});
        setData(titleobj);
        //fetchingData();
        const clearData =  props.navigation.addListener("focus", () =>  {
            setTitle("");
            setPoint("");
        })
        return () => {
            clearData;
        }
    },[props.navigation]);
    useEffect(() =>{
      if(props.route.params){
         
          if(props.route.params.countHelp){
              
              setHasNext(parseInt(JSON.stringify(props.route.params.countHelp)))
          }else
          {
            setHasNext(0);
          }
          
      }
     
  })
  useEffect(() =>{
    const clearData = props.navigation.addListener("blur" , () => {
        
        setHasNext(0);

    })
    return clearData;
},[props.navigation])
    return (
        <>
            <HeaderIndex navigation={props.navigation}/>
            <View style={[componentStyles.container_v2,{alignItems: "center"}]}>
                <Text>Scan2</Text>
                <View style={styles.scanedCotainer} > 
                    {/*
                        list.map(function(){
                            return <ScanedCotainer/>
                        })
                        */
                    }
                <FlatList
                    data={data}
                    keyExtractor={({ id }) => id.toString()}
                    renderItem={({ item }) => (
                        <View style={styles.scanContainer}>
                            <Text style={styles.foodTitle}>{item.title} +{item.point}</Text>
                            <Text style={styles.foodContent}>content</Text>
                        </View>
                    )}
                 />


                    <View style={{alignItems: "center"}}>
                        <TouchableOpacity style={styles.scanBtnContainer}>
                        
                        <Text style={styles.scanBtnText}>Scan Again</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.reportBtnContainer}
                            onPress={() => props.navigation.navigate("Report")}
                        >
    
                        <Text style={styles.reportText}>Report Problem</Text>
                        </TouchableOpacity>

                    </View>
                 
                </View>
            </View>
        <FooterIndex style={styles.footer} navigation={props.navigation}  />
        {hasNext===1&&
            <View style={{width:"100%",height:"100%",backgroundColor:"rgba(0,0,0,0.7)",position:"absolute"}}></View>
         }
                {hasNext===1&&
                   
                    <TutorBox
                        mouseNum={1}
                        text={"Both method will tell you the net point you earned and the reason."}
                        mouse1left={200}
                        mouse1top={200}
                        circle={0}
                        navigation={props.navigation}
                        isPlace={1}  
                        place ={"Rank"}
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
  scanContainer: {
      backgroundColor: "rgba(255, 255, 255,0.3)",
      borderColor:"white",
      borderWidth:2,
      borderRadius:30,
      height:115,
      marginTop: 20,
      width:298,
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
    //flexDirection : "row",
    marginTop:50,
    alignItems: "center"
    
  },
  scanBtnText:{
    fontSize:16,
    textAlign: 'center',
    color: 'white',
    fontWeight: 'bold',
  },
  scanCam:{
    marginRight:10,
    marginLeft:10,
  },
  qrImage:{
    marginTop:50
  },
  foodTitle:{
      textAlign: 'center',
      fontSize:24,
      marginTop:10,
      color: '#FF6319',
      fontWeight: 'bold'
  },
  foodContent:{
      marginHorizontal : 30,
      marginVertical : 10,
  },
  reportText: {
    fontSize:16,
    textAlign: 'center',
    color: 'white',
    fontWeight: 'bold',
  },
  reportBtnContainer:{
    borderWidth:1,
    borderRadius:50,
    borderColor:"#309397",
    padding:10,
    width:170,
    //flexDirection : "row",
    marginTop:30,
    alignItems: "center"
    
  },
});
export default Scan_2;
