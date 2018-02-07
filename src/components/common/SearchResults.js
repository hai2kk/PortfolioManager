import React, { Component } from "react";
import { View, Text, ScrollView } from "react-native";
import { SearchDisplayItem } from ".";

class SearchResults extends Component {
  renderResults() {
    return this.props.searchResults.map(companyInfo => (
      <SearchDisplayItem
        key={companyInfo.symbol}
        onSelection={this.props.onSelection}
        companyInfo={companyInfo}
      />
    ));
  }

  render() {
    return (
      <ScrollView contentContainerStyle={{ flex: 0 }}>
        {this.renderResults()}
      </ScrollView>
    );
  }
}

export { SearchResults };
