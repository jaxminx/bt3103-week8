<template>
  <div>
    <ul id="basket">
      Menu:
      <li class="basketItems" v-for="(item, index) in itemsSelected" :key="index">
        <p>{{item[0]}} x {{item[1]}}</p>
      </li>
    </ul>
    <button id="add_button" v-on:click="findTotal();sendOrder()">Add Order</button>
    <p class="cost" v-show="showPrices">Subtotal: ${{this.subtotal}}</p>
    <p class="cost" v-show="showPrices">Grand Total: ${{this.grandTotal}}</p>
  </div>
</template>

<script>
import database from "../firebase.js";

export default {
  data() {
    return {
      subtotal: 2,
      grandTotal: 0,
      gst: 0.07,
      showPrices: false
    };
  },
  props: ["itemsSelected"],
  methods: {
    findTotal: function() {
      var total = 0;
      for (let i = 0; i < this.$props.itemsSelected.length; i++) {
        var item = this.$props.itemsSelected[i];
        total += item[1] * item[2];
      }
      this.subtotal = total;
      this.showPrices = true;
    },
    sendOrder: function() {
      var dict = {};
      for (let i = 0; i < this.$props.itemsSelected.length; i++) {
        var item = this.$props.itemsSelected[i];
        dict[item[0]] = item[1];
      }
      database
        .collection("orders")
        .add(dict)
        .then(() => {
          location.reload();
        });
    }
  },
  watch: {
    subtotal: function() {
      this.grandTotal = (this.subtotal * (1 + this.gst)).toFixed(2);
    },
    itemsSelected: function() {
      this.showPrices = false;
    }
  }
};
</script>

<style>
#add_button {
  background-color: pink;
  width: 200px;
  font-size: 25px;
  margin-left: 30px;
}

.basketItems {
  margin-left: 40px;
}

.cost {
  margin-left: 30px;
}
</style>
