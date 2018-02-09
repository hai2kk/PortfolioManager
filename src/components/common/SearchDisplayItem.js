import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import PortfolioConstants from "../../constants/PortfolioConstants";

const SearchDisplayItem = ({ companyInfo, onSelection }) => {
  const Styles = {
    companyStyle: {
      color: PortfolioConstants.FORE_COLOR_CODE,
      fontSize: 18
    },
    symbolStyle: {
      paddingLeft: 5,
      fontSize: 14
    },
    indexStyle: {
      paddingLeft: 5,
      paddingRight: 5
    },
    viewStyle: {
      height: 50,
      flexDirection: "row",
      paddingLeft: 5,
      borderBottomWidth: 1,
      borderBottomColor: PortfolioConstants.FORE_COLOR_CODE,
      alignItems: "center"
    }
  };

  const { companyStyle, symbolStyle, indexStyle, viewStyle } = Styles;
  let companyData = companyInfo;
  return (
    <TouchableOpacity
      onPress={() => {
        onSelection(companyData);
      }}
    >
      <View style={viewStyle}>
        <Text style={companyStyle} ellipsizeMode="tail">
          {companyInfo.name}
        </Text>
        <Text style={indexStyle}>
          {companyInfo.typeDisp} {companyInfo.exchDisp}
        </Text>
        <Text style={symbolStyle}>({companyInfo.symbol})</Text>
      </View>
    </TouchableOpacity>
  );
};

export { SearchDisplayItem };
