import { TabNavigator } from "react-navigation";
import Portfolio from "../Portfolio/component/Portfolio.js";
import Watchlist from "../WatchList/component/Watchlist.js";
import Manage from "../Manage/comonent/Manage";
import { Alert } from "react-native";
import { NavigationActions } from "react-navigation";

const Navigator = TabNavigator(
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
      activeTintColor: "#70196D",
      labelStyle: {
        fontSize: 12.5
      },
      style: {
        backgroundColor: "#D3D3D3"
      },
      showIcon: true,
      indicatorStyle: {
        width: 0,
        height: 0
      }
    }
  }
);

export default Navigator;
