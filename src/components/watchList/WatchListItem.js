import React, { Component } from "react";
import { Text, View } from "react-native";
import { APIConstants } from "../../constants/APIConstants";
import { retrieveData } from "../../utils/PortFolioDataUtil";
import { configKeys } from "../../keys/configKeys";


export default class WatchListItem extends Component {
  constructor(props) {
    super(props);
    const { symbol } = props;
    this.state = {
      symbol,
      closingPrice: ""
    };
  }

  componentDidMount() {
    this.loadClosingPriceDetails();
  }

  loadClosingPriceDetails() {
    const query = this.state.symbol;
    const getTimeSeriesDataURL = APIConstants.TIME_SERIES_LOOKUP_URL;
    const { TIME_SERIES_KEY } = configKeys;
    const timeSeriesDataURL = getTimeSeriesDataURL(query, TIME_SERIES_KEY);
    let closingPriceObj,
      closingPrice = "";

    retrieveData(timeSeriesDataURL)
      .then(responseData => {
        const map = new Map(Object.entries(responseData));
        map.forEach((valueObj, key) => {
          if (key === APIConstants.TIME_SERIES_OBJECT_KEY) {
            closingPriceObj = Object.values(valueObj)[0];
            closingPrice = parseFloat(
              closingPriceObj[APIConstants.TIME_SERIES_CLOSING_KEY]
            ).toFixed(2);
          }
        });
        this.setState({ ...this.state, closingPrice });
      })
      .done();
  }

  render() {
    const { symbol, closingPrice } = this.state;
    return (
      <Text>
        {symbol} - 
        {closingPrice}
      </Text>
    );
  }
}
