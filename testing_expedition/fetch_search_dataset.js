// Smithsonian API example code
// check API documentation for search here: http://edan.si.edu/openaccess/apidocs/#api-search-search
// Using this data set https://collections.si.edu/search/results.htm?q=Flowers&view=grid&fq=data_source%3A%22Cooper+Hewitt%2C+Smithsonian+Design+Museum%22&fq=online_media_type%3A%22Images%22&media.CC0=true&fq=object_type:%22Embroidery+%28visual+works%29%22

// put your API key here;
const apiKey = "tebnOCC4XmUJaQs1JIIJPWjTwOCe9EF4u8MREr9O";  

// search base URL
const searchBaseURL = "https://api.si.edu/openaccess/api/v1.0/search";

// constructing the initial search query
// const search = encodeURIComponent(`"U.S. Exploring Expedition"`);
const search = encodeURIComponent(`"U.S. Geological Exploration of the 40th Parallel"`);


// array that we will write into
let myArray = [];

// string that will hold the stringified JSON data
let jsonString = '';

// search: fetches an array of terms based on term category
function fetchSearchData(searchTerm) {
    let url = searchBaseURL + "?api_key=" + apiKey + "&q=" + searchTerm;
    console.log(url);
    window
    .fetch(url)
    .then(res => res.json())
    .then(data => {
      console.log(data);
      
      // constructing search queries to get all the rows of data
      let pageSize = 1000;
      let numberOfQueries = Math.ceil(data.response.rowCount / pageSize);
      console.log(numberOfQueries);
      for (let i = 0; i < numberOfQueries; i++) {
        // making sure that our last query calls for the exact number of rows
        let searchAllURL;
        if (i == (numberOfQueries - 1)) {
          searchAllURL = url + `&start=${i * pageSize}&rows=${data.response.rowCount - (i * pageSize)}`;
        } else {
          searchAllURL = url + `&start=${i * pageSize}&rows=${pageSize}`;
        }
        console.log(searchAllURL);
        fetchAllData(searchAllURL);
      }
    })
    .catch(error => {
      console.log(error);
    });
}

// fetching all the data listed under our search and pushing them all into our custom array
function fetchAllData(url) {
  window
  .fetch(url)
  .then(res => res.json())
  .then(data => {
    console.log(data);

    data.response.rows.forEach(function(n) {
      addObject(n);
    });
    jsonString += JSON.stringify(myArray);
    console.log(myArray);
    
    // Display the table after the array is populated
    if (myArray.length > 0) {
      displayTable();
    }
  })
  .catch(error => {
    console.log(error);
  });
}

function addObject(objectData) {  
  // Check if place exists, otherwise assign an empty string
  let currentPlace = "";
  if (objectData.content.indexedStructured.place) {
    currentPlace = objectData.content.indexedStructured.place[0];
  }

  // Check if object_type exists, otherwise assign an empty array
  let objectType = [];
  if (objectData.content.indexedStructured.object_type) {
    objectType = objectData.content.indexedStructured.object_type;
  }

  // Add extracted data to the array
  myArray.push({
    id: objectData.id,
    title: objectData.title,
    link: objectData.content.descriptiveNonRepeating.record_link,
    place: currentPlace,
    unit_code: objectData.unitCode, // Extract the unit code
    type: objectData.type, // Extract the type
    topic: objectData.content.indexedStructured.topic ? objectData.content.indexedStructured.topic[0] : "", // Extract the first topic
    object_type: objectType // Add object type array
  });
}

fetchSearchData(search);

// Function to display the table
function displayTable() {
  // Remove any existing table if present
  const existingTable = document.querySelector('table');
  if (existingTable) {
    existingTable.remove();
  }

  // Create a table element
  const table = document.createElement('table');
  table.border = '1'; // Add borders to the table

  // Create the table header
  const headerRow = document.createElement('tr');
  const headers = ['Expedition Name', 'Object Type', 'Unit Code', 'Link'];
  
  headers.forEach(headerText => {
    const header = document.createElement('th');
    header.textContent = headerText;
    headerRow.appendChild(header);
  });
  
  table.appendChild(headerRow);

  // Loop through the array and create rows for each object
  myArray.forEach(obj => {
    const row = document.createElement('tr');

    // Expedition Name (Hardcoded)
    const expeditionNameCell = document.createElement('td');
    expeditionNameCell.textContent = (decodeURIComponent(search)); 
    row.appendChild(expeditionNameCell);

    // Object Type
    const objectTypeCell = document.createElement('td');
    objectTypeCell.textContent = obj.object_type.join(', '); // Join array items by comma
    row.appendChild(objectTypeCell);

    // Unit Code
    const unitCodeCell = document.createElement('td');
    unitCodeCell.textContent = obj.unit_code;
    row.appendChild(unitCodeCell);

    // Link
    const linkCell = document.createElement('td');
    const link = document.createElement('a');
    link.href = obj.link; // Use the link from the API
    link.textContent = 'View Object'; // The text displayed for the link
    link.target = '_blank'; // Open link in a new tab
    linkCell.appendChild(link);
    row.appendChild(linkCell);

    // Append the row to the table
    table.appendChild(row);
  });

  // Append the table to the body or a specific div
  document.body.appendChild(table);
}
