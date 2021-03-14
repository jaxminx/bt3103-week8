<template>
  <div>
    <button v-on:click="decrement()">-</button>
    <span>{{counter}}</span>
    <button v-on:click="increment()">+</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      counter: 0
    };
  },
  methods: {
    increment: function() {
      if (this.counter == 10) {
        alert("You cannot buy more than 10 items");
      } else {
        this.counter++;
      }
      this.$emit("counter", this.item, this.counter);
    },
    decrement: function() {
      if (this.counter > 0) {
        this.counter--;
      }
      this.$emit("counter", this.item, this.counter);
    }
  },
  props: ["item"]
};
</script>

<style>
button {
  background-color: pink;
  border-radius: 8px;
  height: 50px;
  width: 50px;
  font-size: 30px;
  text-align: center;
}

span {
  font-size: 30px;
  margin: 0 10px;
}
</style>
