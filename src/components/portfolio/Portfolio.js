import React, { Component } from "react";
import {
  Text,
  View,
  StyleSheet,
  Image,
  TouchableHighlight,
  ScrollView,
  AsyncStorage,
  RefreshControl
} from "react-native";
import NavigationStyles from "../../styles/NavigationStyles";
import { NavigationActions } from "react-navigation";
import PortfolioStyles from "../../styles/PortfolioStyles.js";
import PortfolioContent from "./PortfolioContent";
import { observer } from "mobx-react/native";
import { retrieveData } from "../../utils/PortFolioDataUtil";
import { APIConstants } from "../../constants/APIConstants";
import { configKeys } from "../../keys/configKeys";

@observer
class Portfolio extends Component {
  static navigationOptions = {
    tabBarLabel: "Portfolio",
    tabBarIcon: ({ tintColor }) => (
      <Image
        source={require("../../assets/portfolio.png")}
        style={[NavigationStyles.icon, { tintColor: tintColor }]}
      />
    )
  };

  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      refreshing: false,
      showStart: false,
      store: []
    };
    this.onDelete = this.onDelete.bind(this);
    this.loadPortFolioDetails = this.loadPortFolioDetails.bind(this);
  }

  _onRefresh() {
    this.setState({ ...this.state, refreshing: true });
    let mobxStore = this.props.screenProps.store;
    mobxStore.removeAll();
    this.loadPortFolioDetails();
    this.setState({ ...this.state, refreshing: false });
  }

  onDelete(index) {
    let mobxStore = this.props.screenProps.store;
    mobxStore.deleteStock(index);
    AsyncStorage.setItem("stockDetails", JSON.stringify(mobxStore.stocks));
    let showStart = mobxStore.stocks.length === 0 ? true : false;
    this.setState({ ...this.state, showStart });
  }

  async loadPortFolioDetails() {
    let mobxStore = this.props.screenProps.store;
    AsyncStorage.getItem("stockDetails").then(response => {
      //this.setState({ ...this.state, isLoading: false });
      //this.setState({ isLoading: false });
      let stockDetails = JSON.parse(response) ||[];
      if (stockDetails.length === 0) {
        this.setState({
          ...this.state,
          store: mobxStore,
          showStart: true,
          isLoading: false
        });
      } else {
        stockDetails.forEach(element => {
          const query = element.symbol;
          const getTimeSeriesDataURL = APIConstants.TIME_SERIES_LOOKUP_URL;
          const { TIME_SERIES_KEY } = configKeys;
          const timeSeriesDataURL = getTimeSeriesDataURL(
            query,
            TIME_SERIES_KEY
          );
          let closingPriceObj,
            closingPrice = "";

          retrieveData(timeSeriesDataURL)
            .then(responseData => {
              const map = new Map(Object.entries(responseData));
              map.forEach((valueObj, key) => {
                if (key === APIConstants.TIME_SERIES_OBJECT_KEY) {
                  closingPriceObj = Object.values(valueObj)[0];
                  closingPrice = parseFloat(
                    closingPriceObj[APIConstants.TIME_SERIES_CLOSING_KEY]
                  ).toFixed(2);
                }
              });
              let stockDetail = { ...element, closingPrice };
              mobxStore.addStock(stockDetail);
            })
            .done();
        });
        this.setState({
          ...this.state,
          store: mobxStore,
          showStart: false,
          isLoading: false
        });
      }
    });
    AsyncStorage.getItem("cryptoDetails").then(response => {
      this.state.setState({ isLoading: false });
      let cryptoDetails = JSON.parse(response);
      if (cryptoDetails) {
        cryptoDetails.forEach(element => {
          mobxStore.addCrypto(element);
        });
      }
    });
  }

  componentDidMount() {
    this.loadPortFolioDetails();
  }

  renderPortfolioDetails() {
    let { store } = this.state;
    return store.stocks.map((stockDetail, index) => (
      <PortfolioContent
        key={index}
        index={index}
        stockDetail={stockDetail}
        onDelete={this.onDelete}
      />
    ));
  }

  render() {
    const mobxStore = this.props.screenProps.store;
    let { showStart, isLoading } = this.state;
    //The case were there weren't any companies added initially and later on added using search
    if (mobxStore.stocks.length > 0) {
      showStart = false;
    }
    
    if (isLoading) {
      return (
        <View>
          <Text>Loading...</Text>
        </View>
      );
    } else {
      if (showStart) {
        return (
          <View style={PortfolioStyles.container}>
            <TouchableHighlight
              onPress={() => this.createPortfolioClick()}
              underlayColor="white"
            >
              <View style={PortfolioStyles.button}>
                <Text style={PortfolioStyles.buttonText}>Start</Text>
              </View>
            </TouchableHighlight>
          </View>
        );
      } else {
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
              {this.renderPortfolioDetails()}
            </ScrollView>
          </View>
        );
      }
    }

    const styles = StyleSheet.create({
      container: {
        flex: 1,
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#F5FCFF"
      }
    });
  }
  
  createPortfolioClick() {
    const navigateAction = NavigationActions.navigate({
      routeName: "ManageLookup",
      params: {},
      action: NavigationActions.navigate({ routeName: "ManageLookup" })
    });
    this.props.screenProps.navigate.dispatch(navigateAction);
  }
}

export default Portfolio;
