import React, { Component } from "react";
import { View, Text, ScrollView } from "react-native";

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
      console.log("Search result : "+JSON.stringify(this.props.searchResults));
    return this.props.searchResults.map(companyInfo => (
      /* <MovieItem
        key={movieDetail.id}
        movieDetail={movieDetail}
        navigate={this.props.navigate}
      /> */
      <Text>{companyInfo.name}</Text>
    ));
  }

  render() {
    return <ScrollView>{this.renderResults()}</ScrollView>;
  }
}

export default SearchResults;
