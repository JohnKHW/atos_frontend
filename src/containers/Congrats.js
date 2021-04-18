import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import NetPoint from "src/components/NetPoint";
import { ComponentStyles } from "src/common/ContainerStyles";
import HeaderIndex from "src/common/HeaderIndex";
import FooterIndex from "src/common/FooterIndex";
import ConfigSetup from "src/common/ConfigSetup";
import AsyncStorage from "@react-native-async-storage/async-storage";
import TutorBox from "src/components/TutorBox";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

//Here is the congrats page
const Congrats = (props) => {
  //congrats fields
  const [hasNext, setHasNext] = useState(undefined);
  const [netPoint, setNetPoint] = useState("");
  //fetching data
  fetch(ConfigSetup.getAPI() + "api/user/login", {
    token: AsyncStorage.getItem("token"),
  })
    .then((response) => {
      if (response.status === 201) {
        return response.json();
      }
    })
    .then((data) => {
      //Success
      //setNetPoint(JSON.stringify(data.netPoint));
    })
    .catch((error) => {
      //Error
      console.error(error);
    });

  // any params in route then set value
  useEffect(() => {
    if (props.route.params) {
      if (props.route.params.countHelp) {
        setHasNext(parseInt(JSON.stringify(props.route.params.countHelp)));
      } else {
        setHasNext(0);
      }
    }
  });
  // clear data change screen
  useEffect(() => {
    const clearData = props.navigation.addListener("blur", () => {
      setHasNext(0);
      props.navigation.setParams({
        helpCount: null,
        hasNext: null,
        countHelp: null,
      });
      console.log("HERE!!!!!", props.route.params);
    });
    return clearData;
  }, [props.navigation]);

  return (
    <>
      <HeaderIndex navigation={props.navigation} />
      <View style={[ComponentStyles.container_v2, { alignItems: "center" }]}>
        <Text
          style={{
            fontSize: 40,
            textTransform: "uppercase",
            transform: [{ translateY: 50 }],
            color: "#FF6319",
            fontWeight: "bold",
            marginTop: 50,
            marginBottom: 50,
          }}
        >
          Conratulations!!
        </Text>
        <NetPoint netpoint={netPoint} text="you have earned" />
        <TouchableOpacity
          style={styles.btn}
          onPress={() => props.navigation.goBack()}
        >
          <Text style={styles.btnText}>Start Again</Text>
        </TouchableOpacity>
      </View>
      <FooterIndex style={styles.footer} navigation={props.navigation} />
      {hasNext === 1 && (
        <View
          style={{
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0,0,0,0.7)",
            position: "absolute",
          }}
        ></View>
      )}
      {hasNext === 1 && (
        <TutorBox
          mouseNum={1}
          text={
            "We will tell you net points you have earned through the walk and you can start again at anytime."
          }
          mouse1left={200}
          mouse1top={hp("20%")}
          circle={0}
          navigation={props.navigation}
          isPlace={1}
          place={"Scan"}
          boxtop={-10}
          haveCount={0}
          hasNext={1}
        />
      )}
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
  btn: {
    borderWidth: 1,
    borderRadius: 50,
    padding: 5,
    width: 150,
    transform: [{ translateY: 150 }],
    backgroundColor: "#309397",
  },
  btnText: {
    fontSize: 26,
    textAlign: "center",
    color: "white",
  },
});

export default Congrats;
