import React, { Component } from "react";
import {
  Text,
  View,
  StyleSheet,
  Image,
  TouchableHighlight,
  ScrollView,
  AsyncStorage
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
      isLoading: true
    };
    this.onDelete = this.onDelete.bind(this);
  }

  onDelete(index) {
    let mobxStore = this.props.screenProps.store;
    mobxStore.deleteStock(index);
    AsyncStorage.setItem("stockDetails", JSON.stringify(mobxStore.stocks));
    this.setState({...this.state});
  }

  componentDidMount() {
    //AsyncStorage.clear();
    let mobxStore = this.props.screenProps.store;
    AsyncStorage.getItem("stockDetails").then(response => {
      //this.setState({ ...this.state, isLoading: false });
      this.setState({isLoading:false});
      let stockDetails = JSON.parse(response);
      if (stockDetails) {
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
                  closingPriceObj = Object.values(valueObj)[
                    Object.values(valueObj).length - 1
                  ];
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
        this.props.screenProps.store = mobxStore;
        this.setState({ ...this.state, store: mobxStore });
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
    mobxStore.print();
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
    let mobxStore = this.props.screenProps.store;
    if (this.state.isLoading) {
      return (
        <View>
          <Text>Loading...</Text>
        </View>
      );
    }

    if (mobxStore.stocks.length === 0) {
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
          <ScrollView>{this.renderPortfolioDetails()}</ScrollView>
        </View>
      );
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
