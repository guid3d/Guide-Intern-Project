import React from "react";
import { View, Text, StyleSheet, Button } from "react-native";
import RNPickerSelect from "react-native-picker-select";

// import { Chevron } from 'react-native-i';


var _ = require("lodash");


const FloatingFilter = (props) => {
  const allSectorPlaceholder = {
    label: "All Sectors",
    value: null,
    color: "#000000",
  };
  return (
    <View style={styles.container}>
      {/* <View style={{ flexDirection: "row" }}> */}
      <View
        style={{
          ...styles.containerElement,
          borderRightWidth: 1,
          borderRightColor: "lightgray",
        }}
      >
        <RNPickerSelect
          onValueChange={props.onMarketChange}
          items={[
            { label: "Thailand 🇹🇭", value: "TH" },
            { label: "United States 🇺🇸", value: "US" },
            { label: "Singapore 🇸🇬", value: "SG" },
            { label: "Vietnam 🇻🇳", value: "VN" },
            { label: "Hong Kong 🇭🇰", value: "HK" },
            { label: "United Kingdom 🇬🇧", value: "UK" },
            { label: "Japan 🇯🇵", value: "JP" },
            { label: "China 🇨🇳", value: "CN" },
            { label: "Taiwan 🇹🇼", value: "TW" },
            { label: "India 🇮🇳", value: "IN" },
          ]}
          placeholder={{}}
          textInputProps={{ alignSelf: "center", fontWeight:'bold' }}
        />
      </View>
      <View style={styles.containerElement}>
        <RNPickerSelect
          onValueChange={props.onSectorsChange}
          items={[
            {
              value: "CONSUMER_DISCRETIONARY",
              label: "Consumer Discretionary",
            },
            {
              value: "CONSUMER_STAPLES",
              label: "Consumer Staples",
            },
            {
              value: "ENERGY",
              label: "Energy",
            },
            {
              value: "FINANCIALS",
              label: "Financials",
            },
            {
              value: "HEALTHCARE",
              label: "Health Care",
            },
            {
              value: "INDUSTRIALS",
              label: "Industrials",
            },
            {
              value: "INFORMATION_TECHNOLOGY",
              label: "Information Technology",
            },
            {
              value: "MATERIALS",
              label: "Materials",
            },
            {
              value: "REAL_ESTATE",
              label: "Real Estate",
            },
            {
              value: "TELECOMMUNICATION_SERVICES",
              label: "Communication Services",
            },
            {
              value: "UTILITIES",
              label: "Utilities",
            },
          ]}
          placeholder={allSectorPlaceholder}
          textInputProps={{ alignSelf: "center", color: "black", fontWeight:'bold' }}
        />
      </View>
      {/* </View> */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    width: "80%",
    height: 40,
    alignSelf: "center",
    borderRadius: 20,
    position: "absolute",
    bottom: 40,
    shadowOffset: { height: 1 },
    shadowOpacity: 0.5,
    justifyContent: "center",

    flexDirection: 'row',
  },
  containerElement: {
    width: "50%",
    justifyContent: "center",
    paddingHorizontal: 5,
  },
});

export default FloatingFilter;
