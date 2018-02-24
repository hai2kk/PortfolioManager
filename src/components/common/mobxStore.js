import { observable } from "mobx";

let index = 0;

class mobxStore {
  @observable stocks = [];
  @observable crypto = [];
  @observable watchList = [];

  addStock(item) {
    this.stocks.push(item);
  }

  deleteStock(index) {
    this.stocks.splice(index, 1);
  }

  addCrypto(item) {
    this.crypto.push(item);
  }

  deleteCrypto(index) {
    this.crypto.splice(index, 1);
  }

  addWatchList(item){
    this.watchList.push(item);
  }

  deleteWatchList(index) {
    this.watchList.splice(index, 1);
  }

  clear(item) {
    this.stocks = [];
    this.crypto = [];
    this.watchList = [];
  }

  removeAll(){
    this.stocks.length = 0;
    this.crypto.length = 0;
  }  

  removeAllWatchLists(){
    this.watchList.length = 0;
  }

  print() {
   /*  console.log("printing Stocks:");
    for (i = 0; i < this.stocks.length; i++) {
      console.log(this.stocks[i]);
    }
    console.log("printing Crypto:");
    for (i = 0; i < this.crypto.length; i++) {
      console.log(this.crypto[i]);
    } */

    this.watchList.forEach(element => {
      console.log(element);
    });
  }
}

const mobxStoreInst = new mobxStore();
export default mobxStoreInst;
