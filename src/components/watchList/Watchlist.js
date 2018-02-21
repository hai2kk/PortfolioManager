import React, { Component } from "react";
import {
  Text,
  View,
  StyleSheet,
  Image,
  AsyncStorage,
  ScrollView
} from "react-native";
import { observer } from "mobx-react/native";
import NavigationStyles from "../../styles/NavigationStyles";
import PortfolioStyles from "../../styles/PortfolioStyles.js";
import WatchListItem from "./WatchListItem";

@observer
class Watchlist extends Component {
  static navigationOptions = {
    tabBarLabel: "Watchlist",
    tabBarIcon: ({ tintColor }) => (
      <Image
        source={require("../../assets/search.png")}
        style={[NavigationStyles.icon, { tintColor: tintColor }]}
      />
    )
  };

  constructor(props) {
    super(props);
    this.state = {
      store: this.props.screenProps.store.watchList || []
    };
    this.loadWatchlistDetails = this.loadWatchlistDetails.bind(this);
  }

  componentDidMount() {
    this.loadWatchlistDetails();
  }

  async loadWatchlistDetails() {
    let mobxStore = this.props.screenProps.store;
    AsyncStorage.getItem("watchList").then(response => {
      const watchList = JSON.parse(response) || [];
      this.setState({
        ...this.state,
        watchList
      });
      mobxStore.watchList = watchList;
    });
  }

  renderWatchlistDetails() {
    const { watchList = [] } = this.props.screenProps.store;
    return watchList.map((symbol, index) => (
      <WatchListItem key={index} symbol={symbol} />
    ));
  }

  render() {
    const mobxStore = this.props.screenProps.store;
    console.log(mobxStore);
    if (mobxStore.watchList.length > 0) {
      showStart = false;
    }
    return (
      <View>
        <ScrollView>{this.renderWatchlistDetails()}</ScrollView>
      </View>
    );
  }
}

export default Watchlist;
