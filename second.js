const clock = document.getElementById("clock");
const banner = document.getElementById("banner");
const span = document.querySelector("span");

// Clock Logic
setInterval(function () {
  let date = new Date();
  clock.innerHTML = `${date.toLocaleTimeString()} <br> ${date
    .toLocaleDateString("en-IN", {
      weekday: "short",
      month: "short",
      year: "2-digit",
      day: "numeric",
    })
    .replace(/,/g, "")}`;
}, 1000);

// Geolocation and State Finder
navigator.geolocation.getCurrentPosition(
  async (position) => {
    const lat = position.coords.latitude;
    const long = position.coords.longitude;

    // console.log(`Latitude: ${lat}, Longitude: ${long}`);

    try {
      const response = await fetch(
        `https://geo.geocodingapi.workers.dev/find-state?lat=${lat}&long=${long}`
      );
      // console.log(`Fetch response status: ${response.status}`);

      if (response.ok) {
        const data = await response.json();
        // console.log("Fetch response data:", data);

        // Extract location from the API response
        const location = data.location || "Unknown Location";

        // Update the span with the full location
        span.textContent = location; // Display only the location
      } else {
        span.textContent = `Error fetching data: ${response.statusText}`;
        console.error(
          `Fetch response status: ${response.status}, status text: ${response.statusText}`
        );
      }
    } catch (error) {
      span.textContent = `Error fetching data: ${error.message}`;
      console.error("Fetch error:", error);
    }
  },
  (error) => {
    span.textContent = `Error getting location: ${error.message}`;
    console.error("Geolocation error:", error);
  }
);
