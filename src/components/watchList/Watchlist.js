import React, { Component } from "react";
import {
  Text,
  View,
  StyleSheet,
  Image,
  AsyncStorage,
  ScrollView,
  RefreshControl
} from "react-native";
import { observer } from "mobx-react/native";
import NavigationStyles from "../../styles/NavigationStyles";
import PortfolioStyles from "../../styles/PortfolioStyles.js";
import WatchListItem from "./WatchListItem";
import { compareWatchList } from "../../utils/PortFolioDataUtil";

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
      watchList: this.props.screenProps.store.watchList || [],
      cryptoWatchList: this.props.screenProps.store.cryptoWatchList || [],
      refreshing: false
    };
    this.loadWatchlistDetails = this.loadWatchlistDetails.bind(this);
    this.onDelete = this.onDelete.bind(this);
  }

  componentDidMount() {
    this.loadWatchlistDetails();
  }

  _onRefresh() {
    this.setState({ ...this.state, refreshing: true });
    let mobxStore = this.props.screenProps.store;
    mobxStore.removeAllWatchLists();
    this.loadWatchlistDetails();
    this.setState({ ...this.state, refreshing: false });
  }

  async loadWatchlistDetails() {
    let mobxStore = this.props.screenProps.store;
    AsyncStorage.getItem("watchList").then(response => {
      const watchList = JSON.parse(response) || [];
      this.setState({
        ...this.state,
        watchList,
        refreshing: false
      });
      mobxStore.watchList = watchList;
    });

    /* AsyncStorage.getItem("cryptoWatchList").then(response => {
      const cryptoWatchList = JSON.parse(response) || [];
      this.setState({
        ...this.state,
        cryptoWatchList,
        refreshing: false
      });
      mobxStore.cryptoWatchList = cryptoWatchList;
    }); */
  }

  onDelete(index, symbol) {
    console.log(`Deleting ${symbol} at ${index}`);
    const {
      watchList = [],
      cryptoWatchList = []
    } = this.props.screenProps.store;
    watchList.splice(index, 1);
    this.props.screenProps.store.watchList = watchList;
    AsyncStorage.setItem("watchList", JSON.stringify(watchList));
  }

  renderWatchlistDetails() {
    const {
      watchList = [],
      cryptoWatchList = []
    } = this.props.screenProps.store;

    return watchList.map((stockObj, index) => (
      <WatchListItem
        key={`${stockObj.symbol}_${index}`}
        delKey={index}
        stockObj={stockObj}
        onDelete={this.onDelete}
      />
    ));
  }

  render() {
    const mobxStore = this.props.screenProps.store;

    return (
      <View>
        <ScrollView
          refreshControl={
            <RefreshControl
              refreshing={this.state.refreshing}
              onRefresh={this._onRefresh.bind(this)}
            />
          }
        >
          {this.renderWatchlistDetails()}
        </ScrollView>
      </View>
    );
  }
}

export default Watchlist;
