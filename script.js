
const demo = document.getElementById("current-image-container");
const history = document.getElementById("search-history");

async function fetchData(url) {
  try {
    const response = await fetch(url);
    if (response.ok) {
      const data = await response.json(); // Parse response as JSON
      return data; // Return the fetched data
    } else {
      throw new Error("Network response was not ok");
    }
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}

function validateDate(dateString) {
  const datePattern = /^\d{4}-\d{2}-\d{2}$/;
  return datePattern.test(dateString);
}

const searchForm = document.getElementById("search-form");
const searchInput = document.getElementById("search-input");

// Handle form submission
searchForm.addEventListener("submit", async function(event) {
  event.preventDefault(); // Prevent default form submission behavior

  const searchDate = searchInput.value;

//   Validate date format
  if (!validateDate(searchDate)) {
    return; // Exit the function if validation fails
  }

  const your_api_key = "Ee8klyUO8pLN3S29Auq9bjRU6Uop4aGFTLgGyHCp";
  const link = `https://api.nasa.gov/planetary/apod?date=${searchDate}&api_key=${your_api_key}`;
  const url = link.toString();

  try {
    const data = await fetchData(url);
    demo.innerHTML = `
    <div class="left col">
        <img src="${data.url}" alt="${data.title}">           
</div>
<div class="center col">
    <h1>${data.title}</h1>
      <p>${data.explanation}</p>
      </div>`;

  } catch (error) {
    console.error("Error fetching data:", error);
  }
});

window.addEventListener("load", async () => {
  const defaultDate = "2023-12-30";
  const your_api_key = "Ee8klyUO8pLN3S29Auq9bjRU6Uop4aGFTLgGyHCp";
  const link = `https://api.nasa.gov/planetary/apod?date=${defaultDate}&api_key=${your_api_key}`;
  const url = link.toString();

  try {
    const data = await fetchData(url);
    demo.innerHTML = `
    <div  class="left col">
        <img src="${data.url}" alt="${data.title}">           
</div>
<div class="center col">
    <h1>${data.title}</h1>
      <p>${data.explanation}</p>
      </div>`;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
});



