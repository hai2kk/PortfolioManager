import React from "react";
import { View, Text, ScrollView } from "react-native";
import PortfolioConstants from "../../constants/PortfolioConstants";

const SearchDisplayItem = ({ companyInfo }) => {
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
      alignItems: "center",
      textAlign: "left"
    }
  };

  const { companyStyle, symbolStyle, indexStyle, viewStyle } = Styles;

  return (
    <View style={viewStyle}>
      <Text style={companyStyle} ellipsizeMode="tail">
        {companyInfo.name}
      </Text>
      <Text style={indexStyle}>
        {companyInfo.typeDisp} {companyInfo.exchDisp}
      </Text>
      <Text style={symbolStyle}>({companyInfo.symbol})</Text>
    </View>
  );
};

export { SearchDisplayItem };
