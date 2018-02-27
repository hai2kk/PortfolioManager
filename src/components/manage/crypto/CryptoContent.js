import React, { Component } from "react";
import { View, Text, ScrollView } from "react-native";
import Constants from "../../../constants/PortfolioConstants";
import { SearchInput, SearchDisplayItem } from "../../common";
import CreateCryptoEntry from "./CreateCryptoEntry";

export default class CryptoContent extends Component {
  constructor(props) {
    super(props);
    this.state = { searchInput: "", searchResults: [], lastSelection: null };
    this.onSelection = this.onSelection.bind(this);
    this.reset = this.reset.bind(this);
  }

  handleSelectChange(searchInput) {
    this.setState({ searchInput });

    if (searchInput.length == 0) {
      this.setState({ searchResults: [] });
    }

    if (searchInput.length <= 2) {
      return;
    }

    const cryptoArr = Constants.CRYPTO_LOOKUP_SET;
    const searchResults = cryptoArr
      .filter(cryptoData => {
        return (
          cryptoData.code.toLowerCase().includes(searchInput.toLowerCase()) ||
          cryptoData.name.toLowerCase().includes(searchInput.toLowerCase())
        );
      })
      .map(cryptoData => {
        const { code, name } = cryptoData;
        return { symbol: code, name, exchDisp: "", typeDisp: "" };
      });
    this.setState({ searchResults });
  }

  onSelection(lastSelection) {
    this.setState({ searchInput: "", searchResults: [], lastSelection });
    console.log(`Selected ${JSON.stringify(lastSelection)}`);
  }

  renderResults() {
    return this.state.searchResults.map(companyInfo => (
      <SearchDisplayItem
        key={companyInfo.symbol}
        onSelection={this.onSelection}
        companyInfo={companyInfo}
      />
    ));
  }

  reset() {
    let searchInput = "";
    let searchResults = [];
    let lastSelection = null;
    this.setState({ searchInput: "", searchResults: [], lastSelection: null });
  }

  render() {
    return (
      <View>
        <SearchInput
          placeHolder="Search for crypto currencies"
          label="Search"
          value={this.state.searchInput}
          autoFocus={true}
          onChangeText={text => this.handleSelectChange(text)}
        />
        <CreateCryptoEntry
          mobxStore={this.props.mobxStore}
          lastSelection={this.state.lastSelection}
          reset={this.reset}
        />
        <ScrollView
          keyboardShouldPersistTaps={"never"}
          keyboardDismissMode="on-drag"
        >
          {this.renderResults()}
        </ScrollView>
      </View>
    );
  }
}
