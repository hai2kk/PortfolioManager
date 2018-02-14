import React, { Component } from "react";
import { View, Text, Image, TouchableHighlight } from "react-native";
import { PortfolioContentStyles } from "../../styles/PortfolioContentStyles";
import PortfolioConstants from "../../constants/PortfolioConstants";

export default class PortfolioContent extends Component {
  constructor(props) {
    super(props);
    const {
      PORT_FOLIO_NO_CHANGE_COLOR,
      PORT_FOLIO_UP_COLOR,
      PORT_FOLIO_DOWN_COLOR
    } = PortfolioConstants;
  }

  render() {
    const { index, stockDetail, onDelete } = this.props;
    const {
      name,
      symbol,
      quantity,
      price,
      exchDisp,
      closingPrice
    } = stockDetail;
    const {
      titleStyle,
      overviewStyle,
      imageStyle,
      containerStyle,
      contentsText,
      contentsImage,
      firstRowStyle,
      indicatorViewStyle,
      indicatorContentStyle
    } = PortfolioContentStyles;

    const indicatorColor = getIndicator(closingPrice, price);

    return (
      <View style={containerStyle}>
        <View style={contentsText}>
          <View style={firstRowStyle}>
            <Text numberOfLines={1} style={titleStyle}>
              {symbol}
            </Text>
            <Text numberOfLines={1} style={overviewStyle}>
              {quantity} at {price}
            </Text>
          </View>
          <Text numberOfLines={1} style={overviewStyle}>
            {name}
          </Text>
          <View style={indicatorViewStyle}>
            <Text numberOfLines={1} style={overviewStyle}>
              {exchDisp}
            </Text>
            <Text
              style={[
                indicatorContentStyle,
                { backgroundColor: indicatorColor }
              ]}
            >
              {closingPrice}
            </Text>
          </View>
        </View>
        <View style={contentsImage}>
          <TouchableHighlight onPress={() => this.props.onDelete(index)}>
            <Image
              style={imageStyle}
              source={require("../../assets/delete.png")}
            />
          </TouchableHighlight>
        </View>
      </View>
    );

    function getIndicator(closingPrice, currentPrice) {
      const {
        PORT_FOLIO_NO_CHANGE_COLOR,
        PORT_FOLIO_UP_COLOR,
        PORT_FOLIO_DOWN_COLOR
      } = PortfolioConstants;
      let indicator = PORT_FOLIO_NO_CHANGE_COLOR;
      if (closingPrice > currentPrice) {
        indicator = PORT_FOLIO_UP_COLOR;
      }

      if (closingPrice < currentPrice) {
        indicator = PORT_FOLIO_DOWN_COLOR;
      }
      return indicator;
    }
  }
}
