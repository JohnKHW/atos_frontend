import React, { useState } from "react";

import { View, Text, Image, StyleSheet } from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

const ArticleBox = (props) => {
  const [id] = useState(props.id);
  const [title] = useState(props.title);
  const [owner] = useState(props.owner);
  const [date] = useState(props.date);

  const deltaDate = (date) => {
    const delta = Date.now() - new Date(date);
    const second = Math.round(delta / 1000);
    // delta time is seond
    if (second < 60) {
      return "now";
    } else if (second < 3600) {
      return Math.round(second / 60) + " mins ago";
    } else if (second < 86400) {
      return Math.round(second / 3600) + " hrs ago";
    } else if (second < 604800) {
      return Math.round(second / 86400) + " days ago";
    } else if (second < 2629743) {
      return Math.round(second / 604800) + " weeks ago";
    } else if (second < 31556926) {
      return Math.round(second / 2629743) + " months ago";
    }
    return Math.round(second / 31556926) + " years ago";
  };

  return (
    <View style={styles.rankContent}>
      <View style={styles.rankUserContent}>
        <Text style={styles.rankUserContentText}>{title}</Text>
        <Text style={styles.rankUserContentText}>{owner}</Text>
        <Text style={styles.rankUserContentText}>{deltaDate(date)}</Text>
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
export default ArticleBox;
