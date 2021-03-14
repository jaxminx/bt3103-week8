<template>
  <div>
    <header id="header">
      <h1>Jasmine's Zi Char</h1>
    </header>
    <ul class="applied_ul_orders">
      <li class="applied_li_orders">
        <router-link to="/" exact>Home</router-link>
      </li>
      <li class="applied_li_orders">
        <router-link to="/orders" exact>Orders</router-link>
      </li>
    </ul>
    <ul class="applied_ul_orders">
      <li class="applied_li_orders" v-for="(order, id) in orders" :key="id">
        <div class="container_items">
          <p class="items_display" v-for="items in order[1]" :key="items">{{items[0]}}: {{items[1]}}</p>
        </div>
        <div class="container_buttons">
          <button class="orders_button" v-bind:id="order[0]" v-on:click="deleteItem($event)">Delete</button>
          <button class="orders_button" v-bind:id="order[0]" v-on:click="route($event)">Modify</button>
        </div>
      </li>
    </ul>
    <Basket id="shoppingBasket" v-bind:itemsSelected="itemsSelected"></Basket>
  </div>
</template>

<script>
import database from "../firebase.js";

export default {
  data() {
    return {
      orders: []
    };
  },
  methods: {
    fetchItems: function() {
      database
        .collection("orders")
        .get()
        .then(snapshot => {
          snapshot.docs.forEach(doc => {
            var curr_order = [];
            Object.keys(doc.data()).forEach(name => {
              curr_order.push([name, doc.data()[name]]);
            });
            console.log([doc.id, curr_order]);
            this.orders.push([doc.id, curr_order]);
          });
        });
    },
    deleteItem: function() {
      let doc_id = event.target.getAttribute("id");
      console.log(doc_id);
      database
        .collection("orders")
        .doc(doc_id)
        .delete()
        .then(() => {
          location.reload();
        });
    },
    route: function() {
      let doc_id = event.target.getAttribute("id");
      this.$router.push({
        name: "modify",
        params: { id: doc_id }
      });
    }
  },
  created: function() {
    this.fetchItems();
  }
};
</script>

<style>
.applied_ul_orders {
  width: 100%;
  margin: 0px;
  padding: 0 5px;
  box-sizing: border-box;
  display: flex;
  flex-wrap: wrap;
  list-style-type: none;
}

.applied_li_orders {
  flex-grow: 1;
  flex-basis: 600px;
  text-align: center;
  padding: 10px;
  border: 1px solid #222;
  margin: 10px;
  position: relative;
}

.items_display {
  margin: 8px 0px;
}

.container_buttons {
  display: inline-block;
  margin-left: 30%;
  position: relative;
  bottom: 120px;
  left: 100px;
}

.container_items {
  display: inline-block;
}

.orders_button {
  font-size: 20px;
  width: 80px;
  height: 32px;
  display: inline-block;
  border-radius: 12px;
}
</style>