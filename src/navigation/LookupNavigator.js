import { TabNavigator } from "react-navigation";
import { NavigationActions } from "react-navigation";
import StockLookup from "../components/manage/stock/StockLookup";
import CryptoLookup from "../components/manage/crypto/CryptoLookup";
import Constants from "../constants/PortfolioConstants";

const LookupNavigator = TabNavigator(
  {
    StockLookup: {
      screen: StockLookup
    },
    CryptoLookup: {
      screen: CryptoLookup
    }
  },
  {
    animationEnabled: true,
    tabBarOptions: {
      activeTintColor: Constants.FORE_COLOR_CODE,
      labelStyle: {
        fontSize: 12.5
      },
      style: {
        backgroundColor: Constants.BACKGROUND_COLOR_CODE
      },
      showIcon: true ,
      indicatorStyle: {
        width: 0,
        height: 0
      } 
    }
  }
);

export default LookupNavigator;
