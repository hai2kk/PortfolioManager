import React, { Component } from "react";
import { Text, View, StyleSheet, Image } from "react-native";
import NavigationStyles from "../../styles/NavigationStyles"
import PortfolioStyles from "../../styles/PortfolioStyles.js"

class Manage extends Component {
  static navigationOptions = {
    tabBarLabel: "Manage",
    tabBarVisible: false,
    tabBarIcon: ({ tintColor }) => (
      <Image
        source={require("../../assets/manage.png")}
        style={[NavigationStyles.icon, { tintColor: tintColor }]}
      />
    )
  };
  render() {
     return (
      <View style={PortfolioStyles.container}>
        <Text> Manage page</Text>
      </View>
    );
  }
}

export default Manage;
