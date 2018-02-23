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
  }

  onDelete(index,symbol) {
    console.log(`Deleting ${symbol}`);
    const { watchList = [] } = this.props.screenProps.store;
    console.log(`Deleting item found at index ${index} : ${JSON.stringify(watchList[index])} `);
    watchList.splice(index, 1);
    //this.setState({ ...this.state, watchList: watchList });
    this.props.screenProps.store.watchList = watchList;
    AsyncStorage.setItem("watchList", JSON.stringify(watchList));
  }

  renderWatchlistDetails() {
    const { watchList = [] } = this.props.screenProps.store;
    //const { watchList = [] } = this.state;
    /* const filteredWatchList = watchList.sort().reduce((arr, current) => {
      if (arr.length === 0 || arr[arr.length - 1].symbol !== current.symbol) {
        arr.push(current);
      }
      return arr;
    }, []); */

    watchList.sort(compareWatchList);

    return watchList.map((stockObj, index) => (
      <WatchListItem key={`${stockObj.symbol}_${index}`} delKey={index} stockObj={stockObj} onDelete={this.onDelete} />
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
