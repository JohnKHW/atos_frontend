import React from "react";
import { Text, StyleSheet, ScrollView, SafeAreaView } from "react-native";
import HeaderIndex from "src/common/HeaderIndex";
import FooterIndex from "src/common/FooterIndex";

import { ComponentStyles } from "src/common/ContainerStyles";
import RankUserContent from "../components/RankUserContent";
import api from "../api";

const rankTitle = "Regional Rank";

export default class Rank extends React.Component {
  state = {
    rankData: [],
  };

  constructor(props) {
    super(props);
    this.fetchData();
  }

  fetchData() {
    api
      .get("/api/rank/users/all")
      .then((response) => {
        console.log("data", response.data);
        const rankData = response.data;
        this.setState({ rankData });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  render() {
    return (
      <>
        <HeaderIndex navigation={this.props.navigation} />
        <SafeAreaView
          style={[
            ComponentStyles.container_v2,
            { alignItems: "center", height: "75%" },
          ]}
        >
          <ScrollView style={styles.context}>
            <Text style={styles.rankTitle}>{rankTitle}</Text>
            {this.state.rankData.map((rank, key) => {
              return (
                <RankUserContent
                  no={key + 1}
                  name={rank.name}
                  point={rank.net_points}
                />
              );
            })}
          </ScrollView>
        </SafeAreaView>

        <FooterIndex style={styles.footer} navigation={this.props.navigation} />
      </>
    );
  }
}

const styles = StyleSheet.create({
  footer: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    height: 84,
  },
  rankTitle: {
    fontSize: 28,
    textAlign: "center",
    marginVertical: 20,
    color: "#309397",
    fontWeight: "bold",
  },
});
/* import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  SafeAreaView,
} from "react-native";
import HeaderIndex from "src/common/HeaderIndex";
import FooterIndex from "src/common/FooterIndex";

import { ComponentStyles } from "src/common/containerStyles";
import TutorBox from "src/components/TutorBox";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import api from "../api";
import RankUserContent from "../components/RankUserContent";

// rank box render when call
// * must have no, name and point in props

const fetchingUsers = async () => {
  let data = "121241";
  return api
    .get("/api/rank/users/all")
    .then((response) => {
      console.log(data);
      data = response.data;
      console.log(data);
      return response.data;
    })
    .catch((error) => {
      console.log(error);
    });
};
// for ranking page
const Rank = (props) => {
  //feilds
  const rankTitle = "Regional Rank";
  let test = fetchingUsers();
  let rankData = [
    {
      name: "Demo",
      net_points: 69,
      country_id: 1,
      country: {
        id: 1,
        name: "Hong Kong",
      },
    },
    {
      name: "Admin",
      net_points: 0,
      country_id: 1,
      country: {
        id: 1,
        name: "Hong Kong",
      },
    },
    {
      name: "Test1",
      net_points: 0,
      country_id: 1,
      country: {
        id: 1,
        name: "Hong Kong",
      },
    },
    {
      name: "Test22",
      net_points: 0,
      country_id: 1,
      country: {
        id: 1,
        name: "Hong Kong",
      },
    },
    {
      name: "iambot",
      net_points: 0,
      country_id: 1,
      country: {
        id: 1,
        name: "Hong Kong",
      },
    },
    {
      name: "iamtest",
      net_points: 0,
      country_id: 1,
      country: {
        id: 1,
        name: "Hong Kong",
      },
    },
  ];
  console.log(fetchingUsers());
  const [hasNext, setHasNext] = useState(undefined);

  //const totalPoint = route.params.totalPoint;
  //const [netPoint, setNetPoint] = useState(route.params.totalPoint);
  //const total = setNetPoint(route.params);
  //setNetPoint(route.params.totalPoint);
  return (
    <>
      <HeaderIndex navigation={props.navigation} />
      <SafeAreaView
        style={[ComponentStyles.container_v2, { alignItems: "center" }]}
      >
        <ScrollView style={styles.context}>
          <Text style={styles.rankTitle}>{rankTitle}</Text>
          {rankData.map((rank, key) => {
            return (
              <RankUserContent
                no={key}
                name={rank.name}
                point={rank.net_points}
              />
            );
          })}
        </ScrollView>
      </SafeAreaView>

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
          text={"You can see the rank of your region here."}
          mouse1left={340}
          mouse1top={hp("90%")}
          circle={1}
          navigation={props.navigation}
          isPlace={1}
          place={"FinishTutor"}
          boxtop={100}
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
});
export default Rank;
 */
