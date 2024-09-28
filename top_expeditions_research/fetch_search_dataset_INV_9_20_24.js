

const apiKey = "tebnOCC4XmUJaQs1JIIJPWjTwOCe9EF4u8MREr9O";
const searchBaseURL = "https://api.si.edu/openaccess/api/v1.0/search";
// const search = `"expedition" AND unit_code:"NMNHINV`;

//works but is only online_visual_material:true

const search = `"expedition"+AND+type:edanmdm+AND+unit_code:"NMNHINV"`
// const search = `"expedition"+online_visual_material:true+AND+type:edanmdm+AND+unit_code:"NMNHINV"`
// Array that will hold our extracted expeditions
let myArray = [];
// Object to hold the expedition names and their counts
let expeditionCount = {};

// Array to hold the unique expeditions
let expeditionArray = [];
// String that will hold the stringified JSON data
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
      let pageSize = 1000;
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
      objectData.content.freetext.date.forEach(item => {
        if (item.label === "Collection Date") {
          collectionDate = item.content;
        }
      });
    }
  
  
    // Check for the object type in indexedStructured
    if (objectData.content.indexedStructured && objectData.content.indexedStructured.object_type) {
      objectType = objectData.content.indexedStructured.object_type.join(", ");
    }
  
    // Check for the topic in indexedStructured
    if (objectData.content.indexedStructured && objectData.content.indexedStructured.topic) {
      topic = objectData.content.indexedStructured.topic.join(", ");
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
  
          // Check if the expedition is already in the array, if not, add it
          if (!expeditionArray.includes(expeditionName)) {
            expeditionArray.push(expeditionName);
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
          // Check if the added object matches the desired id
          if (objectData.id === "ld1-1643411763164-1643411815026-1") {
            console.log("Object found in myArray:", myArray[myArray.length - 1]);
        }
        }
        
      });
      
    }
  }
  
// Call the search function
fetchSearchData(search);
console.log(expeditionArray, "expedition Array - Unique values");
console.log(expeditionCount, "expedition counts");



