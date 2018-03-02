import React, { Component } from "react";
import { StackNavigator } from "react-navigation";
import TabbedNavigationComponent from "./TabbedNavigationComponent";
import ManageLookup from "../components/manage/ManageLookup";
import Splash from "../components/Splash";

const ParentNavigator = StackNavigator({
  Splash : {
    screen: Splash
  },
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
