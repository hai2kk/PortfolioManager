import React, { Component } from "react";
import { Text, View, Image } from "react-native";
import Constants from "../../../constants/PortfolioConstants"
import NavigationStyles from "../../../styles/NavigationStyles"

class CryptoLookup extends Component {
  static navigationOptions = {  
    title: Constants.CRYPTO_LOOKUP_HEADER_TITLE,
    tabBarIcon: ({ tintColor }) => (
      <Image
        source={require("../../../assets/bitcoin.png")}
        style={[NavigationStyles.icon, { tintColor: tintColor }]}
      />
    )
  }
  render() {
    return <Text>Crypto Lookup page here!</Text>;
  }
}

export default CryptoLookup;
