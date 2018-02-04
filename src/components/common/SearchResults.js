import React, { Component } from "react";
import { View, Text, ScrollView } from "react-native";
import { SearchDisplayItem } from ".";

class SearchResults extends Component {
  /*   componentWillMount() {
    return axios.get(movieConst.API_URL).then(response => {
      const movieDataArr = response.data.results;
      movieDataArr.sort(compare);
      console.log(JSON.stringify(movieDataArr));
      this.setState({ movieDetails: movieDataArr });
    });
 */

  renderResults() {
    console.log("Search result : " + JSON.stringify(this.props.searchResults));
    return this.props.searchResults.map(companyInfo => (
      <SearchDisplayItem companyInfo={companyInfo} />
    ));
  }

  render() {
    return <ScrollView>{this.renderResults()}</ScrollView>;
  }
}

export { SearchResults };
