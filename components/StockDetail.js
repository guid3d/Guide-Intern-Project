import * as React from "react";
import {
  View,
  Text,
  StyleSheet,
  Share,
} from "react-native";

import TouchableScale from "react-native-touchable-scale";

// import { Card } from "@paraboly/react-native-card";

import { Button } from "react-native-elements";
import FloatingFilter from "./FloatingFilter";

const onShare = async (itemId) => {
  try {
    const result = await Share.share({
      // message: itemId
      url: 'https://www.jitta.com/stock/' + itemId
    });
    if (result.action === Share.sharedAction) {
      if (result.activityType) {
        // shared with activity type of result.activityType
      } else {
        // shared
      }
    } else if (result.action === Share.dismissedAction) {
      // dismissed
    }
  } catch (error) {
    alert(error.message);
  }
};

const DetailsScreen = ({ route, navigation }) => {
  const {
    itemId,
    title,
    stockId,
    jittaScore,
    nativeName,
    industry,
    rank,
  } = route.params;
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <TouchableScale
        friction={90}
        tension={90}
        activeScale={0.95}
        onPress={() =>
          navigation.navigate("StockChecklistModal", {
            stockId: stockId,
          })
        }
      >
        <View style={styles.card}>
          <View style={styles.jittaScoreCard}>
            <Text style={styles.jittaScore}>{jittaScore}</Text>
            <Text style={{ fontSize: 30, marginBottom: 30, color: "#fff" }}>
              JITTA SCORE
            </Text>
          </View>
          <View
            style={{
              paddingBottom: 15,
              borderBottomColor: "lightgrey",
              borderBottomWidth: 1,
              borderBottomStartRadius: 20,
              borderBottomEndRadius: 20,
            }}
          >
            <Text style={styles.title}>{title}</Text>
            <Text style={styles.thaititle}>{nativeName}</Text>

            <View style={styles.textRow}>
              <Text
                style={{ paddingLeft: 20, fontWeight: "bold", color: "black" }}
              >
                Industry
              </Text>
              <Text
                style={{
                  paddingRight: 20,
                  textAlign: "right",
                  maxWidth: 200,
                  color: "black",
                }}
              >
                {industry}
              </Text>
            </View>
            <View style={styles.textRow}>
              <Text
                style={{ paddingLeft: 20, fontWeight: "bold", color: "black" }}
              >
                Stock ID
              </Text>
              <Text style={{ paddingRight: 20, color: "black" }}>
                {stockId}
              </Text>
            </View>
          </View>
          <View style={{ paddingVertical: 10, paddingHorizontal: 20 }}>
            <Button
              onPress={() =>
                navigation.navigate("StockChecklistModal", {
                  stockId: stockId,
                })
              }
              title="Open Checklist"
              type="clear"
            />
            <Button
              onPress={() => onShare(itemId)}
              title="Share"
              type="clear"
            />
            <Button
              onPress={() =>
                navigation.navigate("Factsheet", { itemId: itemId })
              }
              title="Factsheet"
              type="clear"
            />
            
          </View>
        </View>
      </TouchableScale>

      {/* <Button
          onPress={() =>
            navigation.navigate("StockChecklistModal", {
              stockId: stockId,
            })
          }
          title="Open Checklist"
        /> */}
      {/* <Button
          title="Go to Details... again"
          onPress={() =>
            navigation.push('Details', {
              itemId: Math.floor(Math.random() * 100),
            })
          }
        /> */}
      {/* <Button title="Go to Home" onPress={() => navigation.navigate('Home')} /> */}
      {/* <Button title="Go back" onPress={() => navigation.goBack()} /> */}
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    width: 300,
    backgroundColor: "#fff",
    borderRadius: 20,
    shadowOffset: { height: 1 },
    shadowOpacity: 0.1,
  },
  textRow: {
    // paddingHorizontal: 20,
    // width: 150,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  jittaScore: {
    fontSize: 100,
    textAlign: "center",
    color: "white",
    marginBottom: -10,
  },
  title: {
    fontSize: 20,
    textAlign: "center",
    fontWeight: "bold",
    paddingTop: 20,
    paddingBottom: 5,
    paddingHorizontal: 10,
    color: "black",
  },
  jittaScoreCard: {
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    backgroundColor: "#47c6f1",
    paddingTop: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  thaititle: {
    textAlign: "center",
    paddingBottom: 20,
    paddingHorizontal: 10,
    color: "grey",
  },
});

export default DetailsScreen;
