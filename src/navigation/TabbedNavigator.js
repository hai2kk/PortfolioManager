import { TabNavigator } from "react-navigation";
import { NavigationActions } from "react-navigation";
import Portfolio from "../components/portfolio/Portfolio";
import Watchlist from "../components/watchList/Watchlist.js";
import Manage from "../components/manage/Manage";
import Constants from "../constants/PortfolioConstants";

const TabbedNavigator = TabNavigator(
  {
    Portfolio: {
      screen: Portfolio
    },
    Manage: {
      screen: Manage,
      navigationOptions: ({ navigation, screenProps }) => ({
        tabBarOnPress: (tabObj, jumpToIndex) => {
          const navigate = screenProps.navigate;
          const navigateAction = NavigationActions.navigate({
            routeName: "ManageLookup",
            params: {},
            action: NavigationActions.navigate({ routeName: "ManageLookup" })
          });
          navigate.dispatch(navigateAction);
        }
      })
    },
    Watchlist: {
      screen: Watchlist
    }
  },
  {
    tabBarPosition: "bottom",
    animationEnabled: true,
    tabBarOptions: {
      activeTintColor: Constants.FORE_COLOR_CODE,
      labelStyle: {
        fontSize: 12.5
      },
      style: {
        backgroundColor: Constants.BACKGROUND_COLOR_CODE
      },
      showIcon: true,
      indicatorStyle: {
        width: 0,
        height: 0
      }
    }
  }
);

export default TabbedNavigator;
