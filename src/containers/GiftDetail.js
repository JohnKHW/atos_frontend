import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import HeaderIndex from "src/common/HeaderIndex";
import FooterIndex from "src/common/FooterIndex";
import { ComponentStyles } from "src/common/ContainerStyles";
import api from "../api";
import SaveHistory from "src/common/SaveHistory";
// detail of gift page
const GiftDetail = (props) => {
  const [title, setTitle] = useState(props.route.params.title);
  const [description, setDescription] = useState(
    props.route.params.description
  );
  const [netpoint, setNetPoint] = useState(props.route.params.netpoint);
  const [id, setID] = useState(props.route.params.id);

  const data = [
    {
      id: id,
      title: title,
      description: description,
      netpoint: netpoint,
      active: true,
    }
  ]
  const deductNetPoint = () => {
    console.log("id ", id);

    api
    .get(`/api/coupons/use/${id}`)
    .then((response) => {
      console.log("data sendback", response.data);
      addSave();
      alert("Sucuss");
      props.navigation.navigate("MyGift",{
        active: true,
        id: id,
      });

    })
    .catch((error) => {
      console.log("I have error ", error);
    });

  };
  const addSave = () => {
    try {
      SaveHistory.set(data);
      console.log("ADDed ", SaveHistory.get());
    } catch (e) {
      console.error(e);
    }
  };
  useEffect(() => {
    setTitle(props.route.params.title);
    setDescription(props.route.params.description);
    setNetPoint(props.route.params.netpoint);
    setID(props.route.params.id);
   
  });

  useEffect(() => {
    const unsubscribe = props.navigation.addListener("blur", () => {
      setTitle("");
      setDescription("");
      setNetPoint("");
      setID(0);
      
    });
    return () => {
      unsubscribe;
    };
  }, [props.navigation]);

  return (
    <>
      <HeaderIndex navigation={props.navigation} />
      <View style={[ComponentStyles.container_v2, { alignItems: "center" }]}>
        <View style={styles.detailContainer}>
          <Text style={styles.netpoint}>{netpoint} NET POINTS</Text>

          <Text style={styles.title}>{title}</Text>
          <Text style={styles.content}>{description}</Text>

          <ScrollView style={styles.contentContainer}>
            <View style={styles.ruleContainer}>
              <Text style={styles.rules}>-rules 01</Text>
              <Text style={styles.rules}>-rules 02</Text>
              <Text style={styles.rules}>-rules 03</Text>
              <Text style={styles.rules}>-rules 04</Text>
              <Text style={styles.rules}>-rules 05</Text>
            </View>
          </ScrollView>
          <TouchableOpacity
            style={styles.useBtnContainer}
            onPress={() => {
              deductNetPoint();
            }}
          >
            <Text style={styles.useBtnText}>Agree and use it</Text>
          </TouchableOpacity>
        </View>
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
  title: {
    textAlign: "center",
    fontSize: 28,
    marginTop: 10,
    color: "#FF6319",
    fontWeight: "bold",
  },
  content: {
    textAlign: "center",
    fontSize: 24,
    marginTop: 10,
    fontWeight: "bold",
  },
  contentContainer: {
    padding: 5,
    top: 100,
  },
  netPointContainer: {
    flexDirection: "row",
    padding: 10,
  },
  netpoint: {
    textAlign: "center",
    fontSize: 20,
    marginTop: 10,
    color: "#FF6319",
    fontWeight: "bold",
  },
  detailContainer: {
    width: "80%",
    height: "75%",
    backgroundColor: "rgba(255, 255, 255,0.3)",
    borderRadius: 20,
    marginVertical: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  rules: {
    fontWeight: "bold",
    fontSize: 16,
  },
  ruleContainer: {},
  useBtnContainer: {
    borderWidth: 1,
    borderRadius: 20,
    padding: 15,
    width: 200,
    backgroundColor: "#309397",
    //flexDirection : "row",
    marginBottom: 50,
    justifyContent: "center",
    alignItems: "center",
  },
  useBtnText: {
    fontSize: 16,
    textAlign: "center",
    color: "white",
    fontWeight: "bold",
  },
});

export default GiftDetail;
