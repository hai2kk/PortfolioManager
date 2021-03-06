import React, { Component } from "react";
import { Text, View, ScrollView, Dimensions } from "react-native";
import { SearchInput, SearchResults } from ".";
import { APIConstants } from "../../constants/APIConstants";
import PortFolioConstants from "../../constants/PortfolioConstants";
import CreateStockEntry from "../manage/stock/CreateStockEntry";
import { retrieveData } from "../../utils/PortFolioDataUtil";

class SearchBar extends Component {
  constructor(props) {
    super(props);
    this.onSelection = this.onSelection.bind(this);
    this.reset = this.reset.bind(this);
    this.state = { searchInput: "", searchResults: [], lastSelection: null };
  }

  handleSelectChange(searchInput) {
    this.setState({ searchInput });
    const query = searchInput;
    let getStockDataURL = APIConstants.STOCK_LOOKUP_URL;
    let stockDataURL = getStockDataURL(query);

    retrieveData(stockDataURL)
      .then(responseData => {
        this.setState({
          searchResults: responseData.ResultSet.Result,
          lastSelection: null
        });
      })
      .done();
  }

  onSelection(companyInfo) {
    let searchInput = "";
    let searchResults = [];
    let lastSelection = companyInfo;
    this.setState({ searchInput, searchResults, lastSelection });
  }

  reset() {
    let searchInput = "";
    let searchResults = [];
    let lastSelection = null;
    this.setState({ searchInput, searchResults, lastSelection });
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
        <View>
          <CreateStockEntry
            mobxStore={this.props.mobxStore}
            lastSelection={this.state.lastSelection}
            reset={this.reset}
          />
        </View>
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
