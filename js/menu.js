function openNav() {
  if (window.innerWidth > 768) {
    document.getElementById("mySidebar").style.width = "300px";
    document.getElementById("main").style.marginLeft = "200px";
    document.querySelector(".open-btn").style.display = "none";
    document.querySelector(".leaflet-top").style.display = "none";
    document.querySelector(".leaflet-left").style.display = "none";
    // Hide the map
  } else {
    document.getElementById("mySidebar").style.width = "100%";
    document.getElementById("main").style.marginLeft = "100%";
    document.getElementById("map").style.display = "none"; // Hide the map
    document.querySelector(".open-btn").style.display = "none";
  }
}

function closeNav() {
  document.getElementById("mySidebar").style.width = "0";
  document.getElementById("main").style.marginLeft = "0";
  document.getElementById("map").style.display = "block"; // Show the map
  document.querySelector(".open-btn").style.display = "block";
  document.querySelector(".leaflet-top").style.display = "block";
  document.querySelector(".leaflet-left").style.display = "block";
}
