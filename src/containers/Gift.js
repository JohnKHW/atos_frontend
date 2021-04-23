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
// exchange the netpoint in this page
const Gift = (props) => {
  // feilds
  const [data, setData] = useState(undefined);
  const [netpoint, setNetpoint] = useState("");
  
  const fetchData = () => {
    api
    .get("/api/coupons")
    .then((response) => {
      console.log("data gift", response.data);
      const gift = response.data;
      setData(gift);
    })
    .catch((error) => {
      console.log("I have error ", error);
    });

  }
  
  const redeem = (id) => {
    api
    .get(`/api/coupons/redeem/${id}`)
    .then((response) => {
      console.log("data redeem", response.data);
      alert("Sucess");
    })
    .catch((error) => {
      console.log("I have error ", error);
    });

  }

  useEffect(() => {
    const add = props.navigation.addListener("focus", () => {
      fetchData();
    })
    return () =>{
      add;
    }
  },[props.navigation])


  const tData = data;

  return (
    <>
      <HeaderIndex navigation={props.navigation} />

      <View style={[ComponentStyles.container_v2, { alignItems: "center" }]}>
      <Text style={{fontSize: 20,top:30,fontWeight:'bold'}}>Here are the gift lists</Text>
        <SafeAreaView style={{height:"70%"}}>
 
        <FlatList
          style={{ top: 30 }}
          data={tData}
          keyExtractor={({ id }) => id.toString()}
          renderItem={({ item }) => (
            <View style={styles.giftContainer}>
              <Text style={styles.giftNetPoint}>
                {item.points_cost} NET POINTS
              </Text>
              <Text style={styles.giftTitle}>{item.name}</Text>
              <Text style={styles.giftContent}>{item.description}</Text>
              <TouchableOpacity
                style={styles.giftBtnContainer}
                onPress={() => {
                  console.log("clicked");
                  redeem(item.id);
                }}
              >
                <Text style={styles.giftBtnText}>Get it</Text>
              </TouchableOpacity>
            </View>
          )}
        />
        </SafeAreaView>
      </View>
      <FooterIndex style={styles.footer} navigation={props.navigation} />
    </>
  );
};

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
});

export default Gift;
