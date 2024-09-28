

// // Call the main search function with delay between batches
// fetchSearchDataWithDelay(search, 5000);
const apiKey = "UoW438wlTvqhUYPeFXdaqmiRje0z4rfagzu4fqda";
const searchBaseURL = "https://api.si.edu/openaccess/api/v1.0/search";
// const search = `"expedition"+AND+type:edanmdm+AND+unit_code:"NMNHHERPS"`;
const search = `"United States Exploring Expedition" AND unit_code:"SIA"`;
// const search = `("Philippines Expedition" OR "Albatross Philippine Expedition, (1907-1910)") AND type:edanmdm`;
// const search = `"Albatross Philippine Expedition, (1907-1910)"`;

// Array to hold the data
let myArray = [];
let expeditionCount = {};
let expeditionArray = [];
let jsonString = '';

// Helper function for delay
function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

// Retry function for fetch requests
async function fetchWithRetry(url, retries = 5, delayTime = 100) {
    for (let i = 0; i < retries; i++) {
        try {
            const response = await fetch(url);
            if (response.status === 429) {
                console.log(`Rate limited. Retrying in ${delayTime / 1000} seconds...`);
                await delay(delayTime); // Wait before retrying
                continue; // Retry the request
            }
            return response; // Return successful response
        } catch (error) {
            console.error('Fetch error:', error);
        }
    }
    throw new Error(`Failed to fetch data after ${retries} retries.`);
}

// Fetch search data with delay between requests
function fetchSearchDataWithDelay(searchTerm, delayTime) {
    const url = `${searchBaseURL}?api_key=${apiKey}&q=${searchTerm}`;
    console.log("Initial URL: ", url);

    // Fetch initial search to get rowCount
    fetchWithRetry(url)
        .then(res => res.json())
        .then(data => {
            const pageSize = 3000;
            const numberOfQueries = Math.ceil(data.response.rowCount / pageSize);
            console.log(`Number of queries needed: ${numberOfQueries}`);

            // Fetch all data with delay for each request
            (async function () {
                for (let i = 0; i < numberOfQueries; i++) {
                    let searchAllURL = (i === numberOfQueries - 1)
                    ? `${url}&start=${i * pageSize}&rows=${data.response.rowCount - (i * pageSize)}`
                    : `${url}&start=${i * pageSize}&rows=${pageSize}`;
                
                    console.log("Fetching:", searchAllURL);
                    await fetchAllDataWithDelay(searchAllURL, delayTime);
                }

                // Sort expedition counts
                const sortedExpeditionCount = Object.entries(expeditionCount)
                    .sort((a, b) => b[1].count - a[1].count); // Sort by count descending

                // Log only the sorted results
                console.log(sortedExpeditionCount, "Sorted expedition counts (array)");

                // Convert myArray to JSON string
                jsonString = JSON.stringify(myArray);
                console.log(jsonString);
            })();
        })
        .catch(error => {
            console.log('Search data fetch error:', error);
        });
}

// Fetch paginated data with delay
async function fetchAllDataWithDelay(url, delayTime) {
    await delay(delayTime); // Wait before each fetch to avoid rate limits

    try {
        const response = await fetchWithRetry(url);
        if (response.ok) {
            const data = await response.json();
            console.log(`Fetched ${data.response.rows.length} rows`);

            // Process each item in the response
            data.response.rows.forEach(item => {
                addObject(item);
            });

            // Log current data array (optional)
            console.log(myArray);
        } else {
            console.log(`Failed to fetch data from: ${url}`);
        }
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}
function addObject(objectData) {
    let currentPlace = "";
    let thumbnailUrl = "";
    let imageDownloadUrl = "";
    let collectionDate = "";
    let expeditionName = "";
    let objectType = "";
    let topic = "";
    let unitCode = "";

    // Get the place if available
    if (objectData.content.indexedStructured && objectData.content.indexedStructured.place) {
        currentPlace = objectData.content.indexedStructured.place.join(", ");
    }

    // Get online media if available
    if (objectData.content.descriptiveNonRepeating && objectData.content.descriptiveNonRepeating.online_media) {
        const onlineMedia = objectData.content.descriptiveNonRepeating.online_media.media;
        if (onlineMedia.length > 0) {
            thumbnailUrl = onlineMedia[0].thumbnail; // Use the thumbnail link
            imageDownloadUrl = onlineMedia[0].resources.find(resource => resource.label === "High-resolution JPEG")?.url || ""; // High-resolution JPEG
        }
    }

    // Get collection date
    if (objectData.content.freetext && objectData.content.freetext.date) {
        objectData.content.freetext.date.forEach(item => {
            if (item.label === "Date") {
                collectionDate = item.content; // Adjust if you need a specific date
            }
        });
    }

    // Check for object type and topic
    if (objectData.content.indexedStructured) {
        objectType = objectData.content.indexedStructured.object_type.join(", ") || "";
        topic = objectData.content.indexedStructured.topic.join(", ") || "";
        unitCode = objectData.content.descriptiveNonRepeating.unit_code || "";
    }

    // Look for the expedition-related subjects
    if (objectData.content.freetext && objectData.content.freetext.name) {
        objectData.content.freetext.name.forEach(item => {
            if (item.label === "Subject") {
                // Check for the expedition theme
                if (item.content.includes("United States Exploring Expedition")) {
                    expeditionName = "United States Exploring Expedition";

                    // Increment the expedition count
                    if (expeditionCount[expeditionName]) {
                        expeditionCount[expeditionName].count++;
                        if (!expeditionCount[expeditionName].dates.includes(collectionDate)) {
                            expeditionCount[expeditionName].dates.push(collectionDate);
                        }
                    } else {
                        expeditionCount[expeditionName] = { count: 1, dates: [collectionDate] };
                    }

                    myArray.push({
                        id: objectData.id,
                        title: objectData.content.descriptiveNonRepeating.title.content,
                        link: objectData.content.descriptiveNonRepeating.record_link,
                        place: currentPlace,
                        expedition: expeditionName,
                        thumbnail: thumbnailUrl,
                        ImageDownload: imageDownloadUrl, // High-resolution image link
                        collectionDate: collectionDate,
                        objectType: objectType,
                        topic: topic,
                        unitCode: unitCode,
                    });
                }
            }
        });
    }
}



// function addObject(objectData) {
//     let currentPlace = "";
//     let thumbnailUrl = "";
//     let imageDownloadUrl = ""; // For the image content link
//     let collectionDate = "";
//     let expeditionName = "";
//     let objectType = "";
//     let topic = "";
//     let specimenCount = 0;
//     let unitCode = ""; // Variable to store unit code

//     if (objectData.content.indexedStructured && objectData.content.indexedStructured.place) {
//         currentPlace = objectData.content.indexedStructured.place.join(", ");
//     }

//     if (objectData.content.descriptiveNonRepeating && objectData.content.descriptiveNonRepeating.online_media) {
//         const onlineMedia = objectData.content.descriptiveNonRepeating.online_media.media;
//         if (onlineMedia.length > 0) {
//             thumbnailUrl = onlineMedia[0].thumbnail;
//             imageDownloadUrl = onlineMedia[0].content; // Extract the image content link
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

//     // Extract unit_code
//     if (objectData.content.descriptiveNonRepeating && objectData.content.descriptiveNonRepeating.unit_code) {
//         unitCode = objectData.content.descriptiveNonRepeating.unit_code; 
//     }

//     if (objectData.content.freetext && objectData.content.freetext.name) {
//         objectData.content.freetext.name.forEach(item => {
//             if (item.label === "Expedition") {
//                 expeditionName = item.content;

//                 // Increment the expedition count
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
//                     ImageDownload: imageDownloadUrl, // Add the image content link
//                     collectionDate: collectionDate,
//                     objectType: objectType,
//                     topic: topic,
//                     specimenCount: specimenCount,
//                     unitCode: unitCode,
//                     expedition_name_2: "United States Exploring Expedition"
//                 });
//             }
//         });
//     }
// }

    

// Call the main search function with delay between batches
fetchSearchDataWithDelay(search, 10);

console.log(expeditionCount, "Expedition counts");
console.log("Final myArray:", myArray);

