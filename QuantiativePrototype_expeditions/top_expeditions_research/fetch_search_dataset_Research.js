

// // // const apiKey = "UoW438wlTvqhUYPeFXdaqmiRje0z4rfagzu4fqda";
// // // const searchBaseURL = "https://api.si.edu/openaccess/api/v1.0/search";
// // // // const search = `"expedition" AND unit_code:"NMNHINV`;

// // // const search = `"expedition"+AND+type:edanmdm+AND+unit_code:"NMNHINV"`
// // // // const search = `"expedition"+online_visual_material:true+AND+type:edanmdm+AND+unit_code:"NMNHINV"`
// // // // Array that will hold our extracted expeditions
// // // let myArray = [];
// // // // Object to hold the expedition names and their counts
// // // let expeditionCount = {};

// // // // Array to hold the unique expeditions
// // // let expeditionArray = [];
// // // // String that will hold the stringified JSON data
// // // let jsonString = '';

// // // // Helper function to create a delay
// // // function delay(ms) {
// // //   return new Promise(resolve => setTimeout(resolve, ms));
// // // }

// // // // Function to fetch search data with delay
// // // function fetchSearchDataWithDelay(searchTerm, delayTime) {
// // //   let url = searchBaseURL + "?api_key=" + apiKey + "&q=" + searchTerm;
// // //   console.log(url);
// // //   window
// // //     .fetch(url)
// // //     .then(res => res.json())
// // //     .then(data => {
// // //       console.log(data);

// // //       // Constructing search queries to get all the rows of data
// // //       let pageSize = 1000;
// // //       let numberOfQueries = Math.ceil(data.response.rowCount / pageSize);
// // //       console.log(numberOfQueries);

// // //       // Process requests one by one with delay to avoid rate limits
// // //       (async function () {
// // //         for (let i = 0; i < numberOfQueries; i++) {
// // //           let searchAllURL = (i === numberOfQueries - 1) ?
// // //             url + `&start=${i * pageSize}&rows=${data.response.rowCount - (i * pageSize)}` :
// // //             url + `&start=${i * pageSize}&rows=${pageSize}`;
          
// // //           console.log("Fetching: " + searchAllURL);
          
// // //           // Call fetchAllData with delay
// // //           await fetchAllDataWithDelay(searchAllURL, delayTime);
// // //         }

// // //         // After all requests are done
// // //         console.log("All requests completed.");
// // //         jsonString = JSON.stringify(myArray); // Convert the final array into JSON string after all data is fetched
// // //         console.log(jsonString); // Log the final JSON string
// // //       })();
// // //     })
// // //     .catch(error => {
// // //       console.log(error);
// // //     });
// // // }

// // // // Fetching all the data listed under our search and pushing them into our custom array with delay
// // // async function fetchAllDataWithDelay(url, delayTime) {
// // //   await delay(delayTime); // Wait for the delay time
// // //   return fetchAllData(url); // Fetch data after delay
// // // }

// // // // Fetching all the data listed under our search and pushing them into our custom array
// // // function fetchAllData(url) {
// // //   window
// // //     .fetch(url)
// // //     .then(res => res.json())
// // //     .then(data => {
// // //       console.log(data);

// // //       // Iterate through each result and process it
// // //       data.response.rows.forEach(function (n) {
// // //         addObject(n);
// // //       });

// // //       console.log(myArray); // Log the updated array
// // //     })
// // //     .catch(error => {
// // //       console.log(error);
// // //     });
// // // }

// // // function addObject(objectData) {
// // //     let currentPlace = "";
// // //     let thumbnailUrl = ""; // Default blank if no thumbnail
// // //     let collectionDate = ""; // Default blank if no collection date
// // //     let expeditionName = ""; // Default blank if no expedition name
// // //     let objectType = ""; // Default blank if no object type
// // //     let topic = ""; // Default blank if no topic
// // //     let specimenCount = 0; // Default to 0 if no specimen count
  
// // //     // Check in indexedStructured for place (array of places)
// // //     if (objectData.content.indexedStructured && objectData.content.indexedStructured.place) {
// // //       currentPlace = objectData.content.indexedStructured.place.join(", ");
// // //     }
  
// // //     // Check if a thumbnail exists in descriptiveNonRepeating
// // //     if (objectData.content.descriptiveNonRepeating && objectData.content.descriptiveNonRepeating.online_media) {
// // //       if (objectData.content.descriptiveNonRepeating.online_media.media && objectData.content.descriptiveNonRepeating.online_media.media.length > 0) {
// // //         thumbnailUrl = objectData.content.descriptiveNonRepeating.online_media.media[0].thumbnail;
// // //       }
// // //     }
  
// // //     // Check for the collection date in freetext
// // //     if (objectData.content.freetext && objectData.content.freetext.date) {
// // //       objectData.content.freetext.date.forEach(item => {
// // //         if (item.label === "Collection Date") {
// // //           collectionDate = item.content;
// // //         }
// // //       });
// // //     }
  
// // //     // Check for the object type in indexedStructured
// // //     if (objectData.content.indexedStructured && objectData.content.indexedStructured.object_type) {
// // //       objectType = objectData.content.indexedStructured.object_type.join(", ");
// // //     }
  
// // //     // Check for the topic in indexedStructured
// // //     if (objectData.content.indexedStructured && objectData.content.indexedStructured.topic) {
// // //       topic = objectData.content.indexedStructured.topic.join(", ");
// // //     }
  
// // //     // Check if "freetext" and "name" exist in the data
// // //     if (objectData.content.freetext && objectData.content.freetext.name) {
// // //       objectData.content.freetext.name.forEach(item => {
// // //         if (item.label === "Expedition") {
// // //           expeditionName = item.content;
  
// // //           // Count the expedition occurrences and store collection dates
// // //           if (expeditionCount[expeditionName]) {
// // //             expeditionCount[expeditionName].count++; // Increment the count if it exists
// // //             if (!expeditionCount[expeditionName].dates.includes(collectionDate)) {
// // //               expeditionCount[expeditionName].dates.push(collectionDate);
// // //             }
// // //           } else {
// // //             expeditionCount[expeditionName] = { count: 1, dates: [collectionDate] }; // Initialize the count and dates
// // //           }
  
// // //           // Check if the expedition is already in the array, if not, add it
// // //           if (!expeditionArray.includes(expeditionName)) {
// // //             expeditionArray.push(expeditionName);
// // //           }
  
// // //           // Push the expedition details into the myArray
// // //           myArray.push({
// // //             id: objectData.id,
// // //             title: objectData.content.descriptiveNonRepeating.title.content, // Fetch the title
// // //             link: objectData.content.descriptiveNonRepeating.record_link,
// // //             place: currentPlace, // Use the place from indexedStructured
// // //             expedition: expeditionName, // Include the expedition name in the array
// // //             thumbnail: thumbnailUrl, // Add the thumbnail URL
// // //             collectionDate: collectionDate, // Add the collection date
// // //             objectType: objectType, // Add the object type (e.g., specimen, drawing, fossil)
// // //             topic: topic, // Add the topic (e.g., Fossils, Drawings)
// // //             specimenCount: specimenCount // Add the specimen count
// // //           });
// // //         }
// // //       });
// // //     }
// // //   }
// // //   // Convert expeditionCount object to an array of entries
// // // const sortedExpeditionCount = Object.entries(expeditionCount)
// // // .sort((a, b) => b[1].count - a[1].count); // Sort by count in descending order

// // // // If you want to convert it back to an object
// // // const sortedExpeditionCountObject = Object.fromEntries(sortedExpeditionCount);

// // // console.log(sortedExpeditionCount, "Sorted expedition counts (array)");
// // // console.log(sortedExpeditionCountObject, "Sorted expedition counts (object)");

// // // // Call the search function with a delay of 1 second (1000ms) between each batch of requests
// // // fetchSearchDataWithDelay(search, 5000);
// // // console.log(expeditionArray, "expedition Array - Unique values");
// // // console.log(expeditionCount, "expedition counts");
// // const apiKey = "UoW438wlTvqhUYPeFXdaqmiRje0z4rfagzu4fqda";
// // const searchBaseURL = "https://api.si.edu/openaccess/api/v1.0/search";
// // const search = `"expedition"+AND+type:edanmdm+AND+unit_code:"NMNHINV"`;

// // // Array to hold the data
// // let myArray = [];
// // let expeditionCount = {};
// // let expeditionArray = [];
// // let jsonString = '';

// // // Helper function for delay
// // function delay(ms) {
// //     return new Promise(resolve => setTimeout(resolve, ms));
// // }

// // // Retry function for fetch requests
// // async function fetchWithRetry(url, retries = 5, delayTime = 10000) {
// //     for (let i = 0; i < retries; i++) {
// //         try {
// //             const response = await fetch(url);
// //             if (response.status === 429) {
// //                 console.log(`Rate limited. Retrying in ${delayTime / 1000} seconds...`);
// //                 await delay(delayTime); // Wait before retrying
// //                 continue; // Retry the request
// //             }
// //             return response; // Return successful response
// //         } catch (error) {
// //             console.error('Fetch error:', error);
// //         }
// //     }
// //     throw new Error(`Failed to fetch data after ${retries} retries.`);
// // }

// // // Fetch search data with delay between requests
// // function fetchSearchDataWithDelay(searchTerm, delayTime) {
// //     const url = `${searchBaseURL}?api_key=${apiKey}&q=${searchTerm}`;
// //     console.log("Initial URL: ", url);

// //     // Fetch initial search to get rowCount
// //     fetchWithRetry(url)
// //         .then(res => res.json())
// //         .then(data => {
// //             const pageSize = 1000;
// //             const numberOfQueries = Math.ceil(data.response.rowCount / pageSize);
// //             console.log(`Number of queries needed: ${numberOfQueries}`);

// //             // Fetch all data with delay for each request
// //             (async function () {
// //                 for (let i = 0; i < numberOfQueries; i++) {
// //                     let searchAllURL = (i === numberOfQueries - 1)
// //                         ? url + `&start=${i * pageSize}&rows=${data.response.rowCount - (i * pageSize)}`
// //                         : url + `&start=${i * pageSize}&rows=${pageSize}`;
                    
// //                     console.log("Fetching:", searchAllURL);
// //                     await fetchAllDataWithDelay(searchAllURL, delayTime);
// //                 }

// //                 // After all requests are done, convert data to JSON string
// //                 console.log("All requests completed.");
// //                 jsonString = JSON.stringify(myArray);
// //                 console.log(jsonString);
// //             })();
// //         })
// //         .catch(error => {
// //             console.log('Search data fetch error:', error);
// //         });
// // }
// // //have to add delays, and then a retry with delay if it hits the api limit
// // // Fetch paginated data with delay
// // async function fetchAllDataWithDelay(url, delayTime) {
// //     await delay(delayTime); // Wait before each fetch to avoid rate limits

// //     try {
// //         const response = await fetchWithRetry(url);
// //         if (response.ok) {
// //             const data = await response.json();
// //             console.log(`Fetched ${data.response.rows.length} rows`);

// //             // Process each item in the response
// //             data.response.rows.forEach(item => {
// //                 addObject(item);
// //             });

// //             console.log(myArray); // Log current data array
// //         } else {
// //             console.log(`Failed to fetch data from: ${url}`);
// //         }
// //     } catch (error) {
// //         console.error('Error fetching data:', error);
// //     }
// // }

// // // Function to process and add fetched data to array
// // function addObject(objectData) {
// //     let currentPlace = "";
// //     let thumbnailUrl = "";
// //     let collectionDate = "";
// //     let expeditionName = "";
// //     let objectType = "";
// //     let topic = "";
// //     let specimenCount = 0;

// //     if (objectData.content.indexedStructured && objectData.content.indexedStructured.place) {
// //         currentPlace = objectData.content.indexedStructured.place.join(", ");
// //     }

// //     if (objectData.content.descriptiveNonRepeating && objectData.content.descriptiveNonRepeating.online_media) {
// //         if (objectData.content.descriptiveNonRepeating.online_media.media.length > 0) {
// //             thumbnailUrl = objectData.content.descriptiveNonRepeating.online_media.media[0].thumbnail;
// //         }
// //     }

// //     if (objectData.content.freetext && objectData.content.freetext.date) {
// //         objectData.content.freetext.date.forEach(item => {
// //             if (item.label === "Collection Date") {
// //                 collectionDate = item.content;
// //             }
// //         });
// //     }

// //     if (objectData.content.indexedStructured && objectData.content.indexedStructured.object_type) {
// //         objectType = objectData.content.indexedStructured.object_type.join(", ");
// //     }

// //     if (objectData.content.indexedStructured && objectData.content.indexedStructured.topic) {
// //         topic = objectData.content.indexedStructured.topic.join(", ");
// //     }

// //     if (objectData.content.freetext && objectData.content.freetext.name) {
// //         objectData.content.freetext.name.forEach(item => {
// //             if (item.label === "Expedition") {
// //                 expeditionName = item.content;

// //                 if (expeditionCount[expeditionName]) {
// //                     expeditionCount[expeditionName].count++;
// //                     if (!expeditionCount[expeditionName].dates.includes(collectionDate)) {
// //                         expeditionCount[expeditionName].dates.push(collectionDate);
// //                     }
// //                 } else {
// //                     expeditionCount[expeditionName] = { count: 1, dates: [collectionDate] };
// //                 }

// //                 if (!expeditionArray.includes(expeditionName)) {
// //                     expeditionArray.push(expeditionName);
// //                 }

// //                 myArray.push({
// //                     id: objectData.id,
// //                     title: objectData.content.descriptiveNonRepeating.title.content,
// //                     link: objectData.content.descriptiveNonRepeating.record_link,
// //                     place: currentPlace,
// //                     expedition: expeditionName,
// //                     thumbnail: thumbnailUrl,
// //                     collectionDate: collectionDate,
// //                     objectType: objectType,
// //                     topic: topic,
// //                     specimenCount: specimenCount
// //                 });
// //             }
// //         });
// //     }
// // }

// // // Sort and log the expedition count
// // const sortedExpeditionCount = Object.entries(expeditionCount)
// //     .sort((a, b) => b[1].count - a[1].count);
// // const sortedExpeditionCountObject = Object.fromEntries(sortedExpeditionCount);

// // console.log(sortedExpeditionCount, "Sorted expedition counts (array)");
// // console.log(sortedExpeditionCountObject, "Sorted expedition counts (object)");

// // // Call the main search function with delay between batches
// // fetchSearchDataWithDelay(search, 5000);
// const apiKey = "tebnOCC4XmUJaQs1JIIJPWjTwOCe9EF4u8MREr9O";
// const searchBaseURL = "https://api.si.edu/openaccess/api/v1.0/search";
// const search = `U.S.+Exploring+Expedition+AND+type:edanmdm+AND+unit_code:"NMNHHERPS"`;

// // Array to hold the data
// let myArray = [];
// let expeditionCount = {};
// let expeditionArray = [];
// let jsonString = '';

// // Helper function for delay
// function delay(ms) {
//     return new Promise(resolve => setTimeout(resolve, ms));
// }

// // Retry function for fetch requests
// async function fetchWithRetry(url, retries = 5, delayTime = 10000) {
//     for (let i = 0; i < retries; i++) {
//         try {
//             const response = await fetch(url);
//             if (response.status === 429) {
//                 console.log(`Rate limited. Retrying in ${delayTime / 1000} seconds...`);
//                 await delay(delayTime); // Wait before retrying
//                 continue; // Retry the request
//             }
//             return response; // Return successful response
//         } catch (error) {
//             console.error('Fetch error:', error);
//         }
//     }
//     throw new Error(`Failed to fetch data after ${retries} retries.`);
// }

// // Fetch search data with delay between requests
// function fetchSearchDataWithDelay(searchTerm, delayTime) {
//     const url = `${searchBaseURL}?api_key=${apiKey}&q=${searchTerm}`;
//     console.log("Initial URL: ", url);

//     // Fetch initial search to get rowCount
//     fetchWithRetry(url)
//         .then(res => res.json())
//         .then(data => {
//             const pageSize = 1000;
//             const numberOfQueries = Math.ceil(data.response.rowCount / pageSize);
//             console.log(`Number of queries needed: ${numberOfQueries}`);

//             // Fetch all data with delay for each request
//             (async function () {
//                 for (let i = 0; i < numberOfQueries; i++) {
//                     let searchAllURL = (i === numberOfQueries - 1)
//                         ? url + `&start=${i * pageSize}&rows=${data.response.rowCount - (i * pageSize)}`
//                         : url + `&start=${i * pageSize}&rows=${pageSize}`;
                    
//                     console.log("Fetching:", searchAllURL);
//                     await fetchAllDataWithDelay(searchAllURL, delayTime);
//                 }

//                 // Sort expedition counts
//                 const sortedExpeditionCount = Object.entries(expeditionCount)
//                     .sort((a, b) => b[1].count - a[1].count); // Sort by count descending

//                 // Log only the sorted results
//                 console.log(sortedExpeditionCount, "Sorted expedition counts (array)");

//                 // Convert myArray to JSON string
//                 jsonString = JSON.stringify(myArray);
//                 console.log(jsonString);
//             })();
//         })
//         .catch(error => {
//             console.log('Search data fetch error:', error);
//         });
// }

// // Fetch paginated data with delay
// async function fetchAllDataWithDelay(url, delayTime) {
//     await delay(delayTime); // Wait before each fetch to avoid rate limits

//     try {
//         const response = await fetchWithRetry(url);
//         if (response.ok) {
//             const data = await response.json();
//             console.log(`Fetched ${data.response.rows.length} rows`);

//             // Process each item in the response
//             data.response.rows.forEach(item => {
//                 addObject(item);
//             });

//             // Log current data array (optional)
//             // console.log(myArray);
//         } else {
//             console.log(`Failed to fetch data from: ${url}`);
//         }
//     } catch (error) {
//         console.error('Error fetching data:', error);
//     }
// }

// // Function to process and add fetched data to array
// function addObject(objectData) {
//     let currentPlace = "";
//     let thumbnailUrl = "";
//     let collectionDate = "";
//     let expeditionName = "";
//     let objectType = "";
//     let topic = "";
//     let specimenCount = 0;

//     if (objectData.content.indexedStructured && objectData.content.indexedStructured.place) {
//         currentPlace = objectData.content.indexedStructured.place.join(", ");
//     }

//     if (objectData.content.descriptiveNonRepeating && objectData.content.descriptiveNonRepeating.online_media) {
//         if (objectData.content.descriptiveNonRepeating.online_media.media.length > 0) {
//             thumbnailUrl = objectData.content.descriptiveNonRepeating.online_media.media[0].thumbnail;
//         }
//     }

//     if (objectData.content.freetext && objectData.content.freetext.date) {
//         objectData.content.freetext.date.forEach(item => {
//             if (item.label === "Collection Date") {
//                 collectionDate = item.content;
//             }
//         });
//     }

//     if (objectData.content.indexedStructured && objectData.content.indexedStructured.object_type) {
//         objectType = objectData.content.indexedStructured.object_type.join(", ");
//     }

//     if (objectData.content.indexedStructured && objectData.content.indexedStructured.topic) {
//         topic = objectData.content.indexedStructured.topic.join(", ");
//     }

//     if (objectData.content.freetext && objectData.content.freetext.name) {
//         objectData.content.freetext.name.forEach(item => {
//             if (item.label === "Expedition") {
//                 expeditionName = item.content;

//                 if (expeditionCount[expeditionName]) {
//                     expeditionCount[expeditionName].count++;
//                     if (!expeditionCount[expeditionName].dates.includes(collectionDate)) {
//                         expeditionCount[expeditionName].dates.push(collectionDate);
//                     }
//                 } else {
//                     expeditionCount[expeditionName] = { count: 1, dates: [collectionDate] };
//                 }

//                 if (!expeditionArray.includes(expeditionName)) {
//                     expeditionArray.push(expeditionName);
//                 }

//                 myArray.push({
//                     id: objectData.id,
//                     title: objectData.content.descriptiveNonRepeating.title.content,
//                     link: objectData.content.descriptiveNonRepeating.record_link,
//                     place: currentPlace,
//                     expedition: expeditionName,
//                     thumbnail: thumbnailUrl,
//                     collectionDate: collectionDate,
//                     objectType: objectType,
//                     topic: topic,
//                     specimenCount: specimenCount
//                 });
//             }
//         });
//     }
// }

// // Call the main search function with delay between batches
// fetchSearchDataWithDelay(search, 5000);
