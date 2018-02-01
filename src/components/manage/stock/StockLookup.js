import React, { Component } from "react";
import { Text, View } from "react-native";
import Constants from "../../../constants/PortfolioConstants"

class StockLookup extends React.Component {
  static navigationOptions = {  
    title: Constants.STOCK_LOOKUP_HEADER_TITLE
  }  
  render() {
    return <Text>Stock Lookup page here!</Text>;
  }
}

export default StockLookup;
