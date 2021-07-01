import * as React from "react";
import {
  View,
  Text,
  Button,
  Image,
  SafeAreaView,
  StyleSheet,
  FlatList
} from "react-native";

import { Query } from "react-apollo";
import gql from "graphql-tag";

import IconCheck from "./IconCheck";
import IconTimes from "./IconTimes";

import { AnimatedCircularProgress } from "react-native-circular-progress";

var _ = require("lodash");

const JittaScoreQuery = gql`
  query jittaScore($stockId: Int) {
    stock(stockId: $stockId) {
      name
      jitta {
        score {
          last {
            value
          }
        }
        priceDiff {
          last {
            value
          }
        }
      }
    }
  }
`;

const ModalScreen = ({ route, navigation }) => {
  const CircularChecklistProgress = () => {
    return (
      <AnimatedCircularProgress
        size={250}
        width={20}
        backgroundWidth={10}
        fill={100}
        tintColor="white"
        tintColorSecondary="mediumaquamarine"
        backgroundColor="#808080"
        padding={10}
        lineCap="round"
        arcSweepAngle={270}
        rotation={226.5}
        duration={2000}
      >
        {(fill) => <Text style={styles.points}>{Math.round(fill)}%</Text>}
      </AnimatedCircularProgress>
    );
  };

  const { stockId } = route.params;

  const JittaScoreIsMoreThanSeven = ({ stockChecklistData }) => {
    if (stockChecklistData.jitta.score.last.value > 7) {
      return <IconCheck />;
    } else return <IconTimes />;
  };

  const BelowJittaLineMoreThan20Per = ({ stockChecklistData }) => {
    if (stockChecklistData.jitta.priceDiff.last.value < -0.2)
      return <IconCheck />;
    else return <IconTimes />;
  };

  return (
    <Query query={JittaScoreQuery} variables={{ stockId: stockId }}>
      {({ loading, error, data }) => {
        const stockChecklistData = _.get(data, "stock", []);
        // console.log(stockChecklistData);
        if (loading) return <Text></Text>;
        if (error) return <Text>`Error! ${error.message}`</Text>;
        return (
          <View>
            
            <View style={styles.closeModal}>
              <Button onPress={() => navigation.goBack()} title="Done" />
            </View>
            <View style={styles.container}>
              <Text style={styles.header}>{stockChecklistData.name}</Text>
              <CircularChecklistProgress />
              <View style={styles.row}>
                <Text>Jitta Score {">"} 7</Text>
                <Text>
                  <JittaScoreIsMoreThanSeven
                    stockChecklistData={stockChecklistData}
                  />
                </Text>
              </View>
              <View style={styles.row}>
                <Text>Below Jitta Line {">"} 20%</Text>
                <Text>
                  <BelowJittaLineMoreThan20Per
                    stockChecklistData={stockChecklistData}
                  />
                </Text>
              </View>
            </View>
          </View>
        );
      }}
    </Query>
  );
};

const styles = StyleSheet.create({
  container: {
    // backgroundColor: "#fff",
    alignItems: "center",
    // justifyContent: "flex-start",
    padding: 20,
    // paddingTop: 20,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: 300,
    padding: 5,
  },
  rowFlatList: {
    // flex: 0.4,
    flexDirection: "row",
    justifyContent: "space-between",
    width: 300,
    padding: 6,
  },
  header: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    paddingBottom: 10,
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
    paddingRight: 10,
    paddingTop: 5,
    
    
  }
});

export default ModalScreen;
