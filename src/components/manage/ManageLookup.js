import React, { Component } from "react";
import { Text, View } from "react-native";
import Constants from "../../constants/PortfolioConstants";
import LookupNavigator from "../../navigation/LookupNavigator";

class ManageLookup extends Component {
  static navigationOptions = {
    title: Constants.MANAGE_LOOKUP_TITLE,
    headerTintColor: Constants.FORE_COLOR_CODE,
    headerTitleStyle: {
      fontWeight: "300",
      fontSize: 14
    }
  };

  render() {
    return <LookupNavigator />;
  }
}

export default ManageLookup;
