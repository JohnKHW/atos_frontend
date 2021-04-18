import React, { useState } from "react";

import { View, Text, Image, StyleSheet } from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
const RankUserContent = (props) => {
  const [name] = useState(props.name);
  const [netPoint] = useState(props.point);

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
  );
};
const styles = StyleSheet.create({
  rankContent: {
    borderWidth: 2,
    borderRadius: 20,
    width: wp("80%"),
    height: hp("13%"),
    borderColor: "#FF6319",
    flexDirection: "row",
    marginVertical: 10,
  },
  rankNo: {
    borderWidth: 2,
    borderRadius: 20,
    width: 30,
    height: 30,
    marginVertical: hp("5%"),
    marginHorizontal: 20,
    borderColor: "#FF6319",
  },
  rankNoText: {
    fontSize: 24,
    textAlign: "center",
    fontWeight: "bold",
    color: "#FF6319",
  },
  rankUserRing: {
    borderWidth: 2,
    borderRadius: 50,
    padding: 19,
    marginVertical: hp("1%"),
    alignItems: "center",
    justifyContent: "center",
  },
  rankUserContent: {
    flexDirection: "column",
    justifyContent: "center",
    marginHorizontal: 10,
  },
  rankUserContentText: {
    fontSize: 25,
    color: "#FF6319",
    fontWeight: "bold",
  },
});
export default RankUserContent;
