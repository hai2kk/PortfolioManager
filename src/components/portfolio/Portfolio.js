import React, { Component } from "react";
import { Text, View, StyleSheet, Image, TouchableHighlight } from "react-native";
import NavigationStyles from "../../styles/NavigationStyles"
import Constants from '../../constants/PortfolioConstants.js'
import { NavigationActions } from "react-navigation";
import PortfolioStyles from "../../styles/PortfolioStyles.js"

class Portfolio extends Component {
  static navigationOptions = {
    tabBarLabel: "Portfolio",
    tabBarIcon: ({ tintColor }) => (
      <Image
        source={require("../../assets/portfolio.png")}
        style={[NavigationStyles.icon, { tintColor: tintColor }]}
      />
    )
  };

  render() {
    return (
      <View style={PortfolioStyles.container}>
        <TouchableHighlight onPress={()=>this.createPortfolioClick()} underlayColor="white">
            <View style={PortfolioStyles.button}>
              <Text style={PortfolioStyles.buttonText}>Start</Text>
            </View>
          </TouchableHighlight>
      </View>
    );
  }
  createPortfolioClick(){
    const navigateAction = NavigationActions.navigate({
      routeName: "ManageLookup",
      params: {},
      action: NavigationActions.navigate({ routeName: "ManageLookup" })
    });
    this.props.screenProps.navigate.dispatch(navigateAction);
  }
}

export default Portfolio;
