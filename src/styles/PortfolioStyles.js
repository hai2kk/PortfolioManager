import { StyleSheet } from "react-native";
import Constants from "../constants/PortfolioConstants.js";

const portfolioStyles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "#F5FCFF"
    },
    button: {
      alignItems: 'center',
      backgroundColor: Constants.FORE_COLOR_CODE,
    },
    buttonText:{
      padding:10,
      color: Constants.BACKGROUND_COLOR_CODE
    }
  });

  export default portfolioStyles;
