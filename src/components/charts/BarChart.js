import { Bar } from "vue-chartjs";
import database from "../../firebase.js";

export default {
  extends: Bar,
  data: function() {
    return {
      datacollection: {
        labels: [],
        datasets: [
          {
            label: "Dish Name",
            backgroundColor: [
              "#3E95CD",
              "#8E5EA2",
              "#3CBA9F",
              "#E8C3B9",
              "#C45850",
              "#F5F5DC",
            ],
            data: [],
          },
        ],
      },
      options: {
        legend: { display: false },
        title: {
          display: true,
          text: "Total Number of each dish",
        },
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          yAxes: [
            {
              ticks: {
                min: 0, // Minimum
              },
              display: true,
            },
          ],
        },
      },
    };
  },
  methods: {
    fetchItems: function() {
      var dict = {};
      database
        .collection("orders")
        .get()
        .then((querySnapShot) => {
          querySnapShot.forEach((doc) => {
            Object.keys(doc.data()).forEach((name) => {
              if (!(name in dict)) {
                dict[name] = 0;
              }
              var quantity = doc.data()[name];
              dict[name] += parseInt(quantity);
            });
          });
          for (const [key, value] of Object.entries(dict)) {
            this.datacollection.labels.push(key);
            this.datacollection.datasets[0].data.push(value);
          }
          console.log(this.datacollection.datasets[0]);
          this.renderChart(this.datacollection, this.options);
        });
    },
  },

  created() {
    this.fetchItems();
    this.renderChart(this.datacollection, this.options);
  },
};
