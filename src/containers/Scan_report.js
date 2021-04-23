import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Alert,
} from "react-native";
import HeaderIndex from "src/common/HeaderIndex";
import FooterIndex from "src/common/FooterIndex";

import { ComponentStyles } from "src/common/ContainerStyles";
import AsyncStorage from "@react-native-async-storage/async-storage";
import ConfigSetup from "src/common/ConfigSetup";
import api from "../api";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
// here is the send bug to us page
const Scan_report = ({ navigation }) => {
  const [reportText, setText] = useState("");
  //fetching data
  
  const sendReport = () => {
    api
    .post("/api/user/", {
        reportText:reportText
    })
    .then((response) => {
      console.log("data", response.data);
      navigation.navigate("Notification");
    })
    .catch((error) => {
      console.log(error);
    });
  };

  
  return (
    <>
      <HeaderIndex navigation={navigation} />
      
      <View style={[ComponentStyles.container_v2, { alignItems: "center" }]}>
        <Text>Report</Text>
     
        <Text style={styles.reportTitle}>Something's wrong? </Text>
        <View style={styles.reportContainer}>
          <TextInput
            style={styles.reportContent}
            placeholder="I have some problems in..."
            onChangeText={(reportText) => setText(reportText)}
            value={reportText}
          />
        </View>
        <TouchableOpacity style={styles.sendBtnContainer} onPress={sendReport}>
          <Text style={styles.sendBtnText}>Report Problem</Text>
        </TouchableOpacity>
      </View>
      <FooterIndex style={styles.footer} navigation={navigation} />
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
  reportContainer: {
    backgroundColor: "rgba(255, 255, 255,0.8)",
    borderColor: "white",
    borderWidth: 2,
    borderRadius: 50,
    height: hp('55%'),
    marginTop: 15,
    width: wp('70%'),
    alignItems: "center",
  },
  reportTitle: {
    fontSize: 22,
    textAlign: "center",
    fontWeight: "bold",
    color: "#FF6319",
    textTransform: "uppercase",
    marginTop: 20,
  },
  sendBtnContainer: {
    borderWidth: 1,
    borderRadius: 50,
    padding: 10,
    width: 170,
    backgroundColor: "#309397",
    marginTop: 10,
  },
  sendBtnText: {
    fontSize: 18,
    textAlign: "center",
    color: "white",
  },
  reportContent: {
    marginHorizontal: 30,
    marginVertical: 30,
    fontSize: 16,
  },
});
export default Scan_report;
