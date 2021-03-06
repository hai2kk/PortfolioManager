import React, { Component } from "react";
import { StackNavigator } from "react-navigation";
import TabbedNavigationComponent from "./TabbedNavigationComponent";
import ManageLookup from "../components/manage/ManageLookup";

const ParentNavigator = StackNavigator({
  Home: {
    screen: TabbedNavigationComponent,
    navigationOptions: {
      title: "Portfolio Manager"
    }
  },
  ManageLookup: {
    screen: ManageLookup
  }
});

export default ParentNavigator;
