import React, { Component } from "react";
import { View, Text, Image, TouchableHighlight } from "react-native";
import { APIConstants } from "../../constants/APIConstants";
import { PortfolioContentStyles } from "../../styles/PortfolioContentStyles";
import { retrieveData } from "../../utils/PortFolioDataUtil";
import PortfolioConstants from "../../constants/PortfolioConstants"

export default class PortfolioContent extends Component {
  constructor(props) {
    super(props);
    const closingPrice = "";
    let indicator = "";
    const {PORT_FOLIO_NO_CHANGE_COLOR,PORT_FOLIO_UP_COLOR,PORT_FOLIO_DOWN_COLOR} = PortfolioConstants;
    this.state = {
      closingPrice,
      indicator : PORT_FOLIO_NO_CHANGE_COLOR
    };
  }

  componentDidMount() {
    const query = this.props.stockDetail.symbol;
    const getTimeSeriesDataURL = APIConstants.TIME_SERIES_LOOKUP_URL;
    const timeSeriesDataURL = getTimeSeriesDataURL(query);
    let closingPriceObj,
      closingPrice = "";
    const currentPrice = parseFloat(this.props.stockDetail.price);

    retrieveData(timeSeriesDataURL)
      .then(responseData => {
        const map = new Map(Object.entries(responseData));
        map.forEach((valueObj, key) => {
          if (key === APIConstants.TIME_SERIES_OBJECT_KEY) {
            closingPriceObj = Object.values(valueObj)[
              Object.values(valueObj).length - 1
            ];
            closingPrice =
              closingPriceObj[APIConstants.TIME_SERIES_CLOSING_KEY];
            closingPrice = parseFloat(closingPrice).toFixed(2);
          }
        });

        this.setState({
          ...this.state,
          closingPrice,
          indicator: getIndicator(closingPrice, currentPrice)
        });
      })
      .done();

    const getIndicator = (closingPrice, currentPrice) => {
      const {PORT_FOLIO_NO_CHANGE_COLOR,PORT_FOLIO_UP_COLOR,PORT_FOLIO_DOWN_COLOR} = PortfolioConstants;
      let indicator = PORT_FOLIO_NO_CHANGE_COLOR;
      if (closingPrice > currentPrice) {
        indicator = PORT_FOLIO_UP_COLOR;
      }

      if (closingPrice < currentPrice) {
        indicator = PORT_FOLIO_DOWN_COLOR;
      }
      return indicator;
    };
  }

  render() {
    const { index, stockDetail, onDelete } = this.props;
    const { name, symbol, quantity, price, exchDisp } = stockDetail;
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
            <Text style={[indicatorContentStyle,{backgroundColor : this.state.indicator}]}>
              {this.state.closingPrice}
            </Text>
          </View>
        </View>
        <View style={contentsImage}>
          <TouchableHighlight onPress={() => onDelete(index)}>
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
