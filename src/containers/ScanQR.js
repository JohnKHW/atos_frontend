import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  Alert,
  Linking,
} from "react-native";
import HeaderIndex from "src/common/HeaderIndex";
import FooterIndex from "src/common/FooterIndex";

import { ComponentStyles } from "src/common/ContainerStyles";
import QRCodeScanner from "react-native-qrcode-scanner";
import { RNCamera } from "react-native-camera";
import AsyncStorage from "@react-native-async-storage/async-storage";
import TutorBox from "src/components/TutorBox";
import ConfigSetup from "src/common/ConfigSetup";
import api from "../api";

// here is for QR code scan
const ScanQR = (props) => {
  // fields
  //const [QRdata, setQRData] = useState("");
  let QRdata = "";
  const [hasNext, setHasNext] = useState(undefined);
  // scan well , then ok and send data
  const onSuccess = (e) => {
    Alert.alert("OK", e.data);
    //setQRData((QRdata) => {return e.data});
    QRdata = e.data;
    console.log("QR code scan", e.data);
    console.log("set QR code data", QRdata);
    sendQRData();
  };
  // send data
  const sendQRData = async () => {
    console.log("QR code", QRdata);
    const token = await AsyncStorage.getItem("token");
    console.log("token ", token);
    console.log(`${ConfigSetup.getAPI()}api/cashiers/cal/${QRdata}`);
    api
      .get(`/api/cashiers/cal/${QRdata}`)
      .then((response) => {
        const result = response.data;
        console.log("data", result);
        Alert.alert("You have earned " + result.score + "net points");
        //props.navigation.navigate("Scan_2");
      })
      .catch((error) => {
        console.log(error);
      });
    /* fetch(`${ConfigSetup.getAPI()}api/cashiers/cal/${QRdata}`, {
      method: "GET",
      headers: {
        Authorization: "Bearer " + token,
      },
    })
      .then((response) => {
        if (response.status === 200) {
          //console.log("response", response);
          return response.json();
        }
      })

      .then((data) => {
        //Alert.alert(""+ data );
        //Alert.alert(""+ data );
        console.log("data", JSON.stringify(data));
        props.navigation.navigate("Scan_2");
      })

      .catch((error) => {
        console.error(error);
        //props.navigation.navigate("Notification");
      }); */
  };
  // any params in route , set value
  useEffect(() => {
    if (props.route.params) {
      console.log(props.route.params);
      if (props.route.params.countHelp) {
        console.log("setted");
        setHasNext(parseInt(JSON.stringify(props.route.params.countHelp)));
      } else {
        console.log("it is zero");
        setHasNext(0);
      }
    }
  });

  // clearData
  useEffect(() => {
    const clearData = props.navigation.addListener("blur", () => {
      setHasNext(0);
    });
    return clearData;
  }, [props.navigation]);

  useEffect(() => {
    const clearData = props.navigation.addListener("focus", () => {
      setHasNext(0);
    });
    return clearData;
  }, [props.navigation]);

  return (
    <>
      <HeaderIndex navigation={props.navigation} />
      <View style={[ComponentStyles.container_v2, { alignItems: "center" }]}>
        <Text>ScanQR</Text>
        <View style={styles.scanContainer}>
          <QRCodeScanner
            reactivate={true}
            reactivateTimeout={3000}
            containerStyle={styles.qrScan}
            cameraStyle={{ height: 200, width: 200 }}
            onRead={onSuccess}
            topContent={
              <Text style={styles.centerText}>
                <Text style={styles.textBold}>Scan please</Text>
              </Text>
            }
            bottomContent={
              <TouchableOpacity style={styles.buttonTouchable}>
                <Text style={styles.buttonText}>OK</Text>
              </TouchableOpacity>
            }
          />
        </View>
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
          text={"You can scan the QR code here"}
          mouse1left={300}
          mouse1top={500}
          circle={0}
          navigation={props.navigation}
          isPlace={1}
          place={"Scan"}
          boxtop={-50}
          haveCount={1}
          nowCount={3}
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
  scanContainer: {
    backgroundColor: "rgba(255, 255, 255,0.3)",
    borderColor: "white",
    borderWidth: 2,
    borderRadius: 50,
    height: 450,
    marginTop: 50,
    width: 292,
    alignItems: "center",
    justifyContent: "center",
  },
  scanText: {
    fontSize: 18,
    textAlign: "center",
    fontWeight: "bold",
    color: "#309397",
    textTransform: "uppercase",
  },
  scanBtnContainer: {
    borderWidth: 1,
    borderRadius: 50,
    padding: 10,
    width: 170,
    backgroundColor: "#309397",
    flexDirection: "row",
    marginTop: 50,
  },
  scanBtnText: {
    fontSize: 16,
    textAlign: "center",
    color: "white",
  },
  scanCam: {
    marginRight: 10,
    marginLeft: 10,
  },
  qrImage: {
    marginTop: 50,
  },
  centerText: {
    flex: 1,
    fontSize: 18,
    padding: 32,
    color: "#777",
  },
  textBold: {
    fontWeight: "500",
    color: "#000",
  },
  buttonText: {
    fontSize: 21,
    color: "rgb(0,122,255)",
  },
  buttonTouchable: {
    padding: 16,
  },
  qrScan: {
    justifyContent: "center",
    alignItems: "center",
  },
});
export default ScanQR;
