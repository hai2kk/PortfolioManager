import React, { Component } from "react";
import { Text, View, StyleSheet, Image } from "react-native";
import NavigationStyles from "../../navigation/NavigationStyles";

class Manage extends Component {
  static navigationOptions = {
    tabBarLabel: "Manage",
    tabBarVisible: false,
    tabBarIcon: ({ tintColor }) => (
      <Image
        source={require("../../assets/manage.png")}
        style={[NavigationStyles.icon, { tintColor: tintColor }]}
      />
    )
  };
  render() {
    const styles = StyleSheet.create({
      container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#F5FCFF"
      }
    });

    return (
      <View style={styles.container}>
        <Text> Manage page</Text>
      </View>
    );
  }
}

export default Manage;
