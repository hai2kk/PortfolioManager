import Constants from "../constants/PortfolioConstants";

const PortfolioContentStyles = {
  containerStyle: {
    flexDirection: "row",
    height: 180,
    paddingTop: 10,
    borderColor: "#d6d7da",
    borderWidth: 0.5,
    borderRadius: 10,
    paddingLeft: 10
  },
  contentsText: {
    flex: 3,
    flexDirection: "column"
  },
  totalValueStyle: {
    fontSize: 18,
    color: "#000814",
    paddingLeft: 10,
    paddingTop: 5,
    width: 400,
    flexWrap: "nowrap",
    justifyContent: "space-around"
  },
  contentsImage: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center"
  },
  titleStyle: {
    fontSize: 20,
    color: "#010a16",
    paddingLeft: 10,
    paddingBottom : 5,
    color: Constants.FORE_COLOR_CODE,
    justifyContent: "space-around",
    flex: 2
  },
  nameStyle: {
    fontSize: 18,
    color: "#000814",
    paddingLeft: 10,
    paddingBottom : 5,
    width: 250,
    flexWrap: "nowrap",
    justifyContent: "space-around"
  },
  overviewStyle: {
    fontSize: 16,
    color: "#000814",
    paddingLeft: 10,
    width: 180,
    flexWrap: "nowrap",
    justifyContent: "space-around"
  },
  imageStyle: {
    marginLeft: 15,
    justifyContent: "space-around",
    alignItems: "center",
    flexDirection: "row"
  },
  firstRowStyle: {
    flexDirection: "row",
    flexWrap: "nowrap",
    justifyContent: "flex-start"
  },
  indicatorViewStyle: {
    flexDirection: "row"
  },
  indicatorContentStyle: {
    paddingTop: 5,
    paddingLeft: 5,
    paddingRight: 5,
    paddingBottom: 5,
    borderRadius: 7,
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "space-around"
  }
};

export { PortfolioContentStyles };
