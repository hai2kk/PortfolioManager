import React, { Component } from "react";
import TabbedNavigator from "./TabbedNavigator";
import { View } from "react-native";

class TabbedNavigationComponent extends React.Component {
  render() {
    const  navigate  = this.props.navigation;
    return (
        <TabbedNavigator screenProps={{ store:this.props.screenProps, navigate: navigate }} />
    );
  }
}

export default TabbedNavigationComponent;
