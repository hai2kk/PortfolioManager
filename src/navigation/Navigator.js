import { TabNavigator } from "react-navigation";
import Portfolio from "../Portfolio/component/Portfolio.js";
import Manage from "../Manage/comonent/Manage.js";
import Watchlist from "../WatchList/component/Watchlist.js";

const Navigator = TabNavigator(
  {
    Portfolio: {
      screen: Portfolio
    },
    Manage: {
      screen: Manage
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
