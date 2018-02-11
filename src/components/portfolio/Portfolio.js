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
import Constants from "../../constants/PortfolioConstants.js";
import { NavigationActions } from "react-navigation";
import PortfolioStyles from "../../styles/PortfolioStyles.js";
import { PortfolioContent } from "./PortfolioContent";
import {observer} from 'mobx-react/native'

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
      stockDetails: [],
      cryptoDetails: [],
      isLoading: true,
      showStart: false
    };
    this.onDelete = this.onDelete.bind(this);
  }

  onDelete(index) {
    let mobxStore = this.props.screenProps.store;
    let stateObj = this.state;
    let stockDetails = mobxStore.list;
    stockDetails.splice(index, 1);
    mobxStore.list=stockDetails;
    let portfolioDetails = {};
    portfolioDetails.stockDetails = stockDetails;
    AsyncStorage.setItem("portfolioDetails", JSON.stringify(portfolioDetails));
  }

  componentDidMount() {
    /*     let portfolioDetails = {};
    let { stockDetails = [] } = [];
    const stockObj = {
      name: 'sds',
      symbol: 'sdsd',
      exchDisp: 'sdsdsd',
      quantity: 'sdsd',
      price: 'sdsd'
    };

    stockDetails.push(stockObj);
    portfolioDetails.stockDetails = stockDetails;
    AsyncStorage.setItem("portfolioDetails",JSON.stringify(portfolioDetails));
 */
    //AsyncStorage.clear();
    let mobxStore = this.props.screenProps.store;
    AsyncStorage.getItem("portfolioDetails").then(response => {
      let portfolioDetails = JSON.parse(response);
      let stateObj = {};
      if (portfolioDetails) {
        const { stockDetails } = portfolioDetails;
        stateObj = {
          stockDetails: stockDetails,
          cryptoDetails: [],
          isLoading: false,
          showStart: false
        };
      } else {
        stateObj = {
          stockDetails: [],
          cryptoDetails: [],
          isLoading: false,
          showStart: true
        };
      }
      if(portfolioDetails){
        portfolioDetails.stockDetails.forEach(element => {
          mobxStore.addItem(element);
        });
      }
      this.setState(stateObj);
    });
  }

  renderPortfolioDetails() {
    let mobxStore = this.props.screenProps.store;
    
    return mobxStore.list.map((stockDetail, index) => (
      <PortfolioContent
        key={index}
        index={index}
        stockDetail={stockDetail}
        onDelete={this.onDelete}
      />
    ));
  }

  render() {
    //console.log("Portfolio:");
    //console.log(this.props.screenProps.store);
    if (this.state.isLoading) {
      return (
        <View>
          <Text>Loading...</Text>
        </View>
      );
    }

    if (this.state.showStart) {
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
    }
    if (this.state.hasOwnProperty("stockDetails")) {
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
