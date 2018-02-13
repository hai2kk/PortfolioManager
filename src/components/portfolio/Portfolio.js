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
      isLoading: true
    };
    this.onDelete = this.onDelete.bind(this);
  }

  onDelete(index) {
    let mobxStore = this.props.screenProps.store;
    mobxStore.deleteStock(index);
    AsyncStorage.setItem("stockDetails", JSON.stringify(mobxStore.stocks));
  }

  componentDidMount() {
    //AsyncStorage.clear();
    let mobxStore = this.props.screenProps.store;
    AsyncStorage.getItem("stockDetails").then(response => {
      this.setState({isLoading:false});
      let stockDetails = JSON.parse(response);
      if (stockDetails) {
        stockDetails.forEach(element => {
          mobxStore.addStock(element);
        });
      }        
    });
    AsyncStorage.getItem("cryptoDetails").then(response => {
      this.state.setState({isLoading:false});
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
    let mobxStore = this.props.screenProps.store;
    
    return mobxStore.stocks.map((stockDetail, index) => (
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

    if (mobxStore.stocks.length===0) {
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
    else {
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
