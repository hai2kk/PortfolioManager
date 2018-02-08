import React from "react";
import { Text, View, TextInput, StyleSheet } from "react-native";

const Input = ({ placeHolder, value, onChangeText }) => {
  const Styles = {
    textStyle: {
      height: 20,
      width: 100,
      color: "#000",
      fontSize: 16
    },
    viewStyle: {
      flexDirection: "column",
      alignItems: "center"
    }
  };

  const { textStyle, labelStyle, viewStyle } = Styles;

  return (
    <View>
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

export { Input };
