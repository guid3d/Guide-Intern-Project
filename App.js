import * as React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { NavigationContainer } from "@react-navigation/native";
import {
  createStackNavigator,
  CardStyleInterpolators,
  TransitionPresets,
} from "@react-navigation/stack";

import { Button } from 'react-native'

import { enableScreens } from 'react-native-screens'
import { createNativeStackNavigator } from 'react-native-screens/native-stack';
enableScreens();

import StockListScreen from "./components/StockList";
import StockDetailsScreen from "./components/StockDetail";
import StockChecklistScreen from "./components/StockChecklist";
import StockFactsheetScreen from "./components/StockFactsheet";
import { client } from "./components/Query";

import { ApolloProvider } from "react-apollo";
import { TouchableOpacity } from "react-native-gesture-handler";

const Stack = createNativeStackNavigator();
const RootStack = createStackNavigator();

const StackScreen = () => {
  return (
    <Stack.Navigator
      initialRouteName="Home"
      screenOptions={{
        title: "Jitta Ranking",
        headerStyle: {
          backgroundColor: "#47c6f1",
        },
        headerTintColor: "#fff",
        headerTitleStyle: {
          fontWeight: "bold",
        },
        // headerLargeTitle: true, 
      }}
    >
      <Stack.Screen
        name="Home"
        component={StockListScreen}
        // options={{ headerTitle: props => <LogoTitle {...props} /> }}
        options={{
          headerRight: () => (
            <TouchableOpacity
              onPress={() => alert("Search")}
              color="#fff"
            ><FontAwesomeIcon icon={faSearch} color={"white"}/></TouchableOpacity>
          ),
        }}
      />
      <Stack.Screen
        name="Details"
        component={StockDetailsScreen}
        // options={({ route }) => ({ title: route.params.itemId })}
        options={({ route }) => ({ title: route.params.itemId})}
      />
    </Stack.Navigator>
  );
};

function App() {
  return (
    <ApolloProvider client={client}>
      <NavigationContainer>
        <RootStack.Navigator headerMode="none">
          <RootStack.Screen name="Main" component={StackScreen} />
          <RootStack.Screen
            name="StockChecklistModal"
            component={StockChecklistScreen}
            options={{
              gestureEnabled: true,
              cardOverlayEnabled: true,
              ...TransitionPresets.ModalPresentationIOS,
            }}
          />
          <RootStack.Screen
            name="Factsheet"
            component={StockFactsheetScreen}
            // options={{
            //   gestureEnabled: true,
            //   cardOverlayEnabled: true,
            //   ...TransitionPresets.ModalPresentationIOS,
            // }}
            // options={({ route }) => ({ title: route.params.itemId })}
          />
        </RootStack.Navigator>
      </NavigationContainer>
    </ApolloProvider>
  );
}

export default App;
