import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  FlatList,
  Alert,
  TouchableOpacity,
  SafeAreaView
} from "react-native";
import HeaderIndex from "src/common/HeaderIndex";
import FooterIndex from "src/common/FooterIndex";
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
  } from "react-native-responsive-screen";
import { ComponentStyles } from "src/common/ContainerStyles";
import SaveHistory from "src/common/SaveHistory";
const History = (props) => {
    // feilds
  const [data, setData] = useState({});
  const [currentTime, setTime] = useState(0);
  var mytime;
  // enter page to update a timer
  useEffect(() => {
    const reRun = props.navigation.addListener("focus", () => {
      setTime(Date.now().toString());

      console.log("focus");
    });
    mytime = setTimeout(() => {
      setTime(Date.now().toString());
      //Alert.alert("Time " + currentTime);
    }, 3000);

    // clear data
    const unsubscribe = props.navigation.addListener("blur", () => {
      clearTimeout(mytime);
      console.log("I done clear");
    });
    return () => {
      unsubscribe;
      reRun;
    };
  });
  // set data
  useEffect(() => {
    const reRun = props.navigation.addListener("focus", async () => {
      setData(SaveHistory.get());
    });

    return () => {
      reRun;
    };
    //console.log("getted data", testData);
  }, [props.navigation]);

  return (
    <>
      <HeaderIndex navigation={props.navigation} />
        
   
         <SafeAreaView style={[ComponentStyles.container_v2, {alignItems: "center" ,height:"70%",borderWidth:1}]}>
         <Text style={styles.title}>History</Text>
            <FlatList
            style={{ top: 40 }}
            data={data}
            extraData={currentTime}
            keyExtractor={({ id }) => id.toString()}
            renderItem={({ item }) =>
                data === null ? (
                <Text>No any history</Text>
                ) : (
            
                    <View style={styles.saveContainer}>
                        <Text style={styles.saveId}>Coupon ID: {item.id}</Text>
                    <Text style={styles.saveTitle}>{item.title}</Text>
                
                    </View>
        
                )
            }
            />
        </SafeAreaView>
   
      <FooterIndex style={styles.footer} navigation={props.navigation} />
      </>
      )
      
}


const styles = StyleSheet.create({
    footer: {
      position: "absolute",
      bottom: 0,
      width: "100%",
      height: 84,
    },
    title: {
      fontSize: 25,
      color: "#FF6319",
      top:20,
      textAlign: "center",
    },
    saveContainer: {
        backgroundColor: "rgba(255, 255, 255,0.3)",
        borderColor: "white",
        borderWidth: 2,
        borderRadius: 30,
        height: 100,
        marginTop:50,
        width: 298,
        justifyContent: "center",
        alignItems: "center",
    },
    saveTitle: {
      textAlign: "center",
      fontSize: 24,
      marginTop: 10,
      color: "#FF6319",
      fontWeight: "bold",
    },
    saveId:{
        textAlign: "center",
        fontSize: 24,
        marginTop: 10,
        color: "#FF6319",
        fontWeight: "bold",
    },
   
  });

export default History;