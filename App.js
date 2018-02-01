import React from "react";
import { StyleSheet, Text, View } from "react-native";
import ParentNavigator from "./src/navigation/ParentNavigator"

export default class App extends React.Component {
  render() {
    return <ParentNavigator />;
  }
}