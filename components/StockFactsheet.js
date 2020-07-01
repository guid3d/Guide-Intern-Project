import * as React from "react";
import { SafeAreaView, Text, StyleSheet } from "react-native";
import { WebView } from 'react-native-webview';

const StockFactsheet = ({ route, navigation }) => {
  const { itemId } = route.params;
  console.log(itemId)
    return (
      <WebView source={{ uri: "https://www.jitta.com/stock/"+ itemId + "/factsheet" }} />
    );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    flex: 1
  },
});

export default StockFactsheet;
