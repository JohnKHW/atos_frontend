import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
} from "react-native";
import HeaderIndex from "src/common/HeaderIndex";
import FooterIndex from "src/common/FooterIndex";

import { ComponentStyles } from "src/common/ContainerStyles";
import NetPoint from "src/components/NetPoint";
import AsyncStorage from "@react-native-async-storage/async-storage";
import ConfigSetup from "src/common/ConfigSetup";
// exchange the netpoint in this page
const Gift = (props) => {
  // feilds
  const [data, setData] = useState(undefined);
  const [netpoint, setNetpoint] = useState("");
  const sampleData = [
    {
      id: "1",
      title: "Donate to XX Charity",
      description: "to plant a tree",
      netpoint: 800,
    },
    {
      id: "2",
      title: "Store ABC",
      description: "15% off coupon",
      netpoint: 500,
    },
    {
      id: "3",
      title: "Store ABC",
      description: "Buy 500-50",
      netpoint: 200,
    },
  ];
  // fetching data
  const getNetPoint = () => {
    fetch(ConfigSetup.getAPI() + "api/user/login", {
      method: "POST",
      body: JSON.stringify({
        token: AsyncStorage.getItem("token"),
      }),
    })
      .then((response) => {
        if (response.status === 201) {
          return response.json();
        }
      })

      .then((data) => {
        setNetpoint(JSON.stringify(data.netpoint));
        console.log(JSON.stringify(data));
      })

      .catch((error) => {
        console.error(error);
        //navigation.navigate("Notification");
      });
  };
  useEffect(() => {
    getNetPoint();
  });
  return (
    <>
      <HeaderIndex navigation={props.navigation} />

      <View style={[ComponentStyles.container_v2, { alignItems: "center" }]}>
        <View style={{ top: -50 }}>
          <NetPoint text={"You now have earned"} netpoint={netpoint} />
        </View>

        <FlatList
          style={{ top: 30 }}
          data={sampleData}
          keyExtractor={({ id }) => id.toString()}
          renderItem={({ item }) => (
            <View style={styles.giftContainer}>
              <Text style={styles.giftNetPoint}>
                {item.netpoint} NET POINTS
              </Text>
              <Text style={styles.giftTitle}>{item.title}</Text>
              <Text style={styles.giftContent}>{item.description}</Text>
              <TouchableOpacity
                style={styles.giftBtnContainer}
                onPress={() => {
                  console.log("clicked");
                  props.navigation.navigate("GiftDetail", {
                    title: item.title,
                    description: item.description,
                    netpoint: item.netpoint,
                  });
                }}
              >
                <Text style={styles.giftBtnText}>Get it</Text>
              </TouchableOpacity>
            </View>
          )}
        />
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
