import React, { Component } from "react";
import SearchInput from "./SearchInput";
import { Text } from "react-native";

class SearchBar extends Component {
  state = { searchInput: "" };

  render() {
    return (
      <SearchInput
        placeHolder="Enter symbol"
        label="Search"
        value={this.state.searchInput}
        onChangeText={searchInput => this.setState({ searchInput })}
      /> 
    );
  }
}

export default SearchBar;
