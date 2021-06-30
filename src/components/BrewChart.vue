<template>
  <div class="mt-8">
    <canvas :id="datasetLabel"></canvas>
  </div>
</template>

<script>
import Chart from "chart.js";

export default {

  props: ['labels', 'datasetLabel', 'datasetData', 'color'],

  data() {
    return {

      colorTemplates: {
        blue: {background: "rgba(54,73,93,.5)", border: "#36495d"},
        green: {background: "rgba(71, 183,132,.5)", border: "#47b784"}
      },

      // chart object, that chart.js expects 
      chartData: {
        type: "line",
        data: {
          labels: [], // from prop (timestamps)
          datasets: [
            {
              label: "label", // from prop (header)
              data: [], // from prop (gravity/temp)
              backgroundColor: "rgba(71, 183,132,.5)",
              borderColor: "#47b784",
              borderWidth: 1,
            },
          ],
        },
        options: {
          responsive: true,
          lineTension: 1,
          scales: {
            yAxes: [
              {
                ticks: {
                  beginAtZero: false,
                  padding: 25,
                },
              },
            ],
          },
        },
      },
    };
  },
  mounted() {

    // parse props to data
    this.chartData.data.labels = this.labels;
    this.chartData.data.datasets[0].label = this.datasetLabel;
    this.chartData.data.datasets[0].data = this.datasetData;

    // pick color
    if (this.color && this.colorTemplates[this.color]) {
      this.chartData.data.datasets[0].backgroundColor = this.colorTemplates[this.color].background;
      this.chartData.data.datasets[0].borderColor = this.colorTemplates[this.color].border;
    }

    // draw chart
    const ctx = document.getElementById(this.datasetLabel);
    new Chart(ctx, this.chartData);

  },
};
</script>