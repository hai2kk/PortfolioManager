import React, { Component } from "react";
import { Text, View, Image } from "react-native";
import Constants from "../../../constants/PortfolioConstants";
import NavigationStyles from "../../../styles/NavigationStyles";
import CryptoContent from "./CryptoContent";

class CryptoLookup extends Component {
  static navigationOptions = {
    title: Constants.CRYPTO_LOOKUP_HEADER_TITLE,
    tabBarIcon: ({ tintColor }) => (
      <Image
        source={require("../../../assets/bitcoin.png")}
        style={[NavigationStyles.icon, { tintColor: tintColor }]}
      />
    )
  };
  render() {
    return (
      <View>
        <CryptoContent mobxStore={this.props.screenProps}/>
      </View>
    );
  }
}

export default CryptoLookup;
