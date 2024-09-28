// Smithsonian API example code
// check API documentation for search here: http://edan.si.edu/openaccess/apidocs/#api-search-search
// Using this data set https://collections.si.edu/search/results.htm?q=Flowers&view=grid&fq=data_source%3A%22Cooper+Hewitt%2C+Smithsonian+Design+Museum%22&fq=online_media_type%3A%22Images%22&media.CC0=true&fq=object_type:%22Embroidery+%28visual+works%29%22

// put your API key here;
const apiKey = "tebnOCC4XmUJaQs1JIIJPWjTwOCe9EF4u8MREr9O";


// search base URL
const searchBaseURL = "https://api.si.edu/openaccess/api/v1.0/search";

// const search = encodeURIComponent(`"expedition" AND unit_code:"NMNHANTHRO" OR unit_code:"NMNHBIRDS" OR unit_code:"NMNHBOTANY" OR unit_code:"NMNHEDUCATION" OR unit_code:"NMNHENTO" OR unit_code:"NMNHFISHES" OR unit_code:"NMNHHERPS" OR unit_code:"NMNHINV" OR unit_code:"NMNHMAMMALS" OR unit_code:"NMNHMINSCI" OR unit_code:"NMNHPALEO")`);
// const search = encodeURIComponent(`"unit_code:"NMNHINV"`);
// const search =  `"Expedition" AND unit_code:"NMNHPALEO"`;
// const search =  `Expedition AND unit_code:"NMNHINV" AND AND online_media_type:"Images"`;
// const search =  `Flowers AND unit_code:"CHNDM" AND object_type:"Embroidery (visual works)" AND online_media_type:"Images"`;



// array that we will write into
let myArray = [];

// string that will hold the stringified JSON data
let jsonString = '';

//check if expedition is present

//adds that to an array;
//find length of array 
// search: fetches an array of terms based on term category
function fetchSearchData(searchTerm) {
    let url = searchBaseURL + "?api_key=" + apiKey + "&q=" + searchTerm;
    console.log(url);
    window
    .fetch(url)
    .then(res => res.json())
    .then(data => {
      console.log(data)
      
      // constructing search queries to get all the rows of data
      // you can change the page size
      let pageSize = 100000;
      let numberOfQueries = Math.ceil(data.response.rowCount / pageSize);
      console.log(numberOfQueries)
      for(let i = 0; i < numberOfQueries; i++) {
        // making sure that our last query calls for the exact number of rows
        if (i == (numberOfQueries - 1)) {
          searchAllURL = url + `&start=${i * pageSize}&rows=${data.response.rowCount - (i * pageSize)}`;
        } else {
          searchAllURL = url + `&start=${i * pageSize}&rows=${pageSize}`;
        }
        console.log(searchAllURL)
        fetchAllData(searchAllURL);
      
      }
    })
    .catch(error => {
      console.log(error);
    })
}

// fetching all the data listed under our search and pushing them all into our custom array
function fetchAllData(url) {
  return window
    .fetch(url)
    .then(res => res.json())
    .then(data => {
      console.log(data); // Log the data from the API

      data.response.rows.forEach(function(n) {
        addObject(n); // Add each object to myArray
      });

      // Log the current state of myArray after adding new objects
      console.log(myArray);

      // Optionally, if you want to stringify it:
      jsonString += JSON.stringify(myArray);
    })
    .catch(error => {
      console.log(error);
    });
}

//GET ARRAY / FIND EXPEDITIONS in the content->name->
// create your own array with just the data you need
function addObject(objectData) {  
  
  // we've encountered that some places have data others don't
  let currentPlace = "";
  if(objectData.content.indexedStructured.place) {
    currentPlace = objectData.content.indexedStructured.place[0];
  }
  //accessing data //if data.label = expedition log the content, otherwise pass
  //for each iterate through each element in the array to see which has label expedition, if yes add the content to array
  console.log(objectData.content.freetext.name[0],"objectData-name");
  
  myArray.push({
    id: objectData.id,
    title: objectData.title,
    link: objectData.content.descriptiveNonRepeating.record_link,
    place: currentPlace
  })
}

console.log(myArray);
fetchSearchData(search);


//---------------------------UNIT CODES------------------------------
// ACAH: Archives Center, National Museum of American History
// ACM: Anacostia Community Museum
// CFCHFOLKLIFE: Smithsonian Center for Folklife and Cultural Heritage
// CHNDM: Cooper-Hewitt, National Design Museum
// FBR: Smithsonian Field Book Project
// FSA: Freer Gallery of Art and Arthur M. Sackler Gallery Archives
// FSG: Freer Gallery of Art and Arthur M. Sackler Gallery
// HAC: Smithsonian Gardens
// HMSG: Hirshhorn Museum and Sculpture Garden
// HSFA: Human Studies Film Archives
// NAA: National Anthropological Archives
// NASM: National Air and Space Museum
// NMAAHC: National Museum of African American History and Culture
// NMAfA: Smithsonian National Museum of African Art
// NMAH: Smithsonian National Museum of American History
// NMAI: National Museum of the American Indian
// NMNHANTHRO: NMNH - Anthropology Dept.
// NMNHBIRDS: NMNH - Vertebrate Zoology - Birds Division
// NMNHBOTANY: NMNH - Botany Dept.
// NMNHEDUCATION: NMNH - Education & Outreach
// NMNHENTO: NMNH - Entomology Dept.
// NMNHFISHES: NMNH - Vertebrate Zoology - Fishes Division
// NMNHHERPS: NMNH - Vertebrate Zoology - Herpetology Division
// NMNHINV: NMNH - Invertebrate Zoology Dept.
// NMNHMAMMALS: NMNH - Vertebrate Zoology - Mammals Division
// NMNHMINSCI: NMNH - Mineral Sciences Dept.
// NMNHPALEO: NMNH - Paleobiology Dept.
// NPG: National Portrait Gallery
// NPM: National Postal Museum
// SAAM: Smithsonian American Art Museum
// SI: Smithsonian Institution, Digitization Program Office
// SIA: Smithsonian Institution Archives
// SIL: Smithsonian Libraries
// function fetchSearchData(searchTerm) {
//     let url = searchBaseURL + "?api_key=" + apiKey + "&q=" + searchTerm;
//     window
//     .fetch(url)
//     .then(res => res.json())
//     .then(data => {
//       console.log(data);
      
//       let pageSize = 1000;
//       let numberOfQueries = Math.ceil(data.response.rowCount / pageSize);
//       console.log(numberOfQueries);

//       let fetchPromises = [];
//       for (let i = 0; i < numberOfQueries; i++) {
//         let searchAllURL;
//         if (i == (numberOfQueries - 1)) {
//           searchAllURL = url + `&start=${i * pageSize}&rows=${data.response.rowCount - (i * pageSize)}`;
//         } else {
//           searchAllURL = url + `&start=${i * pageSize}&rows=${pageSize}`;
//         }
//         console.log(searchAllURL);
//         fetchPromises.push(fetchAllData(searchAllURL));
//       }

//       Promise.all(fetchPromises).then(() => {
//         jsonString = JSON.stringify(myArray);
//         console.log(myArray);
//         displayTable(); 
//       });
//     })
//     .catch(error => {
//       console.log(error);
//     });
// }

// function fetchAllData(url) {
//   return window
//     .fetch(url)
//     .then(res => res.json())
//     .then(data => {
//       console.log(data);
//       data.response.rows.forEach(function(n) {
//         addObject(n);
//       });
//     })
//     .catch(error => {
//       console.log(error);
//     });
// }

// function addObject(objectData) {  
//   let currentPlace = "";
//   if (objectData.content.indexedStructured.place) {
//     currentPlace = objectData.content.indexedStructured.place[0];
//   }

//   let objectType = [];
//   if (objectData.content.indexedStructured.object_type) {
//     objectType = objectData.content.indexedStructured.object_type;
//   }

//   let expeditionName = "";
//   if (objectData.content.freetext) {
//     objectData.content.freetext.forEach(item => {
//       if (item.label === "Expedition") {
//         expeditionName = item.content;
//       }
//     });
//   }

//   myArray.push({
//     id: objectData.id,
//     date: objectData.date,
//     title: objectData.title,
//     link: objectData.content.descriptiveNonRepeating.record_link,
//     place: currentPlace,
//     unit_code: objectData.unitCode,
//     type: objectData.type,
//     topic: objectData.content.indexedStructured.topic ? objectData.content.indexedStructured.topic[0] : "",
//     object_type: objectType,
//     expedition_name: expeditionName // Added field for the expedition name
//   });
// }

// fetchSearchData(search);

// function displayTable() {
//   const existingTable = document.querySelector('table');
//   if (existingTable) {
//     existingTable.remove();
//   }

//   const table = document.createElement('table');
//   table.border = '1';

//   const headerRow = document.createElement('tr');
//   const headers = ['Expedition Name', 'Object Type', 'Unit Code', 'Link'];
  
//   headers.forEach(headerText => {
//     const header = document.createElement('th');
//     header.textContent = headerText;
//     headerRow.appendChild(header);
//   });
  
//   table.appendChild(headerRow);

//   myArray.forEach(obj => {
//     const row = document.createElement('tr');

//     const expeditionNameCell = document.createElement('td');
//     expeditionNameCell.textContent = obj.expedition_name || "Not Available"; // Use the expedition name from the API
//     row.appendChild(expeditionNameCell);

//     const objectTypeCell = document.createElement('td');
//     objectTypeCell.textContent = obj.object_type.join(', ');
//     row.appendChild(objectTypeCell);

//     const unitCodeCell = document.createElement('td');
//     unitCodeCell.textContent = obj.unit_code;
//     row.appendChild(unitCodeCell);

//     const linkCell = document.createElement('td');
//     const link = document.createElement('a');
//     link.href = obj.link;
//     link.textContent = 'View Object';
//     link.target = '_blank';
//     linkCell.appendChild(link);
//     row.appendChild(linkCell);

//     table.appendChild(row);
//   });

//   document.body.appendChild(table);
// }