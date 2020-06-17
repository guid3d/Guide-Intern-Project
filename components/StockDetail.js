import * as React from 'react';
import { View, Text, StyleSheet, Button, Image, SafeAreaView } from 'react-native';

import TouchableScale from 'react-native-touchable-scale';

// import { Card } from "@paraboly/react-native-card";

import { Card } from "react-native-elements";

const DetailsScreen = ({ route, navigation }) => {
    const { itemId, title, stockId, jittaScore, nativeName, industry, rank } = route.params;
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
              <Text style={{fontSize: 30, marginBottom: 30, color: '#fff'}}>JITTA SCORE</Text>
            </View>
            <Text style={styles.title}>{title}</Text>
            <Text style={styles.thaititle}>{nativeName}</Text>
            <View
              style={{
                paddingBottom: 15,
                borderBottomColor: "lightgrey",
                borderBottomWidth: 1,
                borderBottomStartRadius: 20,
                borderBottomEndRadius: 20,
              }}
            >
              <View style={styles.textRow}>
                <Text style={{ fontWeight: "bold" }}>Industry</Text>
                <Text>{industry}</Text>
              </View>
              <View style={styles.textRow}>
                <Text style={{ fontWeight: "bold" }}>Stock ID</Text>
                <Text>{stockId}</Text>
              </View>
            </View>
            <View style={{paddingVertical: 10}}>
            <Button
              onPress={() =>
                navigation.navigate("StockChecklistModal", {
                  stockId: stockId,
                })
              }
              title="Open Checklist"
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
  }

  const styles = StyleSheet.create({
    card: {
      width: 300,
      backgroundColor: "#fff",
      borderRadius: 20,
      shadowOffset: { height: 1 },
      shadowOpacity: 0.1,
    },
    textRow: {
      paddingHorizontal: 20,
      flexDirection: "row",
      justifyContent: "space-between",
    },
    jittaScore: {
      fontSize: 100,
      textAlign: "center",
      color: "white",
      marginBottom: -10
    },
    title: {
      fontSize: 20,
      textAlign: "center",
      fontWeight: "bold",
      paddingTop: 20,
      paddingBottom: 5
    },
    jittaScoreCard: {
      borderTopLeftRadius: 20,
      borderTopRightRadius: 20,
      backgroundColor: "#47c6f1",
      paddingTop: 20,
      alignItems: 'center',
      justifyContent: 'center'
    },
    thaititle: {
      textAlign: "center",
      paddingBottom: 20,
    },
  });

  export default DetailsScreen;