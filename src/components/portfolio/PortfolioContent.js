import React, { Component } from "react";
import { View, Text, Image, TouchableHighlight } from "react-native";
import { PortfolioContentStyles } from "../../styles/PortfolioContentStyles";
import PortfolioConstants from "../../constants/PortfolioConstants";

export default class PortfolioContent extends Component {
  constructor(props) {
    super(props);
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
      indicatorContentStyle,
      totalValueStyle,
      nameStyle
    } = PortfolioContentStyles;
    const {
      PORT_FOLIO_NO_CHANGE_COLOR,
      PORT_FOLIO_UP_COLOR,
      PORT_FOLIO_DOWN_COLOR
    } = PortfolioConstants;

    const originalTotalValue = parseFloat(price * quantity).toFixed(2);
    const currentTotalValue = parseFloat(closingPrice * quantity).toFixed(2);
    const PLpercent = (
      (currentTotalValue - originalTotalValue) /
      originalTotalValue *
      100
    ).toFixed(2);
    if (PLpercent > 0) {
      indicatorColor = PORT_FOLIO_UP_COLOR;
    } else if (PLpercent < 0) {
      indicatorColor = PORT_FOLIO_DOWN_COLOR;
    } else {
      indicatorColor = PORT_FOLIO_NO_CHANGE_COLOR;
    }

    return (
      <View style={containerStyle}>
        <View style={contentsText}>
          <View style={firstRowStyle}>
            <Text numberOfLines={1} style={titleStyle}>
              {symbol}
            </Text>
            <Text numberOfLines={1} style={overviewStyle}>
              {quantity} at USD {price}
            </Text>
          </View>
          <Text numberOfLines={1} style={nameStyle}>
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
              {PLpercent}%
            </Text>
          </View>
          <Text style={totalValueStyle}>
            Purchased Value : ${originalTotalValue}
          </Text>
          <Text style={[totalValueStyle, { color: indicatorColor }]}>
            Current Value : ${currentTotalValue}
          </Text>
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
  }
}
