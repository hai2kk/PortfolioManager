import React, { Component } from "react";
import { Button } from "react-native";
import { StackNavigator } from "react-navigation";
import Manage from "./Manage.js";
import ManageLookup from "./ManageLookup";
const ManageNavigator = StackNavigator({
  Manage: {
    screen: Manage,
    navigationOptions: {
      title: "Manage" /* ,
      headerLeft: <Button title="Info" /> */
    }
  },
  ManageLookup: {
    screen: ManageLookup
  },
  initialRouteName: {
    screen: ManageLookup
  }
});

export default ManageNavigator;
