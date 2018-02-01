import React, { Component } from "react";
import { Text, View, StyleSheet, Image } from "react-native";
import NavigationStyles from "../../navigation/NavigationStyles";

class Watchlist extends Component {
  static navigationOptions = {
    tabBarLabel: "Watchlist",
    tabBarIcon: ({ tintColor }) => (
      <Image
        source={require("../../assets/watchlist.png")}
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
        <Text> Watchlist page</Text>
      </View>
    );
  }
}

export default Watchlist;
