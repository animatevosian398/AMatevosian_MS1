// Array of relative paths for JSON files
const jsonFiles = [
    './expeditions_downloaded_arrays/data_PhilippineExp_2.json',
    './expeditions_downloaded_arrays/data_ANSMET_4.json',
    './expeditions_downloaded_arrays/data_ASLAR_5.json',
    './expeditions_downloaded_arrays/data_BIMP_3.json',
    './expeditions_downloaded_arrays/data_CABP_10.json',
    './expeditions_downloaded_arrays/data_CCRE_13.json',
    './expeditions_downloaded_arrays/data_CGPS_22.json',
    './expeditions_downloaded_arrays/data_IIOE_19.json',
    './expeditions_downloaded_arrays/data_LMRS_11.json',
    './expeditions_downloaded_arrays/data_MAFLA_6.json',
    './expeditions_downloaded_arrays/data_NEEB_12.json',
    './expeditions_downloaded_arrays/data_NGOMCS_16.json',
    './expeditions_downloaded_arrays/data_NorthwesternPacificExp_20.json',
    './expeditions_downloaded_arrays/data_OceanAcreExpedition_15.json',
    './expeditions_downloaded_arrays/data_PalearcticMigBird_17.json',
    './expeditions_downloaded_arrays/data_POSP_14.json',
    './expeditions_downloaded_arrays/data_SABP_9.json',
    './expeditions_downloaded_arrays/data_SmithsonianSTRI_Panama_18.json',
    './expeditions_downloaded_arrays/data_SOFLA_7.json',
    './expeditions_downloaded_arrays/data_STOCS_8.json',   
    './expeditions_downloaded_arrays/data_US_Exploring_Exp_21.json',
    './expeditions_downloaded_arrays/data_USAP_object_1.json',
    // './expeditions_downloaded_arrays/data_PacificOceanBiologicalSurvey.json'
];

// Fetch JSON data for all expedition files
async function fetchJsonData() {
    const promises = jsonFiles.map(file => fetch(file).then(response => response.json()));
    const allData = await Promise.all(promises);

    // Flatten the data array
    const expeditionsData = allData.flat();

    // Filter and aggregate data
    const filteredData = expeditionsData.filter(expedition => expedition.unitCode);
    const aggregatedData = aggregateData(filteredData);

    console.log(aggregatedData);  // Debugging output
    createStackedBarChart(aggregatedData);
}

// Aggregate data by expedition name and unit code
function aggregateData(expeditionsData) {
    const aggregated = {};

    expeditionsData.forEach(expedition => {
        const name = expedition.expedition_name_2;
        const unitCode = expedition.unitCode;

        if (!aggregated[name]) {
            aggregated[name] = {};
        }

        if (!aggregated[name][unitCode]) {
            aggregated[name][unitCode] = 0;
        }
        aggregated[name][unitCode]++;
    });

    // Convert to array format for the chart
    return Object.entries(aggregated).map(([expedition, unitCodes]) => ({
        expedition,
        unitCodes: Object.entries(unitCodes).map(([code, count]) => ({ code, count }))
    }));
}
function sanitizeName(name) {
    return name
        .toLowerCase() // Convert to lowercase
        .replace(/[^a-z0-9]+/g, '-') // Replace non-alphanumeric characters with hyphens
        .replace(/^-+|-+$/g, ''); // Remove leading and trailing hyphens
}
const expeditionImages = {
    "United States Exploring Expedition": {
        description: "Description for United States Exploring Expedition",
        imageUrls: [
            "https://ids.si.edu/ids/deliveryService/id/ark:/65665/m351b4295fcb5d440ba0b1e6b4e23066c3",
            "https://collections.nmnh.si.edu/media/?irn=14443814",
            "https://ids.si.edu/ids/deliveryService/id/ark:/65665/m3652e42a90b10401c86182551bdc87442",
            "https://ids.si.edu/ids/deliveryService/id/ark:/65665/m35e086d83cb32407bb3efd801bef57a2c",
        ]
    },
    "United States Antarctic Program (USAP)": {
        description: "Description for United States Antarctic Program",
        imageUrls: [
            "https://ids.si.edu/ids/deliveryService/id/ark:/65665/m3afb2be27a6564539be5216bc4903f1b1",
            "https://ids.si.edu/ids/deliveryService/id/ark:/65665/m347ddaa8be3da4ef5944536f27fcc6298",
            "https://ids.si.edu/ids/deliveryService/id/ark:/65665/m3f53a31aa75a94e379da94928fcc61911",
            "https://ids.si.edu/ids/deliveryService/id/ark:/65665/m365dfaefcea32410eabd29c4c59c3ae5f",
        ]
    },
    "Georges Bank Benthic Infauna Monitoring Program (BIMP)": {
        description: "Description for Georges Bank Benthic Infauna Monitoring Program",
        imageUrls: [
            "https://ids.si.edu/ids/deliveryService/id/ark:/65665/m30fce46c48a204a6684292b21b841f5cc",
            "https://ids.si.edu/ids/deliveryService/id/ark:/65665/m3567af3abd2b54262bb3a097ba8296b20",
            "https://ids.si.edu/ids/deliveryService/id/ark:/65665/m3331dc8cb0eeb4e47983c15ee38a992da",
            "https://ids.si.edu/ids/deliveryService/id/ark:/65665/m3a15984cec6f44eb98d29934c7fd3d16d",
        ]
    },
    "International Indian Ocean Expedition (IIOE)": {
        description: "Description for International Indian Ocean Expedition",
        imageUrls: [
            "https://collections.nmnh.si.edu/media/?irn=15812409",
            "https://ids.si.edu/ids/deliveryService/id/ark:/65665/m3acaba9c826094e189904cef4a15cc3b8",
            "https://ids.si.edu/ids/deliveryService/id/ark:/65665/m30b5cd54324974a649a29b3e24796c309",
            "https://ids.si.edu/ids/deliveryService/id/ark:/65665/m3c7856ce17ab64f2591d653e5ef80dcb8",
        ]
    },
    "New England Environmental Benchmark Program (NEEB)": {
        description: "Description for New England Environmental Benchmark Program",
        imageUrls: [
            "No Images Found in Collection",
            "No Images Found in Collection",
            "No Images Found in Collection",
            "No Images Found in Collection",
        ]
    },
    "Northwestern Pacific Expedition": {
        description: "Description for Northwestern Pacific Expedition",
        imageUrls: [
            "https://ids.si.edu/ids/deliveryService/id/ark:/65665/m33e9a75d187a9497db46c98fe4c21e911",
            "https://ids.si.edu/ids/deliveryService/id/ark:/65665/m3f4984a3d5a2345bd9582bd8b735e4b42",
            "https://ids.si.edu/ids/deliveryService/id/ark:/65665/m35d66dd86e11d4522bcc806190fffc5d0",
            "https://ids.si.edu/ids/deliveryService/id/ark:/65665/m3c0b278c8f1a8467bb7142ac05f5f3667",
        ]
    },
    "Ocean Acre Expedition": {
        description: "Description for Ocean Acre Expedition",
        imageUrls: [
            "No Images Found in Collection",
            "No Images Found in Collection",
            "No Images Found in Collection",
            "No Images Found in Collection",
        ]
    },
    "Palearctic Migratory Bird Survey": {
        description: "Description for Palearctic Migratory Bird Survey",
        imageUrls: [
            "https://ids.si.edu/ids/deliveryService/id/ark:/65665/m3bde366dfbbd8446688706c66fbf27ea4",
            "https://collections.nmnh.si.edu/media/?irn=15812601",
            "https://collections.nmnh.si.edu/media/?irn=15807109",
            "https://ids.si.edu/ids/deliveryService/id/ark:/65665/m352b6667ee1964e8882eca9386d26d696",
        ]
    },
    "Panama Oil Spill Program (POSP)": {
        description: "Description for Panama Oil Spill Program",
        imageUrls: [
            "https://ids.si.edu/ids/deliveryService/id/ark:/65665/m3259cb8b9f8654de9a8f4950acff27ae1",
            "https://ids.si.edu/ids/deliveryService/id/ark:/65665/m37ba557b6fe704ada9109c122874e8374",
            "https://ids.si.edu/ids/deliveryService/id/ark:/65665/m38d93c11bccb54d40b4b287a38deaf977",
            "https://ids.si.edu/ids/deliveryService/id/ark:/65665/m3faa6a9ed1b594c59855cb9501fbdef32",
        ]
    },
    "South Atlantic Benchmark Program (SABP)": {
        description: "Description for South Atlantic Benchmark Program",
        imageUrls: [
            "https://ids.si.edu/ids/deliveryService/id/ark:/65665/m30b7151b8ac254965a8288ba5c8b88406",
            "https://ids.si.edu/ids/deliveryService/id/ark:/65665/m30bc0ef6d5dc245d89e201fddaee72cf0",
            "https://ids.si.edu/ids/deliveryService/id/ark:/65665/m3a5f3ba03d97e47dab3f3201534e58513",
            "https://ids.si.edu/ids/deliveryService/id/ark:/65665/m3bb42981bcc7642b2bb4773b97462133b",
        ]
    },
    "Smithsonian STRI Panama Survey": {
        description: "Description for Smithsonian STRI Panama Survey",
        imageUrls: [
            "https://ids.si.edu/ids/deliveryService/id/ark:/65665/m390712e32933240cfa1e83ec1a0ff1c7c",
            "https://ids.si.edu/ids/deliveryService/id/ark:/65665/m3986ab47c46b24073a66f6a04b7401769",
            "https://ids.si.edu/ids/deliveryService/id/ark:/65665/m3255ba394f2b840ce94c48290a79feedd",
            "https://ids.si.edu/ids/deliveryService/id/ark:/65665/m32195177915e940d58144887a6c5d67e6",
        ]
    },
    "Albatross Philippine Expedition": {
        description: "Description for Albatross Philippine Expedition",
        imageUrls: [
            "https://ids.si.edu/ids/deliveryService/id/ark:/65665/m3043427a6370049a58b2aafbeffc83bf2",
            "https://ids.si.edu/ids/deliveryService/id/ark:/65665/m3cecabc44e1a644968a6f177fd3c63a83",
            "https://ids.si.edu/ids/deliveryService/id/ark:/65665/m322317822c7304abf874e146314e108c4",
            "https://ids.si.edu/ids/deliveryService/id/ark:/65665/m3a378cdc40b1249cab0ac4152bd384350",
        ]
    },
};

// function createStackedBarChart(data) {
//     const margin = { top: 30, right: 50, bottom: 40, left: 280 }; // Increased right margin
//     const width = 1000 - margin.left - margin.right; // Adjusted width
//     const height = 650 - margin.top - margin.bottom;

//     const svg = d3.select("#chart")
//         .attr("viewBox", `0 0 ${width + margin.left + margin.right} ${height + margin.top + margin.bottom}`)
//         .attr("preserveAspectRatio", "xMidYMid meet")
//         .classed("svg-content-responsive", true);

//     const chartGroup = svg.append("g")
//         .attr("transform", `translate(${margin.left},${margin.top})`);

//     const x = d3.scaleLinear()
//         .domain([0, d3.max(data, d => d3.sum(d.unitCodes, d => d.count))])
//         .range([0, width]);

//     const y = d3.scaleBand()
//         .domain(data.map(d => d.expedition))
//         .range([0, height])
//         .padding(0.1);

//     const unitCodes = [...new Set(data.flatMap(d => d.unitCodes.map(u => u.code)))];
//     const color = d3.scaleOrdinal()
//         .domain(unitCodes)
//         .range(d3.schemeCategory10);

//     chartGroup.append("g").call(d3.axisLeft(y));
//     chartGroup.append("g")
//         .attr("transform", `translate(0,${height})`)
//         .call(d3.axisBottom(x).ticks(10).tickSize(5).tickPadding(15)); // Increased tick padding

//     const barsGroup = chartGroup.append("g");

//     data.forEach(expedition => {
//         let x0 = 0;  
//         barsGroup.selectAll(`.bar-${sanitizeName(expedition.expedition)}`)
//             .data(expedition.unitCodes)
//             .enter().append("rect")
//             .attr("y", y(expedition.expedition))
//             .attr("x", d => {
//                 const pos = x(x0);
//                 x0 += d.count;
//                 return pos;
//             })
//             .attr("height", y.bandwidth())
//             .attr("width", d => x(d.count))
//             .attr("fill", d => color(d.code)); // Set fill color based on unit code
//     });

//     // Add the legend
//     const legend = svg.append("g")
//         .attr("transform", `translate(${width + margin.right / 2}, ${margin.top})`);

//     unitCodes.forEach((code, i) => {
//         legend.append("rect")
//             .attr("x", 0)
//             .attr("y", i * 20) // Adjust spacing between legend items
//             .attr("width", 18)
//             .attr("height", 18)
//             .attr("fill", color(code));

//         legend.append("text")
//             .attr("x", 25)
//             .attr("y", i * 20 + 15) // Center the text vertically
//             .text(code);
//     });
// }


// // // Call the fetchJsonData function to initiate data fetching
fetchJsonData();





// async function fetchBimpData() {
//     const file = './expeditions_downloaded_arrays/data_US_Exploring_Exp_21.json'; // Update with your actual path
//     try {
//         const response = await fetch(file);
//         const expeditionsData = await response.json();

//         // If the data is wrapped in a specific structure, adjust accordingly
//         const bimpData = expeditionsData.flat(); // or expeditionsData.data if there's a nested structure

//         // Filter for non-empty ImageDownload
//         const imagesAvailable = bimpData.filter(expedition => expedition.ImageDownload && expedition.ImageDownload.trim() !== "");

//         console.log(imagesAvailable); // Debugging output for entries with non-empty ImageDownload
//     } catch (error) {
//         console.error('Error fetching BIMP data:', error);
//     }
// }

// // Call the function to initiate data fetching for BIMP
// fetchBimpData();
function createStackedBarChart(data) {
    const margin = { top: 30, right: 50, bottom: 40, left: 280 };
    const width = 1000 - margin.left - margin.right;
    const height = 650 - margin.top - margin.bottom;

    const svg = d3.select("#chart")
        .attr("preserveAspectRatio", "xMidYMid meet")
        .classed("svg-content-responsive", true);

    const chartGroup = svg.append("g")
        .attr("transform", `translate(${margin.left},${margin.top})`);

    const x = d3.scaleLinear()
        .domain([0, d3.max(data, d => d3.sum(d.unitCodes, d => d.count))])
        .range([0, width]);

    const y = d3.scaleBand()
        .domain(data.map(d => d.expedition))
        .range([0, height])
        .padding(0.1);

    const unitCodes = [...new Set(data.flatMap(d => d.unitCodes.map(u => u.code)))];
    const color = d3.scaleOrdinal()
        .domain(unitCodes)
        .range(d3.schemeCategory10);

    chartGroup.append("g").call(d3.axisLeft(y));
    chartGroup.append("g")
        .attr("transform", `translate(0,${height})`)
        .call(d3.axisBottom(x).ticks(10).tickSize(5).tickPadding(15));

    const barsGroup = chartGroup.append("g");

    data.forEach(expedition => {
        let x0 = 0;

        // Draw the bars
        barsGroup.selectAll(`.bar-${sanitizeName(expedition.expedition)}`)
            .data(expedition.unitCodes)
            .enter().append("rect")
            .attr("y", y(expedition.expedition))
            .attr("x", d => {
                const pos = x(x0);
                x0 += d.count;
                return pos;
            })
            .attr("height", y.bandwidth())
            .attr("width", d => x(d.count))
            .attr("fill", d => color(d.code));

        // Add images
        const images = expeditionImages[expedition.expedition] || {};
        if (images.imageUrls) {
            images.imageUrls.forEach((imgUrl, index) => {
                chartGroup.append("image")
                    .attr("xlink:href", imgUrl)
                    .attr("x", width + margin.right / 2) // Positioning images
                    .attr("y", y(expedition.expedition) + index * 20) // Adjust vertical position
                    .attr("width", 50) // Set image width
                    .attr("height", 50) // Set image height
                    .attr("opacity", 0.8);
            });
        }
    });

    // Add the legend
    const legend = svg.append("g")
        .attr("transform", `translate(${width + margin.right / 2}, ${margin.top})`);

    unitCodes.forEach((code, i) => {
        legend.append("rect")
            .attr("x", 0)
            .attr("y", i * 20)
            .attr("width", 18)
            .attr("height", 18)
            .attr("fill", color(code));

        legend.append("text")
            .attr("x", 25)
            .attr("y", i * 20 + 15)
            .text(code);
    });
}
