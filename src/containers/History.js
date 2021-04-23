import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  FlatList,
  Alert,
  TouchableOpacity,
} from "react-native";
import HeaderIndex from "src/common/HeaderIndex";
import FooterIndex from "src/common/FooterIndex";

import { ComponentStyles } from "src/common/ContainerStyles";
import SaveHistory from "src/common/SaveHistory";
const History = () => {
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
      <View style={[ComponentStyles.container_v2, { alignItems: "center" }]}>
        <Image source={require("src/assets/images/icon_favour.png")}></Image>
        <Text style={styles.title}>Save Article</Text>

        <FlatList
          data={data}
          extraData={currentTime}
          keyExtractor={({ id }) => id.toString()}
          renderItem={({ item }) =>
            data === null ? (
              <Text>No any history</Text>
            ) : (
              <TouchableOpacity
               
              >
                <View style={styles.saveContainer}>
                  <Text style={styles.saveTitle}>{item.name}</Text>
                </View>
              </TouchableOpacity>
            )
          }
        />
      </View>
      <FooterIndex style={styles.footer} navigation={props.navigation} />
      </>
      )
      
}

const styles = Style

export default History;