import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  SafeAreaView
} from "react-native";
import HeaderIndex from "src/common/HeaderIndex";
import FooterIndex from "src/common/FooterIndex";

import { ComponentStyles } from "src/common/ContainerStyles";
import api from "../api";
import NetPoint from "src/components/NetPoint";
import AsyncStorage from "@react-native-async-storage/async-storage";
import SaveHistory from "src/common/SaveHistory";
const MyGift = (props) => {
    const [data, setData] = useState(undefined);
    const [netpoint, setNetpoint] = useState("");
    const [used, setUsed] = useState(false);
    const [objID, setObjID] = useState(0);
    const [historyData, setHistoryData] = useState(SaveHistory.get());
    const fetchData = () => {
        api
        .get("/api/user")
        .then((response) => {
          console.log("data gift", response.data);
          const point = response.data;
          setNetpoint(point.net_points);
        })
        .catch((error) => {
          console.log("I have error ", error);
        });
      api
      .get("/api/coupons/all")
      .then((response) => {
        console.log("data Mygift", response.data.coupons);
        const gift = response.data.coupons;
        setData(gift);
      })
      .catch((error) => {
        console.log("I have error ", error);
      });
  
    }

    
    useEffect(() => {
      const add = props.navigation.addListener("focus", () => {
        fetchData();
       
        console.log("History in gift", historyData);
       console.log("used 1" , used);
       console.log("objID " , objID);
      })

    
      return () =>{
        add;
    
      }
    },[props.navigation])

    useEffect(() => {
        console.log("route " , props.route.params);
      
        if(props.route.params){

            //if(props.route.params.active){
             //   setUsed(props.route.params.active);
            
           // }
           /*
            if(props.route.params.id){
                setObjID(props.route.params.id);
                
            }
            */
       }
    })
    console.disableYellowBox = true;
    return (
    
        <>
            <HeaderIndex navigation={props.navigation} />
            <View style={[ComponentStyles.container_v2, { alignItems: "center" }]}>
            <NetPoint text={"You have earn"} netpoint={netpoint} />
                <SafeAreaView style={{height:"50%"}}>
                <FlatList
                    style={{ top: 40 }}
                    data={data}
                    keyExtractor={({ id }) => id.toString()}
                    renderItem={({ item }) => {
                        console.log("item user coupon id", item.user_coupon.id);
                        console.log("history", historyData);
                        const hit = historyData.filter((id,index) => id.id===item.user_coupon.id);
                        if(hit[0]!==undefined){
                            console.log("hit ", hit[0].id);
                        }
                    return  (
                <View style={styles.giftContainer}>
                <Text style={styles.giftNetPoint}>
                    {item.user_coupon.id} NET POINTS
                </Text>
                <Text style={styles.giftTitle}>{item.name}</Text>
                <Text style={styles.giftContent}>{item.description}</Text>
                <TouchableOpacity
                    disabled={
                        hit[0]!==undefined?(hit[0].active):false
                    }
                    style={styles.giftBtnContainer}
                    onPress={() => {
                    console.log("clicked");
                        props.navigation.navigate("GiftDetail",{
                            title: item.name,
                            description: item.description,
                            id: item.user_coupon.id,
                            netpoint: item.points_cost
                        })

                    }}
                >
                <Text style={styles.giftBtnText}>Get it</Text>
              </TouchableOpacity>
              
            </View>
            
          )}}
        />
        </SafeAreaView>
            </View>
            
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
      giftContainer: {
        backgroundColor: "rgba(255, 255, 255,0.3)",
        borderColor: "white",
        borderWidth: 2,
        borderRadius: 30,
        height: 150,
        marginTop: 50,
        width: 298,
        justifyContent: "center",
        alignItems: "center",
      },
      giftTitle: {
        textAlign: "center",
        fontSize: 24,
        marginTop: 10,
        color: "#FF6319",
        fontWeight: "bold",
      },
      giftContent: {
        marginHorizontal: 30,
        marginVertical: 10,
      },
      giftNetPoint: {
        textAlign: "center",
        fontSize: 16,
        marginTop: 10,
        color: "#FF6319",
        fontWeight: "bold",
      },
      giftBtnContainer: {
        borderWidth: 1,
        borderRadius: 50,
        padding: 5,
        width: 100,
        backgroundColor: "#309397",
        //flexDirection : "row",
        marginBottom: 20,
      },
      giftBtnText: {
        fontSize: 16,
        textAlign: "center",
        color: "white",
        fontWeight: "bold",
      },
})
export default MyGift;