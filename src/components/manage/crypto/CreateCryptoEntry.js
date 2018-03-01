import React, { Component } from "react";
import { Text, View, Button, AsyncStorage } from "react-native";
import PortfolioConstants from "../../../constants/PortfolioConstants";
import { Input } from "../../common/";
import {APIConstants} from "../../../constants/APIConstants";
import { retrieveData } from "../../../utils/PortFolioDataUtil"
import { configKeys } from "../../../keys/configKeys"

export default class CreateCryptoEntry extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: "",
      symbol: "",
      quantity: "",
      price: ""
    };

    this.onSavePortfolio = this.onSavePortfolio.bind(this);
    this.onSaveWatchlist = this.onSaveWatchlist.bind(this);
  }

  render() {
    styles = {
      mainTitleStyle: {
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
      },
      inputViewStyle: {
        height: 50,
        flexDirection: "row",
        paddingLeft: 5,
        borderBottomWidth: 1,
        borderBottomColor: PortfolioConstants.FORE_COLOR_CODE,
        alignItems: "center"
      },
      buttonViewStyle: {
        height: 50,
        alignItems: "center",
        marginTop: 10,
        flexDirection: "row",
        justifyContent: "space-around"
      },
      validationStyle: {
        color: "#ff0000",
        paddingLeft: 10
      },
      buttonStyle: {
        justifyContent: "space-around"
      }
    };
    const {
      mainTitleStyle,
      titleStyle,
      detailsViewStyle,
      inputViewStyle,
      buttonViewStyle,
      buttonStyle,
      validationStyle
    } = styles;

    if (this.props.lastSelection === null) {
      return <View />;
    }
    return (
      <View style={mainTitleStyle}>
        <View style={inputViewStyle}>
          <Text style={titleStyle}>
            {PortfolioConstants.SEARCH_RESULT_COMPANY_NAME} :{" "}
            {this.props.lastSelection.name}
          </Text>
        </View>
        <View style={inputViewStyle}>
          <Text style={titleStyle}>
            {PortfolioConstants.SEARCH_RESULT_SYMBOL_NAME} :{" "}
            {this.props.lastSelection.symbol}
          </Text>
        </View>
        <View style={inputViewStyle}>
          <Text style={titleStyle}>
            {PortfolioConstants.SEARCH_RESULT_PURCHASE_QUANTITY} :{" "}
          </Text>
          <Input
            placeHolder="Quantity"
            value={this.state.quantity}
            onChangeText={quantity => this.setState({ quantity })}
          />
        </View>
        <View style={inputViewStyle}>
          <Text style={titleStyle}>
            {PortfolioConstants.SEARCH_RESULT_PURCHASE_PRICE} :{" "}
          </Text>
          <Input
            placeHolder="Price"
            value={this.state.price}
            onChangeText={price => this.setState({ price })}
          />
        </View>
        <Text style={validationStyle}>{this.state.validationComments}</Text>
        <View style={buttonViewStyle}>
          <Button
            onPress={this.onSavePortfolio}
            title="Add to portfolio"
            color={PortfolioConstants.FORE_COLOR_CODE}
            accessibilityLabel="Add to porfolio"
          />
          <Button
            onPress={this.onSaveWatchlist}
            title="Add to watchlist"
            color={PortfolioConstants.FORE_COLOR_CODE}
            accessibilityLabel="Add to watchlist"
          />
        </View>
      </View>
    );
  }

  async onSaveWatchlist() {
    const { symbol, name } = this.props.lastSelection;
    const stockObj = {
      symbol,
      name,
      type: PortfolioConstants.PORT_FOLIO_ITEM_TYPE_CRYPTO
    };
    this.props.mobxStore.addWatchList(stockObj);
    AsyncStorage.setItem(
      "watchList",
      JSON.stringify(this.props.mobxStore.watchList)
    );
    this.props.reset();
  }

  async onSavePortfolio() {
    const { quantity, price } = this.state;
    let isQuantityInvalid = true;
    let isPriceInvalid = true;
    let validationContentArr = [];

    if (isNaN(parseInt(quantity))) {
      isQuantityInvalid = false;
      validationContentArr.push("Quantity");
    }

    if (isNaN(parseFloat(price))) {
      isPriceInvalid = false;
      validationContentArr.push("Price");
    }

    if (!isQuantityInvalid || !isPriceInvalid) {
      this.setState({
        ...this.state,
        validationComments: `${validationContentArr} mandatory `
      });
      return;
    }
    const { name, symbol, exchDisp } = this.props.lastSelection;

    let response = await AsyncStorage.getItem("portfolioDetails");
    let portfolioDetails = (await JSON.parse(response)) || {};
    let { stockDetails = [] } = portfolioDetails;
    let stockObj = {
      name: name,
      symbol: symbol,
      exchDisp: exchDisp,
      quantity: quantity,
      price: price
    };

    const query = symbol;
    const getTimeSeriesDataURL = APIConstants.TIME_SERIES_CRYPTO_LOOKUP_URL;
    const { TIME_SERIES_KEY } = configKeys;
    const timeSeriesDataURL = getTimeSeriesDataURL(query, TIME_SERIES_KEY);
    let closingPriceObj,
      closingPrice = "";

    retrieveData(timeSeriesDataURL)
      .then(responseData => {
        const map = new Map(Object.entries(responseData));
        map.forEach((valueObj, key) => {
          if (key === APIConstants.TIME_SERIES_CRYPTO_OBJECT_KEY) {
            closingPriceObj = Object.values(valueObj)[0];
            closingPrice = parseFloat(
              closingPriceObj[APIConstants.TIME_SERIES_CRYPTO_PRICE_KEY]
            ).toFixed(2);
          }
        });

        stockObj = {
          ...stockObj,
          closingPrice,
          type: PortfolioConstants.PORT_FOLIO_ITEM_TYPE_CRYPTO
        };

        this.setState({
          ...this.state,
          quantity: "",
          price: "",
          validationComments: ""
        });
        this.props.mobxStore.addStock(stockObj);
        AsyncStorage.setItem(
          "stockDetails",
          JSON.stringify(this.props.mobxStore.stocks)
        );
        this.props.reset();
      })
      .done();
  }
}
