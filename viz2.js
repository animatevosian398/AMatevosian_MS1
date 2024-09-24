
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
const expectedExpeditionNames = [
    "United States Antarctic Program (USAP)",
    "Albatross Philippine Expedition",
    "Georges Bank Benthic Infauna Monitoring Program (BIMP)",
    "Antarctic Search for Meteorites (ANSMET)",
    "Atlantic Slope and Rise Program (ASLAR)",
    "Mississippi, Alabama, Florida (MAFLA) Survey",
    "Southwest Florida Shelf Ecosystem Study (SOFLA)",
    "South Texas Outer Continental Shelf (STOCS) Study",
    "South Atlantic Benchmark Program (SABP)",
    "Central Atlantic Benchmark Program (CABP)",
    "South Atlantic Outer Continental Shelf Living Marine (LMRS)",
    "New England Environmental Benchmark Program (NEEB)",
    "CCRE - Caribbean Coral Reef Ecosystems, Belize",
    "Panama Oil Spill Program (POSP)",
    "Ocean Acre Expedition",
    "Northern Gulf of Mexico Continental Slope Study (NGOMCS)",
    "Palearctic Migratory Bird Survey",
    "Smithsonian STRI Panama Survey",
    "International Indian Ocean Expedition (IIOE)",
    "Northwestern Pacific Expedition",
    "United States Exploring Expedition",
    "Central Gulf Platform Study (CGPS)"
];

// Fetch JSON data and create visualizations
function fetchJsonData() {
    Promise.all(jsonFiles.map(url => 
        fetch(url)
            .then(response => response.json())
            .then(data => {
                const uniqueEntries = [];
                const seenIds = new Set();
                
                data.forEach(entry => {
                    if (!seenIds.has(entry.id)) {
                        seenIds.add(entry.id);
                        uniqueEntries.push(entry);
                    }
                });

                const expeditionName = uniqueEntries[0]?.expedition_name_2; // Use optional chaining for safety
                const expeditionYear = getExpeditionYear(expeditionName);
                
                const uniqueExpeditionNames = uniqueEntries.map(entry => entry.expedition_name_2);
                const normalizedUniqueNames = uniqueExpeditionNames.map(name => name.trim().toLowerCase());
                const normalizedExpectedNames = expectedExpeditionNames.map(name => name.trim().toLowerCase());

                const missingExpeditions = normalizedUniqueNames.filter(name => !normalizedExpectedNames.includes(name));

                return {
                    expedition: expeditionName,
                    year: expeditionYear,
                    artifactCount: uniqueEntries.length
                };
            })
    ))
    .then(expeditionsData => {
        const sortedByYear = expeditionsData.sort((a, b) => a.year - b.year);
        createBarChart(sortedByYear);
        createTimeline(sortedByYear);
    })
    .catch(error => console.error('Error fetching JSON files:', error));
    
    // This logging should be moved inside the map function for proper context
    jsonFiles.forEach((url, index) => {
        console.log(`Checking URL ${index + 1}: ${url}`);
    });
}

const originalBarWidth = 800; // Original bar chart width
const originalBarHeight = 400; // Original bar chart height
const originalTimelineWidth = 800; // Original timeline width
const originalTimelineHeight = 200; // Original timeline height

// Scale up by 10%
const barWidth = originalBarWidth * 1.1;
const barHeight = originalBarHeight * 1.1;
const timelineWidth = originalTimelineWidth * 1.1;
const timelineHeight = originalTimelineHeight * 1.1;

// Create bar chart
let currentHighlightedBar = null; // To keep track of the highlighted bar

function createBarChart(data) {
    const parseTime = d3.timeParse("%Y");

    // Sort data by year in ascending order
    data.sort((a, b) => parseTime(a.year) - parseTime(b.year));

    const margin = { top: 30, right: 30, bottom: 40, left: 350 };
    const width = 900 - margin.left - margin.right; 
    const height = 700 - margin.top - margin.bottom; 
    const svg = d3.select("#chart")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", `translate(${margin.left},${margin.top})`);

    const x = d3.scaleLinear()
        .domain([0, d3.max(data, d => d.artifactCount)])
        .range([0, width]);

    const y = d3.scaleBand()
        .domain(data.map(d => d.expedition))
        .range([0, height])
        .padding(0.1);

    svg.append("g")
        .attr("transform", `translate(0,${height})`)
        .call(d3.axisBottom(x));

    // Create labels initially
    const labels = svg.selectAll('.label')
    .data(data)
    .enter()
    .append('text')
    .attr('class', 'label')
    .attr('x', -10) 
    .attr('y', d => y(d.expedition) + y.bandwidth() / 2) 
    .attr('dy', '.35em') 
    .text(d => d.expedition) 
    .style('font-size', '12px')
    .style('text-anchor', 'end')
    .style('fill-opacity', 0.2)  // Initially faded
    .on("mouseover", (event, d) => {
        tooltip.style("visibility", "visible")
            .html(`<strong>${d.expedition}</strong><br/>Artifacts: ${d.artifactCount}`)
            .style("left", (event.pageX + 5) + "px")
            .style("top", (event.pageY - 28) + "px");

        // Fill the corresponding dot
        d3.select(`.expedition-point-${d.expedition}`)
            .classed('hover', true); // Add the hover class

        highlightBar(d.expedition);
    })
    .on("mouseout", (event, d) => {
        tooltip.style("visibility", "hidden");
        d3.select(`.expedition-point-${d.expedition}`)
            .classed('hover', false); // Remove the hover class

        highlightBar(null);
    })

    const bars = svg.selectAll("rect")
        .data(data)
        .enter()
        .append("rect")
        .attr("x", 0)
        .attr("y", d => y(d.expedition))
        .attr("height", y.bandwidth())
        .attr("width", d => x(d.artifactCount))
        .attr("fill", "steelblue")
        .style('fill-opacity', 0.3)
        .on("click", (event, d) => {
            showImageCard(d.expedition); // Call showImageCard on click
        });
         // Highlight function
    function highlightBar(expedition) {
        bars.transition()
            .duration(200)
            .style("fill", d => d.expedition === expedition ? "orange" : "steelblue");

        labels.transition()
            .duration(200)
            .style("fill-opacity", d => d.expedition === expedition ? 1 : 0.2);
            // Highlight the corresponding dot on the timeline
        d3.selectAll(".expedition-point").transition()
        .duration(200)
        .attr("fill", d => d.expedition === expedition ? "grey" : "none");


    }
    bars.on("click", function(event, d) {
        const expeditionName = d.expedition; // Ensure this matches your data structure
        console.log("Clicked expedition:", expeditionName); // Log for debugging
    
        showImageCard(expeditionName); // Call to display images
    });
    

    // Mouseover event for bars
    bars.on('mouseover', function(event, d) {
    labels.filter(data => data === d)
        .style('fill-opacity', 1);  // Darken the label

    highlightBar(d.expedition);
    })
    .on('mouseout', function(event, d) {
    labels.filter(data => data === d)
        .style('fill-opacity', 0.7);  // Back to faded

    highlightBar();  
    
    })
   

// Optional: Mouseover event for labels
labels.on('mouseover', function(event, d) {
bars.filter(data => data === d)
    .style('fill-opacity', 1);  // Darken the bar

d3.select(this)
    .style('fill-opacity', 1);  // Darken the label
})

.on('mouseout', function(event, d) {
bars.filter(data => data === d)
    .style('fill-opacity', 0.3);  // Back to faded

d3.select(this)
    .style('fill-opacity', 0.2);  // Back to faded
});

// Store the highlight function for external use
return highlightBar;}

// Create the tooltip element
const tooltip = d3.select("#tooltip");

// Update the createTimeline function
function createTimeline(data) {
    const margin = { top: 20, right: 30, bottom: 40, left: 70 };
    const width = 200 - margin.left - margin.right;
    const height = 700 - margin.top - margin.bottom;

    const svg = d3.select("#timeline")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", `translate(${margin.left},${margin.top})`);

    const parseTime = d3.timeParse("%Y");
    const yScale = d3.scaleTime()
    .domain([d3.max(data, d => parseTime(d.year)), d3.min(data, d => parseTime(d.year))])
    .range([height, 0]);


    svg.append("line")
        .attr("x1", width / 2)
        .attr("y1", 0)
        .attr("x2", width / 2)
        .attr("y2", height)
        .attr("stroke", "black")
        .attr("stroke-width", 2);

    const highlightBar = createBarChart(data);

    //TIMELINE POINTS
    // Timeline points with combined mouseover events
svg.selectAll(".expedition-point")
.data(data)
.enter()
.append("circle")
.attr("class", "expedition-point")
.attr("cx", width / 2)
.attr("cy", d => yScale(parseTime(d.year)))
.attr("r", 5)
.attr("stroke", "grey")
.attr("fill", "none")
.on("mouseover", (event, d) => {
    tooltip.style("visibility", "visible")
           .html(`<strong>${d.expedition}</strong><br/>Year: ${d.year}`)
           .style("left", (event.pageX + 5) + "px")
           .style("top", (event.pageY - 28) + "px");

    d3.select(event.target).attr("fill", "grey");
    highlightBar(d.expedition); // Highlight the corresponding bar
    showImageCard(d.expedition); // Show related images
})
.on("mousemove", (event) => {
    tooltip.style("left", (event.pageX + 5) + "px")
           .style("top", (event.pageY - 28) + "px");
})
.on("mouseout", (event) => {
    tooltip.style("visibility", "hidden");
    d3.select(event.target).attr("fill", "none");
    highlightBar(null);
});




    const startYear = d3.min(data, d => d.year);
    const endYear = d3.max(data, d => d.year);

    for (let year = startYear; year <= endYear; year += 5) {
        svg.append("text")
            .attr("class", "year-label")
            .attr("x", width / 2 - 40)
            .attr("y", yScale(parseTime(year)))
            .attr("dy", ".35em")
            .text(year)
            .style("font-size", "12px")
            .attr("fill", "black");
    }
}

// Call the function to fetch data and create visualizations
fetchJsonData();
// Map expedition names to their respective years
function getExpeditionYear(expeditionName) {
    const expeditionYears = {
        "United States Antarctic Program (USAP)": 1956,
        "Albatross Philippine Expedition": 1907,
        "Georges Bank Benthic Infauna Monitoring Program (BIMP)": 1981,
        "Antarctic Search for Meteorites (ANSMET)": 1976,
        "Atlantic Slope and Rise Program (ASLAR)": 1984,
        "Mississippi, Alabama, Florida (MAFLA) Survey": 1975,
        "Southwest Florida Shelf Ecosystem Study (SOFLA)": 1980,
        "South Texas Outer Continental Shelf (STOCS) Study": 1975,
        "South Atlantic Benchmark Program (SABP)": 1977,
        "Central Atlantic Benchmark Program (CABP)": 1975,
        "South Atlantic Outer Continental Shelf Living Marine (LMRS)": 1980,
        "New England Environmental Benchmark Program (NEEB)": 1977,
        "CCRE - Caribbean Coral Reef Ecosystems, Belize": 1972,
        "Panama Oil Spill Program (POSP)": 1986,
        "Ocean Acre Expedition": 1962,
        "Northern Gulf of Mexico Continental Slope Study (NGOMCS)": 1983,
        "Palearctic Migratory Bird Survey": 1966,
        "Smithsonian STRI Panama Survey": 1910,
        "International Indian Ocean Expedition (IIOE)": 1959,
        "Northwestern Pacific Expedition": 1853,
        "United States Exploring Expedition": 1838,
        "Central Gulf Platform Study (CGPS)": 1978,
    };

    return expeditionYears[expeditionName] || null; // Return null if not found
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


function showImageCard(expeditionName) {
        const expeditionData = expeditionImages[expeditionName];
        console.log("Expedition Data:", expeditionData);
        if (!expeditionData) {
            console.error(`No data found for expedition: ${expeditionName}`);
            return;}
       
    // Populate the card with data
    document.getElementById('expedition-title').innerText = expeditionName; // Display the expedition name
    document.getElementById('expedition-description').innerText = expeditionData.description; // Description
    const cardContainer = document.getElementById('image-card');
    const titleElement = document.getElementById('expedition-title');
    const descriptionElement = document.getElementById('expedition-description');
    const imageContent = document.getElementById('image-content');

    titleElement.textContent = expeditionName;
    descriptionElement.textContent = expeditionData.description;
    imageContent.innerHTML = ''; // Clear existing images

    // Loop through each image URL and create an image element
    expeditionData.imageUrls.forEach(imgURL => {
        const imgElement = document.createElement('img');

        imgElement.src = imgURL; // Assign the URL
        imgElement.alt = expeditionName;
        imgElement.style.width = '100%'; // Set width for visibility
        imgElement.style.height = 'auto'; // Maintain aspect ratio

        // Add click event to open modal for larger view
        imgElement.addEventListener('click', () => {
            const modal = document.getElementById('modal');
            const modalImage = document.getElementById('modal-image');
            modalImage.src = imgElement.src; // Set modal image source
            modal.style.display = 'flex'; // Show modal
        });

        imageContent.appendChild(imgElement); // Add to grid
    });

    // Show the card
    cardContainer.style.display = "block"; // Show the card
}
// Close button event listener
document.getElementById("closeImageCard").addEventListener("click", function() {
    document.getElementById("image-card").style.display = "none"; // Corrected ID
});

// Close modal when clicked
document.getElementById('modal').addEventListener('click', () => {
    document.getElementById('modal').style.display = 'none'; // Hide modal
});


// // Consolidate the mouseover and mouseout functions for better readability and maintenance
// function setupEventHandlers(elements, highlightFunction, showTooltip) {
//     elements
//         .on("mouseover", function(event, d) {
//             showTooltip(event, d);  // Call tooltip function
//             highlightFunction(d.expedition);  // Highlight corresponding elements
//         })
//         .on("mouseout", function() {
//             hideTooltip();  // Hide tooltip on mouse out
//             highlightFunction(null);  // Reset highlight
//         });
// }

function setupEventHandlers(elements, highlightFunction, showTooltip) {
    elements
        .on("mouseover", function(event, d) {
            highlightFunction(d.expedition); // Highlight corresponding elements
            showImageCard(d.expedition); // Show the card for the hovered expedition
            showTooltip(event, d); // Call tooltip function
        })
        .on("mouseout", function() {
            hideTooltip(); // Hide tooltip on mouse out
            highlightFunction(null); // Reset highlight
            document.getElementById('image-card').style.display = 'none'; // Hide the card on mouse out
        });
}



//TOOLTIP
function showTooltip(event, d) {
    const year = getExpeditionYear(d.expedition); // Get the year based on the expedition name
    tooltip.style("visibility", "visible")
        .html(`<strong>${d.expedition}</strong><br/>Year: ${year || 'Unknown'}`) // Handle unknown years gracefully
        .style("left", (event.pageX + 5) + "px")
        .style("top", (event.pageY - 28) + "px");
}


function hideTooltip() {
    tooltip.style("visibility", "hidden");
}




