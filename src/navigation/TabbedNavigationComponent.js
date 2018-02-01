import React, { Component } from "react";
import Navigator from "./Navigator";
import { View } from "react-native";

class TabbedNavigationComponent extends React.Component {
  render() {
    const  navigate  = this.props.navigation;
    console.log(navigate);
    return (
        <Navigator screenProps={{ navigate: navigate }} />
    );
  }
}

export default TabbedNavigationComponent;
