import React, {useState} from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
} from "react-native";

import { StockByRanking } from "./Query";

import { Query } from "react-apollo";

import { ListItem, Badge } from 'react-native-elements'
import { TouchableOpacity } from "react-native-gesture-handler";
import { preventAutoHide } from "expo-splash-screen";
import FloatingFilter from "./FloatingFilter";
import { NetworkStatus } from "apollo-boost";
import RNPickerSelect from 'react-native-picker-select';

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
          titleStyle={{ color: "black" }}
          bottomDivider
          subtitle={id}
          subtitleStyle={{ color: "grey", fontSize: 13 }}
          chevron
          rightElement={
            <Badge
              value={jittaScore}
              badgeStyle={{ width: 50, height: 35 }}
              textStyle={{ fontSize: 17 }}
            />
          }
          leftElement={<Text>{rank}</Text>}
        />
        {/* <Text style={styles.title}>{rank}. {title}</Text> */}
      </TouchableOpacity>
    );
  }

  // var pageNum = 0;
  const [pageNum, setPageNum] = useState(0);
  const [isScrollToEnd, setIsScrollToEnd] = useState(false);
  const [market, setMarket] = useState("TH");
  const [sectors, setSectors] = useState(null);
  const [isFetching, setIsFetching] = useState(false);
  return (
    <View style={styles.container}>
      <Query
        query={StockByRanking}
        variables={{ market: market, page: pageNum, sectors: sectors }}
        notifyOnNetworkStatusChange
      >
        {({ loading, error, data, fetchMore, networkStatus, refetch }) => {
          const jittaRanking = _.get(data, "jittaRanking.data", []);
          if (networkStatus === 1 && loading)
            return (
              <View
                style={{
                  flex: 1,
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <ActivityIndicator />
              </View>
            );
          if (error) return <Text>`Error! ${error.message}`</Text>;
          console.log(networkStatus);
          return (
            <FlatList
              data={jittaRanking}
              renderItem={renderItem}
              onEndReached={() => {
                if (!isScrollToEnd && !loading) {
                  fetchMore({
                    variables: {
                      page: Math.ceil(
                        _.get(data, "jittaRanking.data", []).length / 30
                      ),
                    },

                    updateQuery: (prev, { fetchMoreResult }) => {
                      const count = _.get(prev, "jittaRanking.count", null);
                      const previousList = _.get(prev, "jittaRanking.data", []);
                      const nextList = _.get(
                        fetchMoreResult,
                        "jittaRanking.data",
                        []
                      );
                      if (!fetchMoreResult) return prev;
                      if (nextList === 0) {
                        setIsScrollToEnd(true);
                        return prev;
                      }

                      return {
                        jittaRanking: {
                          __typename: null,
                          count: count,
                          data: [...previousList, ...nextList],
                        },
                      };
                    },
                  });
                }
              }}
              onEndReachedThreshold={0.5}
              ListFooterComponent={() =>
                networkStatus === 3 && !isScrollToEnd && <ActivityIndicator />
              }
              // onRefresh={}
              // refreshing
            />
          );
        }}
      </Query>
      <FloatingFilter
        onMarketChange={(value) => {
          setMarket(value);
        }}
        onSectorsChange={(value) => {
          setSectors(value)
        }}
      />
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
