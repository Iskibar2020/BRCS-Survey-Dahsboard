// Function to handle link click events
var filename = "";
function handleLinkClick(event) {
  // Prevent the default link behavior (e.g., navigating to a new page)
  event.preventDefault();

  // Get the clicked link element
  const clickedLink = event.currentTarget;

  // Get the label (textContent) of the clicked link
  const activeLinkLabel = clickedLink.textContent;

  // Display the active link label
  const activeLinkLabelElement = document.getElementById("activeLinkLabel");
  activeLinkLabelElement.textContent = "Selected: " + activeLinkLabel;

  filename = activeLinkLabel;

  // Use the activeLinkLabel as a variable within your script
  // Example: You can use activeLinkLabel here as needed
  console.log("Active Link Label as a variable:", activeLinkLabel);
}

// Add click event listeners to all links
const links = document.querySelectorAll(".sidebar ul li a");
links.forEach((link) => {
  link.addEventListener("click", handleLinkClick);
});

// Fetch GeoJSON data and calculate the total number of entries
fetch("data/Strucure.geojson")
  .then((response) => response.json())
  .then((data) => {
    // Calculate the total number of entries
    const totalEntries = data.features.length;

    // Create an HTML card with the total number of entries
    const cardHtml = `
        <div class="tne">
          <h1>${totalEntries}</h1>
        </div>
      `;

    // Append the card to the grid-item-1 container
    const cardContainer = document.querySelector(".tne");
    cardContainer.innerHTML = cardHtml;
  })
  .catch((error) => {
    console.error("Error fetching GeoJSON data:", error);
  });

// Fetch GeoJSON data and calculate the total number of entries for "Village" data
fetch("data/Strucure.geojson")
  .then((response) => response.json())
  .then((data) => {
    // Calculate the total number of entries
    const uniqueVillages = new Set();

    // Filter the data to count the number of "Formal" entries
    data.features.forEach((feature) => {
      if (feature.properties && feature.properties.Village) {
        uniqueVillages.add(feature.properties.Village);
      }
    });

    // Calculate the number of "Formal" entries
    const countUniqueVillages = uniqueVillages.size;
    
    // Create an HTML card with the number of "Formal" entries
    const numFormalEntriesCardHtml = `
        <div class="formal">
          <h1>${countUniqueVillages}</h1>
        </div>
      `;
    const cardContainer = document.querySelector(".village-count");
    cardContainer.innerHTML = numFormalEntriesCardHtml;
  })
  .catch((error) => {
    console.error("Error fetching GeoJSON data:", error);
  });

// Fetch GeoJSON data and calculate the total number of entries for "Informal" type
fetch("data/Strucure.geojson")
  .then((response) => response.json())
  .then((data) => {
    // Calculate the total number of entries
    const uniqueVillages = new Set();

    // Filter the data to count the number of "Formal" entries
    const sumOfAreas = data.features.reduce((sum, feature) => {
      const area= (feature.properties.SHAPE_Area || 0); // Ensure SHAPE_Area exists and is a number
      return sum + (parseFloat(area) * 1000000 || 0); // Multiply by 1,000,000 and add to sum
    }, 0);

    const roundedSum = Math.round(sumOfAreas * 100) / 100;

    // Create an HTML card with the number of "Formal" entries
    const totalArea = `
        <div class="formal">
          <h1>${roundedSum}</h1>
        </div>
      `;
    const cardContainer = document.querySelector(".total_area");
    cardContainer.innerHTML = totalArea;
  })
  .catch((error) => {
    console.error("Error fetching GeoJSON data:", error);
  });

// Fetch GeoJSON data and display the total number of entries for "Comments" values
fetch("data/Strucure.geojson")
  .then((response) => response.json())
  .then((data) => {
    // Calculate the total number of entries
    const commentsValues = data.features.map(
      (feature) => feature.properties.Comments_
    );

    // Create an HTML card with the total number of entries
    const cardHtml = `
        <div class="tne">
          <h1>${commentsValues.length}</h1>
        </div>
      `;

    // Append the card to the grid-item-1 container
    const cardContainer = document.querySelector(".tne");
    cardContainer.innerHTML = cardHtml;
  })
  .catch((error) => {
    console.error("Error fetching GeoJSON data:", error);
  });

// Fetch the JSON data and create the Line Chart
// Specify the hosted URL of your GeoJSON file here
const geoJsonUrl = "data/Strucure.geojson"; // Update with the actual hosted URL

fetch(geoJsonUrl)
  .then((response) => response.json())
  .then((data) => {
    createLineChart(data.features);
  })
  .catch((error) => {
    console.error("Error fetching GeoJSON data:", error);
  });
