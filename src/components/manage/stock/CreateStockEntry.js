import React, { Component } from "react";
import { Text, View } from "react-native";
import PortfolioConstants from "../../../constants/PortfolioConstants";

export default class CreateStockEntry extends Component {
  constructor(props) {
    super(props);
    state = { stockInfo: {} };
  }

  render() {
    styles = {
      mainTitleStyle: {
        fontSize: 16,
        paddingLeft: 10
      },
      titleStyle: {
        fontSize: 16,
        color: PortfolioConstants.FORE_COLOR_CODE,
        paddingLeft: 10
      },
      detailsViewStyle: {
        flexDirection: "row",
        justifyContent: "space-around"
      }
    };
    const { mainTitleStyle, titleStyle, detailsViewStyle } = styles;

    if (this.props.lastSelection === null) {
      return <View />;
    }
    return (
      <View style={mainTitleStyle}>
        <Text style={titleStyle}>
          {PortfolioConstants.SEARCH_RESULT_COMPANY_NAME} :{" "}
          {this.props.lastSelection.name}
        </Text>
        <Text style={titleStyle}>
          {PortfolioConstants.SEARCH_RESULT_SYMBOL_NAME} :{" "}
          {this.props.lastSelection.symbol}
        </Text>
        <Text style={titleStyle}>
          {PortfolioConstants.SEARCH_RESULT_EXCHANGE} :{" "}
          {this.props.lastSelection.exchDisp}
        </Text>
        <Text style={titleStyle}>
          {PortfolioConstants.SEARCH_RESULT_PURCHASE_PRICE} :{" "}
        </Text>
        <Text style={titleStyle}>
          {PortfolioConstants.SEARCH_RESULT_PURCHASE_QUANTITY} :{" "}
        </Text>
      </View>
    );
  }
}
