<template>
  <div>
    <header id="header" style="background-color: #92A8D1; color: white">
      <h1>Line Chart</h1>
    </header>
    <chart></chart>
  </div>
</template>



<script>
import Chart from "./charts/CallAPI.js";

export default {
  components: {
    Chart
  }
};
</script>

<style>
</style>


<!--
THIS IS TO DISPLAY THE BAR CHART:

<template>
  <div>
    <header id="header" style="background-color: #92A8D1; color: white"
>
      <h1>Line Chart</h1>
    </header>
    <chart></chart>
  </div>
</template>



<script>
import Chart from "./charts/CallAPI.js";

export default {
  components: {
    Chart
  }
};
</script>

<style>
</style>

-->
