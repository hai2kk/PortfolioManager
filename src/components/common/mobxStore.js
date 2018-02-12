import {observable} from 'mobx'

let index = 0

class mobxStore {
  @observable list = [];

  addItem (item) {
    this.list.push(item);
  }

  clear (item) {
    this.list = [];
  }

  deleteItem (index){
    this.list.splice(index,1);
  }

  print(){
      console.log("printing mobxStore:")
      for(i=0;i<this.list.length;i++){
          console.log(this.list[i]);
      }
  }
}


const mobxStoreInst = new mobxStore()
export default mobxStoreInst
                        