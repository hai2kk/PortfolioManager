import React, { Component } from "react";
import { Text, View } from "react-native";
import Constants from "../../../constants/PortfolioConstants"

class CryptoLookup extends React.Component {
  static navigationOptions = {  
    title: Constants.CRYPTO_LOOKUP_HEADER_TITLE
  }
  render() {
    return <Text>Crypto Lookup page here!</Text>;
  }
}

export default CryptoLookup;
