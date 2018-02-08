import React, { Component } from "react";
import { Text, View, StyleSheet, Image } from "react-native";
import NavigationStyles from "../../styles/NavigationStyles"
import PortfolioStyles from "../../styles/PortfolioStyles.js"

class Watchlist extends Component {
  static navigationOptions = {
    tabBarLabel: "Watchlist",
    tabBarIcon: ({ tintColor }) => (
      <Image
        source={require("../../assets/watchlist.png")}
        style={[NavigationStyles.icon, { tintColor: tintColor }]}
      />
    )
  };
  render() {
    return (
      <View style={PortfolioStyles.container}>
        <Text> Watchlist page</Text>
      </View>
    );
  }
}

export default Watchlist;
