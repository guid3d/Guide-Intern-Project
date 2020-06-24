import * as React from "react";
import {
  View,
  Text,
  // Button,
  Image,
  SafeAreaView,
  StyleSheet,
  FlatList,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";

import { Query } from "react-apollo";
import gql from "graphql-tag";

import IconCheck from "./IconCheck";
import IconTimes from "./IconTimes";

import { AnimatedCircularProgress } from "react-native-circular-progress";
import { Button } from "react-native-elements";

import Ionicons from "react-native-ionicons";

import SafariModal from 'react-native-safari-modal';

// import { TouchableHighlight, TouchableOpacity } from "react-native-gesture-handler";

var _ = require("lodash");

const JittaChecklistQuery = gql`
  query jittaChecklist($stockId: Int) {
    stock(stockId: $stockId) {
      name
      checklist {
        summary {
          total
          totalChecked
        }
        data {
          name
          isChecked
        }
      }
    }
  }
`;

const ModalScreen = ({ route, navigation }) => {
  const CircularChecklistProgress = ({ total, totalChecked }) => {
    var percentFill = (totalChecked / total) * 100;

    const BarColor = () => {
      if (percentFill > 60) return "mediumaquamarine";
      else if (percentFill > 30) return "gold";
      else return "lightcoral";
    };

    return (
      <AnimatedCircularProgress
        size={250}
        width={20}
        backgroundWidth={10}
        fill={percentFill}
        tintColor={BarColor()}
        // tintColorSecondary={BarColor()}
        backgroundColor="#808080"
        padding={10}
        lineCap="round"
        arcSweepAngle={270}
        rotation={226.5}
        duration={2000}

        // renderCap={({ center }) => <Text>sdsd</Text>}
      >
        {(fill) => (
          // <Text style={styles.points}>{totalChecked}/{total}</Text>
          <Text style={styles.points}>{Math.round(fill)}%</Text>
        )}
      </AnimatedCircularProgress>
    );
  };

  const ChecklistItem = ({ title, check }) => {
    // console.log(check)
    const CheckIcon = ({ check }) => {
      if (check === true) return <IconCheck />;
      if (check === false) return <IconTimes />;
    };
    return (
      <View style={styles.rowFlatList}>
        <Text style={{ color: "#333333" }}>{title}</Text>
        <CheckIcon check={check} />
      </View>
    );
  };

  const { stockId } = route.params;

  return (
    <Query query={JittaChecklistQuery} variables={{ stockId: stockId }}>
      {({ loading, error, data }) => {
        const stockChecklistData = _.get(data, "stock", {});
        const checklistSummary = _.get(data, "stock.checklist.summary", {});
        const total = checklistSummary.total;
        const totalChecked = checklistSummary.totalChecked;
        // console.log(stockChecklistData);
        if (loading)
          return (
            <View style={styles.center}>
              <ActivityIndicator />
            </View>
          );
        if (error) return <Text>`Error! ${error.message}`</Text>;
        return (
          <SafeAreaView>
            <View style={styles.closeModal}>
              <TouchableOpacity onPress={() => navigation.goBack()}>
                <Ionicons
                  ios="ios-close"
                  android="ios-close"
                  size={34}
                  color="#79848F"
                />
              </TouchableOpacity>
            </View>
            <View style={styles.container}>
              <Text style={styles.header}>{stockChecklistData.name}</Text>
              <CircularChecklistProgress
                total={total}
                totalChecked={totalChecked}
              />
              <TouchableOpacity onPress={() => {SafariModal.openURL('https://library.jitta.com/th/investing')}}>
                <Text
                  style={{
                    ...styles.rowFlatList,
                    paddingVertical: 6,
                    fontWeight: "bold",
                    color: "black",
                  }}
                >
                  Checklist Criteria {' '}
                  <Ionicons
                    name="information-circle-outline"
                    size={15}
                    color="#79848F"
                  />
                </Text>
              </TouchableOpacity>
              <FlatList
                data={stockChecklistData.checklist.data}
                renderItem={({ item }) => (
                  <ChecklistItem title={item.name} check={item.isChecked} />
                )}
                keyExtractor={(item) => item.key}
                style={{
                  paddingBottom: 15,
                  borderBottomWidth: 1,
                  borderBottomColor: "#888",
                }}
              />
              <View style={styles.rowTotal}>
                <Text style={styles.textTotal}>Total</Text>
                <Text style={styles.textTotal}>
                  {totalChecked}/{total} (
                  {Math.round((totalChecked / total) * 100)}%)
                </Text>
              </View>
            </View>
          </SafeAreaView>
        );
      }}
    </Query>
  );
};

const styles = StyleSheet.create({
  center: { flex: 1, justifyContent: "center", alignItems: "center" },
  container: {
    // backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    // justifyContent: "flex-start",
    // padding: 20,
    // paddingTop: 20,
  },
  rowTotal: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: 350,
    padding: 6,
    paddingTop: 15,
  },
  textTotal: {
    fontWeight: "bold",
    color: "black",
  },
  rowFlatList: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: 350,
    padding: 6,
    color: "grey",
  },
  header: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    paddingBottom: 10,
    color: "black",
  },
  check: {
    color: "mediumaquamarine",
  },
  points: {
    textAlign: "center",
    color: "#000",
    fontSize: 50,
    fontWeight: "bold",
  },
  closeModal: {
    alignItems: "flex-end",
    paddingRight: 15,
    paddingTop: 10,
  },
});

export default ModalScreen;
