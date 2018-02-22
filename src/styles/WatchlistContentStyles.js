import Constants from "../constants/PortfolioConstants";

const WatchlistContentStyles = {
  containerStyle: {
    flexDirection: "row",
    height: 80,
    paddingTop: 10,
    paddingBottom: 10,
    borderWidth: 0.5,
    borderRadius: 2,
    paddingLeft: 10,
    alignItems: "center"
  },
  firstColStyle: {
    flexDirection: "column",
    flexWrap: "nowrap",
    justifyContent: "space-around",
    width: 150
  },
  symbolStyle: {
    fontSize: 20,
    color: Constants.FORE_COLOR_CODE
  },
  nameStyle: {
    fontSize: 18
  },
  priceStyle: {
    paddingTop: 5,
    width: 80,
    fontSize: 18,
    fontWeight: "bold",
    alignItems: "center",
    flexWrap: "nowrap",
    justifyContent: "space-around"
  },
  percChangeStyle: {
    flex: 3,
    width: 15
  },
  upDownImageStyle: {
    marginLeft: 5,
    justifyContent: "space-around",
    alignItems: "center",
    flexDirection: "row"
  },
  percentageChangeViewStyle: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center"
  },
  deleteItemStyle: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center"
  },
  deleteImgStyle: {
    marginLeft: 15,
    justifyContent: "space-around",
    alignItems: "center",
    flexDirection: "row"
  },
};

export { WatchlistContentStyles };
