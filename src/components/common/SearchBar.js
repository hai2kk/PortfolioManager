import React, { Component } from "react";
import { Text, View } from "react-native";
import {SearchInput,SearchResults} from ".";

class SearchBar extends Component {
  state = { searchInput: "", searchResults: [] };

  handleSelectChange(searchInput) {
    this.setState({ searchInput });
    const query = searchInput;
    let response = fetch(
      `http://autoc.finance.yahoo.com/autoc?query=${query}&region=US&lang=en-GB`
    )
      .then(response => response.json())
      .then(responseData => {
        //console.log("inside responsejson");
        //console.log("response object:", responseData);
        this.setState({ searchResults: responseData.ResultSet.Result });
      })
      .done();
  }

  render() {
    return (
      <View>
        <SearchInput
          placeHolder="Search for symbols or companies"
          label="Search"
          value={this.state.searchInput}
          onChangeText={text => this.handleSelectChange(text)}
        />
        <SearchResults searchResults={this.state.searchResults} />
      </View>
    );
  }
}

export {SearchBar};
