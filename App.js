import React from "react";
import { StyleSheet, Text, View } from "react-native";
import ParentNavigator from "./src/navigation/ParentNavigator"
import mobxStore from "./src/components/common/mobxStore";

export default class App extends React.Component {
  render() {
    return <ParentNavigator screenProps={mobxStore}/>;
  }
}