import React, { Component } from "react";
import { Text, View, Image, TouchableHighlight } from "react-native";
import { APIConstants } from "../../constants/APIConstants";
import { retrieveData } from "../../utils/PortFolioDataUtil";
import { configKeys } from "../../keys/configKeys";
import { WatchlistContentStyles } from "../../styles/WatchlistContentStyles";

export default class WatchListItem extends Component {
  constructor(props) {
    super(props);
    const { stockObj, onDelete } = props;
    this.state = {
      stockObj,
      closingPrice: "",
      percentChange: "",
      duration: 100,
      onDelete
    };
  }

  componentDidMount() {
    this.loadClosingPriceDetails();
  }

  loadClosingPriceDetails() {
    const query = this.state.stockObj.symbol;
    const getTimeSeriesDataURL = APIConstants.TIME_SERIES_LOOKUP_URL;
    const { TIME_SERIES_KEY } = configKeys;
    const timeSeriesDataURL = getTimeSeriesDataURL(query, TIME_SERIES_KEY);

    let closingPriceObj,
      closingPriceObjPrev,
      closingPrice = "",
      closingPricePrev = "",
      upDown,
      percentageChange;

    retrieveData(timeSeriesDataURL)
      .then(responseData => {
        const map = new Map(Object.entries(responseData));

        map.forEach((valueObj, key) => {
          if (key === APIConstants.TIME_SERIES_OBJECT_KEY) {
            closingPriceObj = Object.values(valueObj)[0];
            closingPriceObjPrev = Object.values(valueObj)[1];

            closingPrice = parseFloat(
              closingPriceObj[APIConstants.TIME_SERIES_CLOSING_KEY]
            ).toFixed(2);
            closingPricePrev = parseFloat(
              closingPriceObjPrev[APIConstants.TIME_SERIES_CLOSING_KEY]
            ).toFixed(2);

            if (closingPrice >= closingPricePrev) {
              upDown = require("../../assets/up.png");
            } else {
              upDown = require("../../assets/down.png");
            }
            percentageChange =
              Math.abs(closingPrice - closingPricePrev) / closingPrice * 100;
            percentageChange = parseFloat(percentageChange).toFixed(2);
          }
        });
        this.setState({
          ...this.state,
          closingPrice,
          upDown,
          percentageChange
        });
      })
      .done();
  }

  render() {
    const {
      containerStyle,
      symbolStyle,
      priceStyle,
      percChangeStyle,
      firstColStyle,
      nameStyle,
      upDownImageStyle,
      percentageChangeViewStyle,
      deleteItemStyle,
      deleteImgStyle
    } = WatchlistContentStyles;

    const {
      stockObj,
      closingPrice,
      percentageChange = 0,
      upDown,
      duration,
      onDelete
    } = this.state;
    const { name = "", symbol = "" } = stockObj;

    return (
      <View style={containerStyle}>
        <View style={firstColStyle}>
          <Text style={symbolStyle}>{symbol}</Text>
          <Text numberOfLines={1} style={nameStyle}>
            {name}
          </Text>
        </View>
        <Text style={priceStyle}>{closingPrice}</Text>
        <View style={percentageChangeViewStyle}>
          <Image style={upDownImageStyle} source={upDown} />
          <Text style={percChangeStyle}>{percentageChange}%</Text>
        </View>
        <View style={deleteItemStyle}>
          <TouchableHighlight onPress={() => onDelete(this.props.delKey,symbol)}>
            <Image
              style={deleteImgStyle}
              source={require("../../assets/delete.png")}
            />
          </TouchableHighlight>
        </View>
      </View>
    );
  }
}
