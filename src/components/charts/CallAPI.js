import { Line } from "vue-chartjs";
import axios from "axios";

export default {
  extends: Line,
  data: function() {
    return {
      datacollection: {
        labels: [],
        //backgroundColor: ["red", "blue", "purple", "blue", "pink", "green"],
        datasets: [
          {
            data: [],
            fill: false,
            label: "west",
            borderColor: "#FA0D02",
          },
          {
            data: [],
            fill: false,
            label: "national",
            borderColor: "#0E90CB",
          },
          {
            data: [],
            fill: false,
            label: "east",
            borderColor: "#576299",
          },
          {
            data: [],
            fill: false,
            label: "central",
            borderColor: "#109DC6",
          },
          {
            data: [],
            fill: false,
            label: "south",
            borderColor: "#A6879D",
          },
          {
            data: [],
            fill: false,
            label: "north",
            borderColor: "#9BF3AF",
          },
        ],
      },
      options: {
        legend: { display: true },
        title: {
          display: true,
          text: "PSI Twenty Four Hourly (By Region)",
        },
        responsive: true,
        maintainAspectRatio: false,
      },
    };
  },
  methods: {
    fetchItems: function() {
      axios
        .get(`https://api.data.gov.sg/v1/environment/psi?date=2021-02-23`)
        .then((response) => {
          response.data["items"].forEach((data) => {
            this.datacollection.labels.push(data["timestamp"]);
            var psi = data["readings"]["psi_twenty_four_hourly"];
            this.datacollection.datasets[0].data.push(psi["west"]);
            this.datacollection.datasets[1].data.push(psi["national"]);
            this.datacollection.datasets[2].data.push(psi["east"]);
            this.datacollection.datasets[3].data.push(psi["central"]);
            this.datacollection.datasets[4].data.push(psi["south"]);
            this.datacollection.datasets[5].data.push(psi["north"]);
          });
          this.renderChart(this.datacollection, this.options);
        });
    },
  },
  created() {
    this.fetchItems();
  },
};
