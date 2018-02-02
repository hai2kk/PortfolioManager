import React, { Component } from "react";
import { Text, View, Image } from "react-native";
import Constants from "../../../constants/PortfolioConstants"
import NavigationStyles from "../../../styles/NavigationStyles"

class StockLookup extends Component {
  static navigationOptions = {  
    title: Constants.STOCK_LOOKUP_HEADER_TITLE,
    tabBarIcon: ({ tintColor }) => (
      <Image
        source={require("../../../assets/stock.png")}
        style={[NavigationStyles.icon, { tintColor: tintColor }]}
      />
    )
  }
    
  render() {
    return <Text>Stock Lookup page here!</Text>;
  }
}

export default StockLookup;
