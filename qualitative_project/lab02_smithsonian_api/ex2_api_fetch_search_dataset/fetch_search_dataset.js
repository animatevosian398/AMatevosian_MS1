// Smithsonian API example code
// check API documentation for search here: http://edan.si.edu/openaccess/apidocs/#api-search-search
// Using this data set https://collections.si.edu/search/results.htm?q=Flowers&view=grid&fq=data_source%3A%22Cooper+Hewitt%2C+Smithsonian+Design+Museum%22&fq=online_media_type%3A%22Images%22&media.CC0=true&fq=object_type:%22Embroidery+%28visual+works%29%22

// put your API key here;
const apiKey = "UoW438wlTvqhUYPeFXdaqmiRje0z4rfagzu4fqda";

// search base URL
const searchBaseURL = "https://api.si.edu/openaccess/api/v1.0/search";

// constructing the initial search query
// const search =  'mask AND unit_code:"FSG"';
const search = `"Textile" AND (unit_code:"CHNDM" OR unit_code:"FSG") AND online_media_type:"Images"`;

// array that we will write into
let myArray = [];

// string that will hold the stringified JSON data
let jsonString = "";

// search: fetches an array of terms based on term category
function fetchSearchData(searchTerm) {
  let url = searchBaseURL + "?api_key=" + apiKey + "&q=" + searchTerm;
  console.log(url);
  window
    .fetch(url)
    .then((res) => res.json())
    .then((data) => {
      console.log(data);

      // constructing search queries to get all the rows of data
      // you can change the page size
      let pageSize = 1000;
      let numberOfQueries = Math.ceil(data.response.rowCount / pageSize);
      console.log(numberOfQueries);
      for (let i = 0; i < numberOfQueries; i++) {
        // making sure that our last query calls for the exact number of rows
        if (i == numberOfQueries - 1) {
          searchAllURL =
            url +
            `&start=${i * pageSize}&rows=${
              data.response.rowCount - i * pageSize
            }`;
        } else {
          searchAllURL = url + `&start=${i * pageSize}&rows=${pageSize}`;
        }
        console.log(searchAllURL);
        fetchAllData(searchAllURL);
      }
    })
    .catch((error) => {
      console.log(error);
    });
}

// fetching all the data listed under our search and pushing them all into our custom array
function fetchAllData(url) {
  window
    .fetch(url)
    .then((res) => res.json())
    .then((data) => {
      console.log(data);

      data.response.rows.forEach(function (n) {
        addObject(n);
      });
      jsonString = JSON.stringify(myArray);
      console.log(myArray);
    })
    .catch((error) => {
      console.log(error);
    });
}

// create your own array with just the data you need
//Data that we need:
//online_media.media.thumbnail -- IMAGE
//title.content
//title.unit_code
//freetext date. 0 and 1 (date and period)
//freetext notes
//objectType.content
//physicaldescription 0 (content and label)
//place - origin
//TOPIC (all)

function addObject(objectData) {
  // Retrieve place of origin if available
  let currentPlace = "";
  if (objectData.content.indexedStructured.place) {
    currentPlace = objectData.content.indexedStructured.place[0];
  }

  // Check if the fields exist and set default values if they don't
  let physicalDescription =
    objectData.content.freetext.physicalDescription &&
    objectData.content.freetext.physicalDescription[0]
      ? objectData.content.freetext.physicalDescription[0].content
      : "Description not available";

  let period =
    objectData.content.freetext.date && objectData.content.freetext.date[0]
      ? objectData.content.freetext.date[0].content
      : "Period not available";

  let description =
    objectData.content.freetext.notes && objectData.content.freetext.notes[0]
      ? objectData.content.freetext.notes[0].content
      : "Description not available";

  let thumbnail =
    objectData.content.descriptiveNonRepeating.online_media &&
    objectData.content.descriptiveNonRepeating.online_media.media[0]
      ? objectData.content.descriptiveNonRepeating.online_media.media[0]
          .thumbnail
      : "Thumbnail not available";

  let fullImage =
    objectData.content.descriptiveNonRepeating.online_media &&
    objectData.content.descriptiveNonRepeating.online_media.media[0]
      ? objectData.content.descriptiveNonRepeating.online_media.media[0].content
      : "Image not available";

  let unitCode = objectData.unitCode
    ? objectData.unitCode
    : "Unit code not available";

  // Push the constructed object into myArray
  myArray.push({
    id: objectData.id,
    title: objectData.title,
    link: objectData.content.descriptiveNonRepeating.record_link,
    place: currentPlace,
    period: period,
    image: {
      thumbnail: thumbnail,
      content: fullImage,
    },
    unitCode: unitCode,
    description: description,
    medium: physicalDescription,
  });
}

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
