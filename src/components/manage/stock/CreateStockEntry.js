import React, { Component } from "react";
import { Text, View, Button, AsyncStorage } from "react-native";
import PortfolioConstants from "../../../constants/PortfolioConstants";
import { Input } from "../../common/";

export default class CreateStockEntry extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: "",
      symbol: "",
      exchange: "",
      quantity: "",
      price: ""
    };

    this.onSave = this.onSave.bind(this);
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
        marginTop: 10
      },
      validationStyle :{
        color: '#ff0000',
        paddingLeft: 10
      }
    };
    const {
      mainTitleStyle,
      titleStyle,
      detailsViewStyle,
      inputViewStyle,
      buttonViewStyle,
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
            {PortfolioConstants.SEARCH_RESULT_EXCHANGE} :{" "}
            {this.props.lastSelection.exchDisp}
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
            onPress={this.onSave}
            title="Save"
            color={PortfolioConstants.FORE_COLOR_CODE}
            accessibilityLabel="Add to porfolio"
          />
        </View>
      </View>
    );
  }

  async onSave() {
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
    const stockObj = {
      name: name,
      symbol: symbol,
      exchDisp: exchDisp,
      quantity: quantity,
      price: price
    };

    this.props.mobxStore.addStock(stockObj);
    await AsyncStorage.setItem(
      "stockDetails",
      JSON.stringify(this.props.mobxStore.stocks)
    );
    this.props.reset();
  }
}
