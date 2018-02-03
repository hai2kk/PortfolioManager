import React from "react";
import { Text, View, TextInput, StyleSheet, Image } from "react-native";
import Constants from "../../constants/PortfolioConstants";

const SearchInput = ({ label, placeHolder, value, onChangeText }) => {
  const Styles = {
    textStyle: {
      height: 25,
      width: 350,
      color: Constants.BACKGROUND_COLOR_CODE,
      fontSize: 19,
      paddingLeft: 15,
      paddingRight: 5,
      lineHeight: 23,
      borderBottomWidth: 1,
      borderBottomColor: Constants.FORE_COLOR_CODE
    },
    labelStyle: {
      fontSize: 10,
      paddingLeft: 20
    },
    viewStyle: {
      height: 40,
      flexDirection: "row",
      alignItems: "center",
      backgroundColor: Constants.FORE_COLOR_CODE
    },
    imageStyle: {
      marginLeft: 15
    }
  };

  const { textStyle, labelStyle, viewStyle, imageStyle } = Styles;
  return (
    <View style={viewStyle}>
      <Image style={imageStyle} source={require("../../assets/search.png")} />
      <TextInput
        placeholder={placeHolder}
        underlineColorAndroid="transparent"
        value={value}
        onChangeText={onChangeText}
        style={textStyle}
      />
    </View>
  );
};

export default SearchInput;
