import React from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  View,
  SafeAreaView,
} from "react-native";

import { StockByRanking } from "./Query";

import { Query } from "react-apollo";

import { ListItem, Badge } from 'react-native-elements'
import { TouchableOpacity } from "react-native-gesture-handler";

var _ = require("lodash");

const StockList = ({ navigation }) => {
  const renderItem = ({ item }) => {
    const { id, title, stockId, jittaScore, nativeName, industry, rank} = item;
    return (
      <TouchableOpacity
        onPress={() =>
          navigation.navigate("Details", {
            itemId: id,
            title: title,
            stockId: stockId,
            jittaScore: jittaScore,
            nativeName: nativeName,
            industry: industry,
            rank: rank,
          })
        }
        // style={styles.item}
      >
        <ListItem
          title={title}
          bottomDivider
          subtitle={id}
          subtitleStyle={{ color: "grey", fontSize: 13 }}
          chevron
          rightElement={<Badge value={jittaScore} badgeStyle={{ width: 50, height: 35 }} textStyle={{ fontSize: 17 }}/>}
        />
        {/* <Text style={styles.title}>{rank}. {title}</Text> */}
      </TouchableOpacity>
    );
  }
  return (
    <View style={styles.container}>
      <Query query={StockByRanking} >
        {({ loading, error, data }) => {
          const jittaRanking = _.get(data, "jittaRanking.data", []);
          if (loading)
            return (
              <View
                style={{
                  flex: 1,
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Text>"Loading"</Text>
              </View>
            );
          if (error) return <Text>`Error! ${error.message}`</Text>;
          return <FlatList data={jittaRanking} renderItem={renderItem} />;
        }}
      </Query>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  item: {
    backgroundColor: "#fff",
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 20,
  },
});

export default StockList;
