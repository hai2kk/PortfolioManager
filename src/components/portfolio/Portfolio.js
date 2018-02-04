import React, { Component } from "react";
import { Text, View, StyleSheet, Image, TouchableHighlight } from "react-native";
import NavigationStyles from "../../styles/NavigationStyles"
import Constants from '../../constants/PortfolioConstants.js'
import { NavigationActions } from "react-navigation";

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
    const styles = StyleSheet.create({
      container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#F5FCFF"
      },
      button: {
        alignItems: 'center',
        backgroundColor: Constants.FORE_COLOR_CODE,
      },
      buttonText:{
        padding:10,
        color: Constants.BACKGROUND_COLOR_CODE
      }
    });

    return (
      <View style={styles.container}>
        <TouchableHighlight onPress={()=>this.createPortfolioClick()} underlayColor="white">
            <View style={styles.button}>
              <Text style={styles.buttonText}>Create Portfolio</Text>
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
