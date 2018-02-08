import React, { Component } from "react";
import { Text, View, Button } from "react-native";
import PortfolioConstants from "../../../constants/PortfolioConstants";
import { Input } from "../../common/";

export default class CreateStockEntry extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: "",
      symbol: "",
      exchange: "",
      quantity: 0,
      price: 0
    };

    this.onSave = this.onSave.bind(this);
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
      },
      inputViewStyle: {
        height: 50,
        flexDirection: "row",
        paddingLeft: 5,
        borderBottomWidth: 1,
        borderBottomColor: PortfolioConstants.FORE_COLOR_CODE,
        alignItems: "center",
        textAlign: "left"
      },
      buttonStyle: {
        height: 50,
        backgroundColor: PortfolioConstants.FORE_COLOR_CODE
      }
    };
    const {
      mainTitleStyle,
      titleStyle,
      detailsViewStyle,
      inputViewStyle
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
            {PortfolioConstants.SEARCH_RESULT_PURCHASE_PRICE} :{" "}
          </Text>
          <Input
            placeHolder="Quantity"
            value={this.state.quantity}
            onChangeText={quantity => this.setState({ quantity })}
          />
        </View>
        <View style={inputViewStyle}>
          <Text style={titleStyle}>
            {PortfolioConstants.SEARCH_RESULT_PURCHASE_QUANTITY} :{" "}
          </Text>
          <Input
            placeHolder="Price"
            value={this.state.price}
            onChangeText={price => this.setState({ price })}
          />
        </View>
        <View>
          <Button
            onPress={this.onSave}
            title="Save"
            accessibilityLabel="Add to porfolio"
          />
        </View>
      </View>
    );
  }

  onSave() {
    const { name, symbol, exchDisp } = this.props.lastSelection;
    const { quantity, price } = this.state;
    console.log(`Name : ${name}`);
    console.log(`Symbol : ${symbol}`);
    console.log(`Exchange : ${exchDisp}`);
    console.log(`Quantity : ${quantity}`);
    console.log(`Price : ${price}`); 

  }
}
