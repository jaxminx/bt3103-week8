<template>
  <div>
    <header id="header">
      <h1>Jasmine's Zi Char</h1>
    </header>

    <ul class="applied_ul_home">
      <li class="applied_li_home">
        <router-link to="/" exact>Home</router-link>
      </li>
      <li class="applied_li_home">
        <router-link to="/orders" exact>Orders</router-link>
      </li>
    </ul>

    <ul class="applied_ul_home">
      <li
        class="applied_li_home items_boxes"
        id="items"
        v-for="(item, index) in items"
        :key="index"
      >
        <p id="itemName">{{ item.name }}</p>
        <img v-bind:src="item.imageURL" />
        <p id="price">${{ item.price }}</p>
        <QuantityCounter v-bind:item="item" v-on:counter="onCounter"></QuantityCounter>
      </li>
    </ul>
    <Basket id="shoppingBasket" v-bind:itemsSelected="itemsSelected"></Basket>
  </div>
</template>

<script>
import QuantityCounter from "./QuantityCounter";
import Basket from "./Basket";
import database from "../firebase.js";

export default {
  data() {
    return {
      itemsSelected: [],
      items: []
    };
  },
  components: {
    QuantityCounter,
    Basket
  },
  methods: {
    onCounter: function(item, count) {
      if (this.itemsSelected.length === 0 && count > 0) {
        //If there is nothing in items selected, push the ORDER in
        this.itemsSelected.push([item.name, count, item.price]);
      } else {
        var updated = false;
        // Loop through everything to check what is not in the basket
        for (let i = 0; i < this.itemsSelected.length; i++) {
          const curr_item = this.itemsSelected[i];
          const item_name = curr_item[0];

          // if item_name is the same as item.name and the count is more than 0, update this.itemsSelected
          if (item_name == item.name && count > 0) {
            this.itemsSelected.splice(i, 1);
            this.itemsSelected.push([item.name, count, item.price]);
            updated = true;
            break;
          }

          // Next, item_name is the same as item.name and the count is 0, remove it from itemsSelected.
          else if (item_name == item.name && count == 0) {
            this.itemsSelected.splice(i, 1);
            updated = true;
            break;
          }
          // otherwise, if the item is not in itemSelected, add it to itemsSelected by pushing the ORDER in.
        }
        if (updated == false && count > 0) {
          this.itemsSelected.push([item.name, count, item.price]);
        }
      }
    },
    fetchItems: function() {
      database
        .collection("menu")
        .get()
        .then(snapshot => {
          snapshot.docs.forEach(doc => {
            this.items.push(doc.data());
          });
        });
    }
  },
  created: function() {
    this.fetchItems();
  }
};
</script>

<style>
#header {
  background-color: blue;
  font-size: 40px;
  text-align: center;
}

.applied_ul_home {
  width: 100%;
  max-width: 70%;
  margin: 0 5px;
  padding: 0 5px;
  box-sizing: border-box;
  display: flex;
  flex-wrap: wrap;
  list-style-type: none;
}

.applied_li_home {
  flex-grow: 1;
  flex-basis: 300px;
  text-align: center;
  padding: 10px;
  border: 1px solid #222;
  margin: 10px;
}

.items_boxes {
  padding-bottom: 30px;
}
img {
  width: 135px;
  height: 135px;
}

#price {
  font-size: 30px;
}

#itemName {
  font-size: 30px;
}

#shoppingBasket {
  position: absolute;
  top: 33%;
  left: 72%;
  font-size: 30px;
}
</style>
