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

import AsyncStorage from "@react-native-async-storage/async-storage";
import { launchCamera, launchImageLibrary } from "react-native-image-picker";
import TutorBox from "src/components/TutorBox";
import ConfigSetup from "src/common/ConfigSetup";
//scan food page
const ScanFood = (props) => {
  // fields
  const [response, setResponse] = useState(null);
  const [didCancel, setDidCancel] = useState(true);
  const [uri, setUri] = useState(null);
  const [hasNext, setHasNext] = useState(undefined);

  // creat a form data to upload photo
  const createData = (photo, body) => {
    const data = new FormData();

    data.append("photo", {
      name: photo.fileName,
      type: photo.type,
      uri: photo.uri,
    });

    Object.keys(body).forEach((key) => {
      data.append(key, body[key]);
    });
    return data;
  };

  const sendFoodData = async () => {
    fetch(`${ConfigSetup.getAPI()}cashier/cal`, {
      method: "POST",
      body: createData(response, await AsyncStorage.getItem("token")),
    })
      .then((response) => {
        if (response.status === 201) {
          return response.json();
        }
      })

      .then((data) => {
        Alert.alert("" + JSON.stringify(data));
        props.navigation.navigate("Scan_2");
      })

      .catch((error) => {
        console.error(error);
      });
  };
  // any params in route
  useEffect(() => {
    if (props.route.params) {
      console.log(props.route.params);
      if (props.route.params.countHelp) {
        setHasNext(parseInt(JSON.stringify(props.route.params.countHelp)));
      } else {
        setHasNext(0);
      }
    }
  });
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
        <Text>Scan Food</Text>
        <View style={styles.scanContainer}>
          <TouchableOpacity
            onPress={() => {
              launchCamera(
                {
                  mediaType: "photo",
                  includeBase64: false,
                  maxHeight: 200,
                  maxWidth: 200,
                  //saveToPhotos:true,
                },
                (response) => {
                  setResponse(response);
                  console.log("s ", JSON.stringify(response.didCancel));
                  setDidCancel(JSON.stringify(response.didCancel));
                  if (response.uri) {
                    setUri(JSON.stringify(response.uri));
                  }
                }
              );
            }}
            style={styles.scanBtnContainer}
          >
            <Text style={styles.scanBtnText}>Take photo</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.scanBtnContainer}
            onPress={() => {
              if (!didCancel) {
                sendFoodData();
              } else {
                Alert.alert("You haven't take a photo yet!");
              }
            }}
          >
            <Text style={styles.scanBtnText}>Send</Text>
          </TouchableOpacity>
          {!didCancel && (
            <View style={styles.image}>
              <Image
                style={{ width: 200, height: 200 }}
                source={{ uri: response.uri }}
              />
            </View>
          )}
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
          text={"You can scan the food and send to us here."}
          mouse1left={200}
          mouse1top={500}
          circle={0}
          navigation={props.navigation}
          isPlace={1}
          place={"Scan_2"}
          boxtop={-100}
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
  scanBtnText: {
    fontSize: 16,
    textAlign: "center",
    color: "white",
  },
  scanBtnContainer: {
    borderWidth: 1,
    borderRadius: 50,
    padding: 10,
    width: 170,
    backgroundColor: "#309397",
    flexDirection: "row",
    marginTop: 30,
    justifyContent: "center",
  },
});
export default ScanFood;
