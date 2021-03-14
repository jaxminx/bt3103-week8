<template>
  <div>
    <header id="header">
      <h1>Jasmine's Zi Char</h1>
    </header>

    <div class="all_items" v-for="items in datapacket" :key="items">
      <p>{{items[0]}}: {{items[1]}}</p>
      <input v-bind:id="items[0]" placeholder="0" type="number" min="0" />
    </div>
    <button id="update_button" v-on:click="updateOrder()">Update Order</button>
  </div>
</template>

<script>
import database from "../firebase.js";

export default {
  data() {
    return {
      datapacket: []
    };
  },
  props: {},
  methods: {
    fetchItems: function() {
      database
        .collection("orders")
        .doc(this.$route.params.id)
        .get()
        .then(doc => {
          Object.keys(doc.data()).forEach(name => {
            console.log(name)
            this.datapacket.push([name, doc.data()[name]]);
          });
        });
    },
    updateOrder: function() {
      //console.log(this.datapacket);
      var new_data = {};
      for (let i = 0; i < this.datapacket.length; i++) {
        var item = this.datapacket[i];
        new_data[item[0]] = document.getElementById(item[0]).value;
      }
      database
        .collection("orders")
        .doc(this.$route.params.id)
        .update(new_data)
        .then(() => {
          this.$router.replace({ name: "orders" });
        });
    }
  },
  created: function() {
    this.fetchItems();
  }
};
</script>

<style>
h1 {
  margin-top: 0;
  margin-bottom: 0.67em;
  padding: 0.6em;
}

#header {
  background-color: blue;
  font-size: 40px;
  text-align: center;
  margin: 0;
}

#update_button {
  background-color: pink;
  width: 180px;
  font-size: 25px;
  margin-top: 25px;
}

.all_items {
  font-size: 20px;
}
</style>