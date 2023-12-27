fetch(`data/Strucure.geojson`)
  .then((response) => response.json())
  .then((data) => {
    // Store the GeoJSON data in a variable
    const geojsonData = data;

    // Create the map using the data
    createMap(geojsonData);

    // Populate the table using the data
    populateTable(geojsonData);

    // Extract the "Data_Colle" attribute values
    const dataColleValues = geojsonData.features.map(
      (feature) => feature.properties.St_Type
    );

    // Count the occurrences of each "Data_Colle" value
    const dataColleCounts = {};
    dataColleValues.forEach((value) => {
      dataColleCounts[value] = (dataColleCounts[value] || 0) + 1;
    });

    // Extract unique "Data_Colle" values and their counts
    const uniqueDataColle = Object.keys(dataColleCounts);
    const dataColleCountsArray = Object.values(dataColleCounts);

    // Create a pie chart
    const ctxPie = document.getElementById("pieChart").getContext("2d");
    const pieChart = new Chart(ctxPie, {
      type: "doughnut",
      data: {
        labels: uniqueDataColle,
        datasets: [
          {
            data: dataColleCountsArray,
            backgroundColor: [
              "#1984c5",
              "#22a7f0",
              "#63bff0",
              "#a7d5ed",
              "#e2e2e2",
              "#e1a692",
              "#de6e56",
              "#e14b31",
              "#c23728",
            ],
          },
        ],
      },
      options: {
        plugins: {
          legend: {
            position: "right",
          },
          tooltip: {
            callbacks: {
              label: function (context) {
                let label = context.label || "";
                if (label) {
                  label += ": ";
                }
                label += Math.round(context.parsed) + "%";
                return label;
              },
            },
          },
        },
        responsive: true,
        maintainAspectRatio: false,
        width: 200,
        height: 200,
      },
    });

    // Generate the legend and append it to the chart
    const legendPie = document.getElementById("chart-legend");
    uniqueDataColle.forEach((dataColle, index) => {
      const legendItem = document.createElement("div");
      legendItem.classList.add("legend-item");
      legendItem.innerHTML = `
            <div class="legend-color-box" style="background-color:${pieChart.data.datasets[0].backgroundColor[index]}"></div>
            <div class="legend-label">${dataColle}</div>
          `;
      legendPie.appendChild(legendItem);
    });
  })
  .catch((error) => {
    console.error("Error loading GeoJSON data:", error);
  });

// Fetch GeoJSON data for the column chart
fetch("data/Strucure.geojson")
  .then((response) => response.json())
  .then((data) => {
    const geojsonData = data;

    // Extract the "Type_" attribute values
    const typeValues = geojsonData.features.map(
      (feature) => feature.properties.Village
    );

    // Count the occurrences of each "Type_" value
    const typeCounts = {};
    typeValues.forEach((value) => {
      typeCounts[value] = (typeCounts[value] || 0) + 1;
    });

    // Extract unique "Type_" values and their counts
    const uniqueTypes = Object.keys(typeCounts);
    const typeCountsArray = Object.values(typeCounts);

    // Create a column chart
    const ctxColumn = document.getElementById("columnChart").getContext("2d");
    const columnChart = new Chart(ctxColumn, {
      type: "bar",
      data: {
        labels: uniqueTypes,
        datasets: [
          {
            label: "Dataset 1",
            data: typeCountsArray,
            backgroundColor: [
              "#1984c5",
              "#22a7f0",
              "#63bff0",
              "#a7d5ed",
              "#e2e2e2",
              "#e1a692",
              "#de6e56",
              "#e14b31",
              "#c23728",
            ],
          },
        ],
      },
      options: {
        plugins: {
          legend: {
            display: false,
            position: "bottom",
          },
        },
        responsive: true,
        maintainAspectRatio: false,
        width: 200,
        height: 200,
      },
    });

    // Generate the custom legend
    const legendColumn = document.querySelector(".legend");
    uniqueTypes.forEach((type, index) => {
      const legendItem = document.createElement("div");
      legendItem.classList.add("legend-item");
      legendItem.innerHTML = `
            <div class="legend-color-box" style="background-color:${columnChart.data.datasets[0].backgroundColor[index]}"></div>
            <div class="legend-label">${type}</div>
          `;
      legendColumn.appendChild(legendItem);
    });
  })
  .catch((error) => {
    console.error("Error fetching GeoJSON data:", error);
  });

// Function to create a Line Chart for "F_Locati_3"
function createLineChart(data) {
  const lineChartCanvas = document.getElementById("lineChart").getContext("2d");

  const labels = data.map((feature) => feature.properties.F_Locati_3);
  const values = data.map((feature) =>
    parseFloat(feature.properties.F_Locati_3)
  );

  new Chart(lineChartCanvas, {
    type: "line",
    data: {
      labels: labels,
      datasets: [
        {
          label: "Accuracy Level (m)",
          data: values,
          fill: false,
          borderColor: "rgb(75, 192, 192)",
          tension: 0.1,
        },
      ],
    },
    options: {
      scales: {
        x: {
          type: "linear",
          position: "bottom",
        },
        y: {
          beginAtZero: true,
        },
      },
    },
  });
}
