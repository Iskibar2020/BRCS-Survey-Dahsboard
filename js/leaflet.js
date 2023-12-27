// Assume you already have the GeoJSON data stored in a variable called geojsonData

// Function to populate the table
function populateTable(data) {
  const tableBody = document.getElementById("table-body");

  data.features.forEach((feature) => {
    const row = document.createElement("tr");
    const featureTypeCell = document.createElement("td");
    const locationCell = document.createElement("td");

    featureTypeCell.textContent = feature.properties.St_Type;
    locationCell.textContent = feature.properties.Village;

    row.appendChild(featureTypeCell);
    row.appendChild(locationCell);

    tableBody.appendChild(row);
  });
}

// Function to create the menu
function createMenu(map, data) {
  var infraMenu = document.getElementById("menu-list");

  // Extract unique values of "Infra" attribute
  var infraTypes = [
    ...new Set(data.features.map((feature) => feature.properties.Infra)),
  ];
  infraTypes.sort();
  // Create menu items
  infraTypes.forEach((infraType) => {
    var menuItem = document.createElement("li");
    var link = document.createElement("a");
    link.href = "#";
    link.textContent = infraType;
    link.addEventListener("click", function () {
      zoomToVillage(map, data, infraType);
    });
    menuItem.appendChild(link);
    infraMenu.appendChild(menuItem);
  });
}

// Function to zoom to a specific village
function zoomToVillage(map, data, infraType) {
  // Find the first feature with the selected "Infra" type
  var targetFeature = data.features.find(
    (feature) => feature.properties.Infra === infraType
  );

  if (targetFeature) {
    var bounds = L.geoJSON(targetFeature).getBounds();
    map.fitBounds(bounds);
  }

  if (targetFeature && targetFeature.properties.uuid) {
    var uuid = targetFeature.properties.uuid;
    // Assuming the file extension is .geojson
    var geoJsonFile = `data/${uuid}.json`;

    // Fetch the GeoJSON file based on the uuid value
    fetch(geoJsonFile)
      .then((response) => response.json())
      .then((geojsonData) => {
        // Use the retrieved GeoJSON data as needed
        console.log("Retrieved GeoJSON data:", geojsonData);
        // Here you can work with the retrieved GeoJSON data
        createTableFromJSON(geojsonData);

        const totalEntries = geojsonData.length;

        const totalBen = `
        <div class="benf">
          <h1>${totalEntries}</h1>
        </div>
      `;
        // Append the card to the grid-item-1 container
        const cardContainer = document.querySelector(".benf");
        cardContainer.innerHTML = totalBen;

        let maleCount = 0;
        let femaleCount = 0;
        geojsonData.forEach((beneficiary) => {
          if (beneficiary["Beneficiary Gender"] === "Male") {
            maleCount++;
          } else if (beneficiary["Beneficiary Gender"] === "Female") {
            femaleCount++;
          }
        });

        let totalAge = 0;
        let totalInc = 0;
        let totalHH = 0;
        geojsonData.forEach((beneficiary) => {
          totalAge += parseInt(beneficiary["Beneficiary Age"]);
          totalInc += parseInt(beneficiary["Household Income"]);
          totalHH += parseInt(beneficiary["Household Size"]);
        });

        const averageAge = totalAge / totalEntries;
        const averageInc = totalInc / totalEntries;
        const averageHH = totalHH / totalEntries;

        const totalMF = `
        <div class="MaleFemale">
          <h4>Male count: ${maleCount}</h4>
          <h4>Female count: ${femaleCount}</h4>
        </div>
      `;
        // Append the card to the grid-item-1 container
        const MF = document.querySelector(".MaleFemale");
        MF.innerHTML = totalMF;

        const avgAg = `
        <div class="AvgAge">
          <h1>${averageAge}</h1>
        </div>
      `;
        // Append the card to the grid-item-1 container
        const AA = document.querySelector(".AvgAge");
        AA.innerHTML = avgAg;

        const AvgInc = `
        <div class="AvgInc">
          <h1>${averageInc}</h1>
        </div>
      `;
        // Append the card to the grid-item-1 container
        const AI = document.querySelector(".AvgInc");
        AI.innerHTML = AvgInc;

        const AvgHH = `
        <div class="AvgHH">
          <h1>${averageHH}</h1>
        </div>
      `;
        // Append the card to the grid-item-1 container
        const AH = document.querySelector(".AvgHH");
        AH.innerHTML = AvgHH;
      })
      .catch((error) => {
        console.error("Error fetching GeoJSON:", error);
      });
  } else {
    console.error("UUID not found or undefined for selected feature.");
  }
}

function createTableFromJSON(data) {
  var tableContainer = document.getElementById("table-container");
  var table = document.createElement("table");

  // Create table header
  var header = table.createTHead();

  var headerRow = header.insertRow();
  Object.keys(data[0]).forEach((key) => {
    var th = document.createElement("th");
    th.textContent = key;
    headerRow.appendChild(th);
  });

  // Create table body
  var body = table.createTBody();
  data.forEach((item) => {
    var row = body.insertRow();
    Object.values(item).forEach((value) => {
      var cell = row.insertCell();
      cell.textContent = value;
    });
  });

  tableContainer.appendChild(table);
}

// Function to create the map
function createMap(data) {
  var map = L.map("map").setView([25.331636097000057, 89.54972177800005], 18);

  L.tileLayer("http://{s}.google.com/vt/lyrs=s,h&x={x}&y={y}&z={z}", {
    maxZoom: 20,
    subdomains: ["mt0", "mt1", "mt2", "mt3"],
  }).addTo(map);

  L.geoJSON(data, {
    onEachFeature: function (feature, layer) {
      var imageName = feature.properties.image_name; // Assuming the property name for the image name is "image_name"
      var imagePath = "Image/" + imageName+".jpg"; //
      console.log(imagePath)

      var popupContent =
        "<b>Infrastructure:</b> " +
        feature.properties.Infra +
        "<br><b>Village:</b> " +
        feature.properties.Village +
        "<br><b>Update Date:</b> " +
        feature.properties.Up_Date;

      if (imageName) {
        popupContent +=
          "<br><img src='" +
          imagePath +
          "' alt='Image' style='max-width: 100%; height: auto; margin-top:5px;'/>";
      }

      layer.bindPopup(popupContent);
    },
  }).addTo(map);

  // Populate the table
  populateTable(data);

  // Create the menu
  createMenu(map, data);
}
