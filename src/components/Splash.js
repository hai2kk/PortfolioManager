import React, { Component } from "react";
import { View, Text, TouchableHighlight,AsyncStorage } from "react-native";
import PortfolioConstants from "../constants/PortfolioConstants";
import { NavigationActions } from "react-navigation";

export default class Splash extends Component {
  static navigationOptions = {
    header: null
  };

  _onPress = () => {
    AsyncStorage.removeItem("stocks");
    AsyncStorage.removeItem("watchList");
  }

  componentWillMount() {
    setTimeout(() => {
      //this.props.navigation.navigate("Home");
      const action = NavigationActions.reset({
        index: 0,
        actions: [NavigationActions.navigate({ routeName: "Home" })]
      });
      this.props.navigation.dispatch(action);
    }, 2000);
  }

  render() {
    const { containerStyle, textStyle } = styles;
    return (
      <View style={containerStyle}>
        <TouchableHighlight onPress={this._onPress}>
          <Text style={textStyle}>
            {" "}
            {PortfolioConstants.SPLASH_SCREEN_TITLE}
          </Text>
        </TouchableHighlight>
      </View>
    );
  }
}

const styles = {
  containerStyle: {
    flex: 1,
    alignItems: "center",
    backgroundColor: PortfolioConstants.FORE_COLOR_CODE,
    flexDirection: "row",
    justifyContent: "space-around"
  },
  textStyle: {
    fontSize: 30,
    color: PortfolioConstants.BACKGROUND_COLOR_CODE
  }
};
