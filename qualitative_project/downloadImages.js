const fs = require("fs");
const axios = require("axios");
const path = require("path");

// Define the JSON data (or read from a file if preferred)
const jsonData = ["/qualitative_project/data/data_NEW.json"];

// Directory to save images
const downloadFolder = "./images";

// Create the download folder if it doesn't exist
if (!fs.existsSync(downloadFolder)) {
  fs.mkdirSync(downloadFolder);
}

// Function to download and save an image
const downloadImage = async (url, filename) => {
  try {
    const response = await axios({
      url,
      method: "GET",
      responseType: "stream",
    });

    const filePath = path.resolve(downloadFolder, filename);
    response.data.pipe(fs.createWriteStream(filePath));

    console.log(`Downloaded: ${filename}`);
  } catch (error) {
    console.error(`Failed to download ${filename}: ${error.message}`);
  }
};

// Process JSON and download images
const processImages = async () => {
  for (const item of jsonData) {
    const imageUrl = item.image.content;
    const imageId = item.id;
    const filename = `${imageId}.jpg`; // Adjust file extension as needed
    await downloadImage(imageUrl, filename);
  }
};

processImages();
