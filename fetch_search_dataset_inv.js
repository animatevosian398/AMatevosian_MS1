// const apiKey = "tebnOCC4XmUJaQs1JIIJPWjTwOCe9EF4u8MREr9O";

// const searchBaseURL = "https://api.si.edu/openaccess/api/v1.0/search";
// const search = encodeURIComponent(`"expedition" AND unit_code:"NMNHINV"`);

// // Array that will hold our extracted expeditions
// let myArray = [];

// //FOR EXPLORATION PURPOSES:
// // Object to hold the expedition names and their counts
// let expeditionCount = {};
// // Array to hold the unique expeditions
// let expeditionArray = [];

// //fetching data
// // string that will hold the stringified JSON data
// let jsonString = '';
// // Function to fetch search data
// function fetchSearchData(searchTerm) {
//     let url = searchBaseURL + "?api_key=" + apiKey + "&q=" + searchTerm;
//     console.log(url);
//     window
//         .fetch(url)
//         .then(res => res.json())
//         .then(data => {
//             console.log(data);

//             // Constructing search queries to get all the rows of data
//             let pageSize = 100000;
//             let numberOfQueries = Math.ceil(data.response.rowCount / pageSize);
//             console.log(numberOfQueries);
//             for (let i = 0; i < numberOfQueries; i++) {
//                 let searchAllURL = (i === numberOfQueries - 1) ?
//                     url + `&start=${i * pageSize}&rows=${data.response.rowCount - (i * pageSize)}` :
//                     url + `&start=${i * pageSize}&rows=${pageSize}`;
//                 console.log(searchAllURL);
//                 fetchAllData(searchAllURL);
//             }
//         })
//         .catch(error => {
//             console.log(error);
//         });
// }

// // Fetching all the data listed under our search and pushing them into our custom array
// function fetchAllData(url) {
//     window
//         .fetch(url)
//         .then(res => res.json())
//         .then(data => {
//             console.log(data);

//             // Iterate through each result and process it
//             data.response.rows.forEach(function (n) {
//                 addObject(n);
//             });
//             console.log(myArray,"my array");
//             console.log(expeditionCount,"Expedition Counts");  // Log the expedition count after processing
//             console.log(expeditionArray,"Expedition Array - Unique values");  // Log the array of unique expeditions
//         })
//         .catch(error => {
//             console.log(error);
//         });
// }

// function addObject(objectData) {
//     let currentPlace = "";
//     let thumbnailUrl = "";  // Default blank if no thumbnail
//     let collectionDate = "";  // Default blank if no collection date
//     let expeditionName = "";  // Default blank if no expedition name
//     let objectType = "";  // Default blank if no object type
//     let topic = "";  // Default blank if no topic

//     // Check in indexedStructured for place (array of places)
//     if (objectData.content.indexedStructured && objectData.content.indexedStructured.place) {
//         // Join multiple place entries into a single string, separated by commas
//         currentPlace = objectData.content.indexedStructured.place.join(", ");
//     }

//     // Check if a thumbnail exists in descriptiveNonRepeating
//     if (objectData.content.descriptiveNonRepeating && objectData.content.descriptiveNonRepeating.online_media) {
//         if (objectData.content.descriptiveNonRepeating.online_media.media && objectData.content.descriptiveNonRepeating.online_media.media.length > 0) {
//             // Assuming the first media item is the thumbnail
//             thumbnailUrl = objectData.content.descriptiveNonRepeating.online_media.media[0].thumbnail;
//         }
//     }

//     // Check for the collection date in indexedStructured
//     if (objectData.content.indexedStructured && objectData.content.indexedStructured.date) {
//         // Join multiple date entries into a single string, separated by commas
//         collectionDate = objectData.content.indexedStructured.date.join(", ");
//     }

//     // Check for the object type in indexedStructured
//     if (objectData.content.indexedStructured && objectData.content.indexedStructured.objectType) {
//         // Join multiple object type entries into a single string, separated by commas
//         objectType = objectData.content.indexedStructured.objectType.join(", ");
//     }

//     // Check for the topic in indexedStructured
//     if (objectData.content.indexedStructured && objectData.content.indexedStructured.topic) {
//         // Join multiple topic entries into a single string, separated by commas
//         topic = objectData.content.indexedStructured.topic.join(", ");
//     }

//     // Check if "freetext" and "name" exist in the data
//     if (objectData.content.freetext && objectData.content.freetext.name) {
//         // Loop through the 'name' array to find the "Expedition" label
//         objectData.content.freetext.name.forEach(item => {
//             if (item.label === "Expedition") {
//                 expeditionName = item.content;

//                 // Count the expedition occurrences
//                 if (expeditionCount[expeditionName]) {
//                     expeditionCount[expeditionName]++;  // Increment the count if it exists
//                 } else {
//                     expeditionCount[expeditionName] = 1;  // Initialize the count if it doesn't exist
//                 }

//                 // Check if the expedition is already in the array, if not, add it
//                 if (!expeditionArray.includes(expeditionName)) {
//                     expeditionArray.push(expeditionName);
//                 }

//                 // Push the expedition details into the myArray
//                 myArray.push({
//                     id: objectData.id,
//                     title: objectData.content.descriptiveNonRepeating.title.content,  // Fetch the title
//                     link: objectData.content.descriptiveNonRepeating.record_link,
//                     place: currentPlace,  // Use the place from indexedStructured
//                     expedition: expeditionName,  // Include the expedition name in the array
//                     thumbnail: thumbnailUrl,  // Add the thumbnail URL
//                     collectionDate: collectionDate,  // Add the collection date
//                     objectType: objectType,  // Add the object type (e.g., specimen, drawing, fossil)
//                     topic: topic  // Add the topic (e.g., Fossils, Drawings)
//                 });
//             }
//         });
//     }
// }




// // Call the search function
// fetchSearchData(search);
const apiKey = "tebnOCC4XmUJaQs1JIIJPWjTwOCe9EF4u8MREr9O";
const searchBaseURL = "https://api.si.edu/openaccess/api/v1.0/search";
const search = encodeURIComponent(`unit_code:"NMNHBOTANY"`);

// Array that will hold our extracted expeditions
let myArray = [];
// Object to hold the expedition names and their counts
let expeditionCount = {};

// Array to hold the unique expeditions
let expeditionArray = [];
// string that will hold the stringified JSON data
let jsonString = '';

// Function to fetch search data
function fetchSearchData(searchTerm) {
  let url = searchBaseURL + "?api_key=" + apiKey + "&q=" + searchTerm;
  console.log(url);
  window
    .fetch(url)
    .then(res => res.json())
    .then(data => {
      console.log(data);

      // Constructing search queries to get all the rows of data
      let pageSize = 100000;
      let numberOfQueries = Math.ceil(data.response.rowCount / pageSize);
      console.log(numberOfQueries);
      for (let i = 0; i < numberOfQueries; i++) {
        let searchAllURL = (i === numberOfQueries - 1) ?
          url + `&start=${i * pageSize}&rows=${data.response.rowCount - (i * pageSize)}` :
          url + `&start=${i * pageSize}&rows=${pageSize}`;
        console.log(searchAllURL);
        fetchAllData(searchAllURL);
      }
    })
    .catch(error => {
      console.log(error);
    });
}

// Fetching all the data listed under our search and pushing them into our custom array
function fetchAllData(url) {
  window
    .fetch(url)
    .then(res => res.json())
    .then(data => {
      console.log(data);

      // Iterate through each result and process it
      data.response.rows.forEach(function (n) {
        addObject(n);
      });
      jsonString += JSON.stringify(myArray);
      console.log(myArray); // Log the final array
    })
    .catch(error => {
      console.log(error);
    });
}

function addObject(objectData) {
  let currentPlace = "";
  let thumbnailUrl = ""; // Default blank if no thumbnail
  let collectionDate = ""; // Default blank if no collection date
  let expeditionName = ""; // Default blank if no expedition name
  let objectType = ""; // Default blank if no object type
  let topic = ""; // Default blank if no topic
  let specimenCount = 0; // Default to 0 if no specimen count

  // Check in indexedStructured for place (array of places)
  if (objectData.content.indexedStructured && objectData.content.indexedStructured.place) {
    currentPlace = objectData.content.indexedStructured.place.join(", ");
  }

  // Check if a thumbnail exists in descriptiveNonRepeating
  if (objectData.content.descriptiveNonRepeating && objectData.content.descriptiveNonRepeating.online_media) {
    if (objectData.content.descriptiveNonRepeating.online_media.media && objectData.content.descriptiveNonRepeating.online_media.media.length > 0) {
      thumbnailUrl = objectData.content.descriptiveNonRepeating.online_media.media[0].thumbnail;
    }
  }

  // Check for the collection date in freetext
  if (objectData.content.freetext && objectData.content.freetext.date) {
    // Loop through the 'date' array to find the "Collection Date" label
    objectData.content.freetext.date.forEach(item => {
      if (item.label === "Collection Date") {
        collectionDate = item.content;
      }
    });
  }

  // Check for the object type in indexedStructured
  if (objectData.content.indexedStructured && objectData.content.indexedStructured.objectType) {
    objectType = objectData.content.indexedStructured.objectType.join(", ");
  }

  // Check for the topic in indexedStructured
  if (objectData.content.indexedStructured && objectData.content.indexedStructured.topic) {
    topic = objectData.content.indexedStructured.topic.join(", ");
  }

  // Check if "freetext" and "name" exist in the data
  if (objectData.content.freetext && objectData.content.freetext.notes) {
    // Loop through the 'notes' array to find the "Specimen Count" label
    objectData.content.freetext.notes.forEach(item => {
      if (item.label === "Specimen Count") {
        // Parse the specimen count and ensure it's an integer
        specimenCount = parseInt(item.content, 10) || 0;
      }
    });
  }

// Check if "freetext" and "name" exist in the data
if (objectData.content.freetext && objectData.content.freetext.name) {
    objectData.content.freetext.name.forEach(item => {
      if (item.label === "Expedition") {
        expeditionName = item.content;

        // Count the expedition occurrences and store collection dates
        if (expeditionCount[expeditionName]) {
          expeditionCount[expeditionName].count++; // Increment the count if it exists
          if (!expeditionCount[expeditionName].dates.includes(collectionDate)) {
            expeditionCount[expeditionName].dates.push(collectionDate);
          }
        } else {
          expeditionCount[expeditionName] = { count: 1, dates: [collectionDate] }; // Initialize the count and dates
        }

        // Push the expedition details into the myArray
        myArray.push({
          id: objectData.id,
          title: objectData.content.descriptiveNonRepeating.title.content, // Fetch the title
          link: objectData.content.descriptiveNonRepeating.record_link,
          place: currentPlace, // Use the place from indexedStructured
          expedition: expeditionName, // Include the expedition name in the array
          thumbnail: thumbnailUrl, // Add the thumbnail URL
          collectionDate: collectionDate, // Add the collection date
          objectType: objectType, // Add the object type (e.g., specimen, drawing, fossil)
          topic: topic, // Add the topic (e.g., Fossils, Drawings)
          specimenCount: specimenCount // Add the specimen count
        });
      }
    });
  }
}

// Call the search function
fetchSearchData(search);
console.log(expeditionArray,"expedition Array, unique values")
console.log(expeditionCount,"expedition counts -nmnh inv")