import React, { Component } from "react";
import { Text, View, ScrollView, Dimensions } from "react-native";
import { SearchInput, SearchResults } from ".";
import {APIConstants} from "../../constants/APIConstants";
import PortFolioConstants from "../../constants/PortfolioConstants";

class SearchBar extends Component {
  constructor(props) {
    super(props);
    this.onSelection = this.onSelection.bind(this);
    this.state = { searchInput: "", searchResults: [], lastSelection: {} };
  }

  handleSelectChange(searchInput) {
    this.setState({ searchInput });
    const query = searchInput;
    let getStockDataURL = APIConstants.STOCK_LOOKUP_URL;
    let stockDataURL = getStockDataURL(query);

    let response = fetch(stockDataURL)
      .then(response => response.json())
      .then(responseData => {
        this.setState({ searchResults: responseData.ResultSet.Result });
      })
      .done();
  }

  onSelection(companyInfo) {
    let searchInput = "";
    let searchResults = [];
    console.log("inside onSelection of Searchbar");
    this.setState({ searchInput, searchResults });
    console.log(JSON.stringify(companyInfo));
  }

  render() {
    let screenHeight = Dimensions.get("window").height;

    return (
      <View>
        <SearchInput
          placeHolder="Search for symbols or companies"
          label="Search"
          value={this.state.searchInput}
          autoFocus={true}
          onChangeText={text => this.handleSelectChange(text)}
        />
        <View style={{ height: screenHeight - 250 }}>
          <SearchResults
            onSelection={this.onSelection}
            searchResults={this.state.searchResults}
          />
        </View>
      </View>
    );
  }
}

export { SearchBar };
