import * as React from 'react';
import { View, Text, Button, Image, SafeAreaView } from 'react-native';

import TouchableScale from 'react-native-touchable-scale';

// import { Card } from "@paraboly/react-native-card";

import { Card, Tile } from "react-native-elements";

const DetailsScreen = ({ route, navigation }) => {
    const { itemId, title, stockId, jittaScore, nativeName, industry, rank } = route.params;
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <TouchableScale friction={90} tension={90} activeScale={0.95} onPress={() =>
            navigation.navigate("StockChecklistModal", {
              stockId: stockId,
            })
          }>
        <Card title={itemId} con>
          <Text>Company Name: {title}</Text>
          <Text>Stock ID: {stockId}</Text>
          <Text>Jitta Score: {jittaScore}</Text>
          <Text>Thai Name: {nativeName}</Text>
          <Text>Industry: {industry}</Text>
        </Card>
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

  export default DetailsScreen;