import React from "react";
import { View, Text, Image, TouchableHighlight } from "react-native";
import Constants from "../../constants/PortfolioConstants";

const PortfolioContent = ({ index, stockDetail, onDelete }) => {
  const {
    titleStyle,
    overviewStyle,
    imageStyle,
    containerStyle,
    contentsText,
    contentsImage,
    firstRowStyle
  } = styles;

  const { name, symbol, quantity, price, exchDisp } = stockDetail;

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
        <Text numberOfLines={1} style={overviewStyle}>
          {exchDisp}
        </Text>
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
};

const styles = {
  containerStyle: {
    flexDirection: "row",
    height: 80,
    paddingTop: 10,
    borderColor: "#d6d7da",
    borderWidth: 0.5,
    borderRadius: 10,
    paddingLeft: 10
  },
  contentsText: {
    flex: 3,
    flexDirection: "column"
  },
  contentsImage: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center"
  },
  titleStyle: {
    fontSize: 20,
    color: "#010a16",
    paddingLeft: 10,
    color: Constants.FORE_COLOR_CODE,
    justifyContent: "space-around",
    flex: 2
  },
  overviewStyle: {
    fontSize: 16,
    color: "#000814",
    paddingLeft: 10,
    width: 180,
    flex: 2,
    flexWrap: "nowrap",
    justifyContent: "space-around",
    alignItems: "center"
  },
  imageStyle: {
    marginLeft: 15,
    justifyContent: "space-around",
    alignItems: "center",
    flexDirection: "row"
  },
  firstRowStyle: {
    flexDirection: "row",
    flexWrap: "nowrap",
    justifyContent: "flex-start"
  }
};

export { PortfolioContent };
