import React, { Component } from "react";
import { StackNavigator } from "react-navigation";
import TabbedNavigationComponent from "./TabbedNavigationComponent";
import ManageLookup from "../Manage/comonent/ManageLookup";

const ParentNavigator = StackNavigator({
  Home: {
    screen: TabbedNavigationComponent,
    navigationOptions: {
      header: null
    }
  },
  ManageLookup: {
    screen: ManageLookup/* ,
    navigationOptions: {
      header: {
        visible: false
      } 
    }*/
  }
});

export default ParentNavigator;
