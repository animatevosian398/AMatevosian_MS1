//retrieves info about 200 rows of foram data
//note most don't have ages associated.
// check API documentation for search here: http://edan.si.edu/openaccess/apidocs/#api-search-search
// Using this data set https://collections.si.edu/search/results.htm?q=Flowers&view=grid&fq=data_source%3A%22Cooper+Hewitt%2C+Smithsonian+Design+Museum%22&fq=online_media_type%3A%22Images%22&media.CC0=true&fq=object_type:%22Embroidery+%28visual+works%29%22

// put your API key here;
const apiKey = "";  



// Search base URL
const searchBaseURL = "https://api.si.edu/openaccess/api/v1.0/search";

// // Search query with URL encoding
// const search = encodeURIComponent(`Foraminifera AND unit_code:"NMNHPALEO"`);
// //JUST CUSHMAN COLLECTION
// // const search = encodeURIComponent(`Cushman AND unit_code:"NMNHPALEO"`);

// let myArray = [];
// let jsonString = '';

// // Function to fetch and process all search data
// async function fetchSearchData(searchTerm) {
//   try {
//     // Initial URL with a small number of rows for testing
//     let initialURL = `${searchBaseURL}?api_key=${apiKey}&q=${searchTerm}`;
//     console.log("Initial fetching from URL:", initialURL);
    
//     let initialResponse = await fetch(initialURL);
//     if (!initialResponse.ok) {
//       throw new Error(`HTTP error! Status: ${initialResponse.status}`);
//     }
    
//     let initialData = await initialResponse.json();
//     console.log("Initial data:", initialData);
    
//     // Calculate number of pages based on total row count
//     // let totalRows = initialData.response.rowCount;

//     let totalRows = Math.min(initialData.response.rowCount, 500); // Limit to 500 rows
//     let pageSize = 100; // This should be larger than totalRows to avoid multiple requests
//     let numberOfQueries = Math.ceil(totalRows / pageSize);
//     console.log("Number of queries required:", numberOfQueries);
    
//     // Fetch all pages of data
//     for (let i = 0; i < numberOfQueries; i++) {
//       let start = i * pageSize;
//       let rows = (i === numberOfQueries - 1) ? totalRows - start : pageSize;
//       let searchAllURL = `${searchBaseURL}?api_key=${apiKey}&q=${searchTerm}&start=${start}&rows=${rows}`;
//       console.log("Fetching data from URL:", searchAllURL);
//       await fetchAllData(searchAllURL);
//     }
    
//     // Convert the array to a JSON string after fetching all data
//     jsonString = JSON.stringify(myArray);
//     console.log("Complete data:", myArray);
    
//   } catch (error) {
//     console.error("Fetch error:", error);
//   }
// }

// // Function to fetch data from a specific URL and add to the array
// async function fetchAllData(url) {
//   try {
//     let response = await fetch(url);
//     if (!response.ok) {
//       throw new Error(`HTTP error! Status: ${response.status}`);
//     }
    
//     let data = await response.json();
//     console.log("Fetched page data:", data);

//     // Process each item in the response
//     data.response.rows.forEach(n => addObject(n));
//   } catch (error) {
//     console.error("Fetch error:", error);
//   }
// }

// // Function to add object data to the array
// function addObject(objectData) {
//   // Destructure the content from the objectData
//   let content = objectData.content || {};
//   let descriptiveNonRepeating = content.descriptiveNonRepeating || {};
//   let freetext = content.freetext || {};
//   let indexedStructured = content.indexedStructured || {};

//   // Extract fields with default values
//   let id = objectData.id || "";
//   let title = descriptiveNonRepeating.title?.content || "";
//   let link = descriptiveNonRepeating.record_link || "";
//   let date_notes = freetext.notes?.find(note => note.label === "Record Last Modified")?.content || "";
//   let unitCode = descriptiveNonRepeating.unit_code || "";
//   let scientificName = indexedStructured.scientific_name?.[0] || "";
//   let taxonomicName = freetext.taxonomicName?.[0]?.content || ""; // Assuming it's present in freetext
//   let taxPhylum = indexedStructured.tax_phylum?.[0] || "";
//   let geoAgeEra = indexedStructured['geo_age-era']?.[0] || "";
//   let geoAgeSystem = indexedStructured['geo_age-system']?.[0] || "";
//   let geoAgeSeries = indexedStructured['geo_age-series']?.[0] || "";
//   let taxKingdom = indexedStructured.tax_kingdom?.[0] || "";
//   let topic = indexedStructured.topic?.[0] || "";
//   let guid = descriptiveNonRepeating.guid || "";
//   let place = indexedStructured.place?.[0] || "";
//   let onlineMediaType = content.online_media_type || [];
//   let images = onlineMediaType.includes("Images") ? "Yes" : "No";
//   // Extract the USNM number from freetext.identifier
//   let usnmNumberEntry = freetext.identifier?.find(id => id.label === "USNM Number");
//   let usnmNumber = usnmNumberEntry ? usnmNumberEntry.content : "";
//   let usnmNumberDigits = usnmNumber.replace(/\D/g, ""); // Extract only digits
  
//   // Debugging logs
//   console.log("Fetched Data:", objectData);
//   console.log("Processed Data:", {
//     id,
//     usnmNumber: usnmNumberDigits,
//     title,
//     link,
//     date_notes,
//     unitCode,
//     scientificName,
//     taxonomicName,
//     taxPhylum,
//     geoAgeEra,
//     geoAgeSystem,
//     geoAgeSeries,
//     taxKingdom,
//     topic,
//     place,
//     guid,
//     images,
//   });

//   // Push the processed data to your array
//   myArray.push({
//     id,
//     usnmNumber: usnmNumberDigits,
//     title,
//     link,
//     place,
//     unitCode,
//     scientificName,
//     taxonomicName,
//     taxPhylum,
//     geoAgeEra,
//     geoAgeSystem,
//     geoAgeSeries,
//     taxKingdom,
//     topic,
//     date_notes,
//     guid,
//     images,
//   });
// }

// // Start fetching data
// fetchSearchData(search);

// // Function to filter data and create a list of items with geo_age_era
// function filterAndDisplayData() {
//   let filteredData = myArray;
//   // Filter the data to only include items with geo_age_era
//   // let filteredData = myArray.filter(item => item.geoAgeEra);

//   // Get the list element from the HTML
//   const listElement = document.getElementById('data-list');

//   // Clear any existing list items
//   listElement.innerHTML = '';

//   // Create list items for each filtered data entry
//   filteredData.forEach(item => {
//     let listItem = document.createElement('li');
//     listItem.textContent = `ID: ${item.id}, Era: ${item.geoAgeEra}`;
//     listElement.appendChild(listItem);
//   });
// }

// // Call the function to display data after fetching is complete
// fetchSearchData(search).then(() => {
//   filterAndDisplayData();
// });

// // Function to filter data and create a table with images and additional columns
// function filterAndDisplayData() {
//   // Filter the data to only include items with geo_age_era
//   let filteredData = myArray.filter(item => item.geoAgeEra);

//   // Get the table body element from the HTML
//   const tableBody = document.querySelector('#data-table tbody');

//   // Clear any existing rows
//   tableBody.innerHTML = '';

//   // Create table rows for each filtered data entry
//   filteredData.forEach(item => {
//     let row = document.createElement('tr');

//     // Create cells for each piece of data
//     let idCell = document.createElement('td');
//     idCell.textContent = item.id;

//     let titleCell = document.createElement('td');
//     titleCell.textContent = item.title;

//     let imageCell = document.createElement('td');
//     let image = document.createElement('img');
//     image.src = item.images ? item.images : 'default-image-url'; // Use a default image URL if no image is available
//     image.alt = item.title;
//     image.style.width = '100px'; // Adjust the image size as needed
//     image.style.height = 'auto';
//     imageCell.appendChild(image);

//     let geoAgeEraCell = document.createElement('td');
//     geoAgeEraCell.textContent = item.geoAgeEra;

//     let geoAgeSystemCell = document.createElement('td');
//     geoAgeSystemCell.textContent = item.geoAgeSystem;

//     let geoAgeSeriesCell = document.createElement('td');
//     geoAgeSeriesCell.textContent = item.geoAgeSeries;

//     let linkCell = document.createElement('td');
//     let link = document.createElement('a');
//     link.href = item.link;
//     link.textContent = 'View Record';
//     link.target = '_blank'; // Open the link in a new tab
//     linkCell.appendChild(link);

//     // Append cells to the row
//     row.appendChild(idCell);
//     row.appendChild(titleCell);
//     row.appendChild(imageCell);
//     row.appendChild(geoAgeEraCell);
//     row.appendChild(geoAgeSystemCell);
//     row.appendChild(geoAgeSeriesCell);
//     row.appendChild(linkCell);

//     // Append row to the table body
//     tableBody.appendChild(row);
//   });
// }

// // Start fetching data and display it after fetching is complete
// fetchSearchData(search).then(() => {
//   filterAndDisplayData();
// });

const search = encodeURIComponent(`Foraminifera AND unit_code:"NMNHPALEO"`);

let myArray = [];
let jsonString = '';

// Function to fetch and process all search data
async function fetchSearchData(searchTerm) {
  try {
    // Initial URL with a small number of rows for testing
    let initialURL = `${searchBaseURL}?api_key=${apiKey}&q=${searchTerm}`;
    console.log("Initial fetching from URL:", initialURL);
    
    let initialResponse = await fetch(initialURL);
    if (!initialResponse.ok) {
      throw new Error(`HTTP error! Status: ${initialResponse.status}`);
    }
    
    let initialData = await initialResponse.json();
    console.log("Initial data:", initialData);
    
    // Limit to 500 rows for performance reasons
    let totalRows = Math.min(initialData.response.rowCount, 500); 
    let pageSize = 100; 
    let numberOfQueries = Math.ceil(totalRows / pageSize);
    console.log("Number of queries required:", numberOfQueries);
    
    // Fetch all pages of data
    for (let i = 0; i < numberOfQueries; i++) {
      let start = i * pageSize;
      let rows = (i === numberOfQueries - 1) ? totalRows - start : pageSize;
      let searchAllURL = `${searchBaseURL}?api_key=${apiKey}&q=${searchTerm}&start=${start}&rows=${rows}`;
      console.log("Fetching data from URL:", searchAllURL);
      await fetchAllData(searchAllURL);
    }
    
    // Convert the array to a JSON string after fetching all data
    jsonString = JSON.stringify(myArray);
    console.log("Complete data:", myArray);
    
  } catch (error) {
    console.error("Fetch error:", error);
  }
}

// Function to fetch data from a specific URL and add to the array
async function fetchAllData(url) {
  try {
    let response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    
    let data = await response.json();
    console.log("Fetched page data:", data);

    // Process each item in the response
    data.response.rows.forEach(n => addObject(n));
  } catch (error) {
    console.error("Fetch error:", error);
  }
}

// Function to add object data to the array
function addObject(objectData) {
  let content = objectData.content || {};
  let descriptiveNonRepeating = content.descriptiveNonRepeating || {};
  let freetext = content.freetext || {};
  let indexedStructured = content.indexedStructured || {};

  let id = objectData.id || "";
  let title = descriptiveNonRepeating.title?.content || "";
  let link = descriptiveNonRepeating.record_link || "";
  let date_notes = freetext.notes?.find(note => note.label === "Record Last Modified")?.content || "";
  let unitCode = descriptiveNonRepeating.unit_code || "";
  let scientificName = indexedStructured.scientific_name?.[0] || "";
  let taxPhylum = indexedStructured.tax_phylum?.[0] || "";
  let geoAgeEra = indexedStructured['geo_age-era']?.[0] || "";
  let geoAgeSystem = indexedStructured['geo_age-system']?.[0] || "";
  let geoAgeSeries = indexedStructured['geo_age-series']?.[0] || "";
  let taxKingdom = indexedStructured.tax_kingdom?.[0] || "";
  let topic = indexedStructured.topic?.[0] || "";
  let guid = descriptiveNonRepeating.guid || "";
  let place = indexedStructured.place?.[0] || "";

  // Extract the USNM number from freetext.identifier
  let usnmNumberEntry = freetext.identifier?.find(id => id.label === "USNM Number");
  let usnmNumber = usnmNumberEntry ? usnmNumberEntry.content : "";
  let usnmNumberDigits = usnmNumber.replace(/\D/g, ""); // Extract only digits

  // Handle media (if available)
  let images = descriptiveNonRepeating.online_media?.media?.[0]?.thumbnail || "";

  // Push the processed data to your array
  myArray.push({
    id,
    usnmNumber: usnmNumberDigits,
    title,
    link,
    place,
    unitCode,
    scientificName,
    taxPhylum,
    geoAgeEra,
    geoAgeSystem,
    geoAgeSeries,
    taxKingdom,
    topic,
    date_notes,
    guid,
    images,
  });
}

// Function to filter data and create a table with images and additional columns
function filterAndDisplayData() {
  let filteredData = myArray.filter(item => item.geoAgeEra);

  const tableBody = document.querySelector('#data-table tbody');
  tableBody.innerHTML = '';  // Clear any existing rows

  // Create table rows for each filtered data entry
  filteredData.forEach(item => {
    let row = document.createElement('tr');

    let idCell = document.createElement('td');
    idCell.textContent = item.id;

    let titleCell = document.createElement('td');
    titleCell.textContent = item.title;

    let imageCell = document.createElement('td');
    let image = document.createElement('img');
    image.src = item.images ? item.images : 'default-image-url';  // Default if no image
    image.alt = item.title;
    image.style.width = '100px';  // Adjust the image size
    imageCell.appendChild(image);

    let geoAgeEraCell = document.createElement('td');
    geoAgeEraCell.textContent = item.geoAgeEra;

    let geoAgeSystemCell = document.createElement('td');
    geoAgeSystemCell.textContent = item.geoAgeSystem;

    let geoAgeSeriesCell = document.createElement('td');
    geoAgeSeriesCell.textContent = item.geoAgeSeries;

    let linkCell = document.createElement('td');
    let link = document.createElement('a');
    link.href = item.link;
    link.textContent = 'View Record';
    link.target = '_blank';  // Open in new tab
    linkCell.appendChild(link);

    // Append cells to the row
    row.appendChild(idCell);
    row.appendChild(titleCell);
    row.appendChild(imageCell);
    row.appendChild(geoAgeEraCell);
    row.appendChild(geoAgeSystemCell);
    row.appendChild(geoAgeSeriesCell);
    row.appendChild(linkCell);

    // Append row to the table body
    tableBody.appendChild(row);
  });
}

// Start fetching data and display it after fetching is complete
fetchSearchData(search).then(() => {
  filterAndDisplayData();
});
