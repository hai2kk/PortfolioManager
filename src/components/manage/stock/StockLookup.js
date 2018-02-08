import React, { Component } from "react";
import { Text, View, Image } from "react-native";
import Constants from "../../../constants/PortfolioConstants";
import NavigationStyles from "../../../styles/NavigationStyles";
import { SearchBar } from "../../common/";

class StockLookup extends Component {
  static navigationOptions = {
    title: Constants.STOCK_LOOKUP_HEADER_TITLE,
    tabBarIcon: ({ tintColor }) => (
      <Image
        source={require("../../../assets/stock.png")}
        style={[NavigationStyles.icon, { tintColor: tintColor }]}
      />
    )
  };

  render() {
    return (
      <View>
        <SearchBar />
      </View>
    );
  }
}

export default StockLookup;
