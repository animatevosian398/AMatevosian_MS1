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
    './expeditions_downloaded_arrays/data_PacificOceanBiologicalSurvey.json'
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


// Create bar chart
let currentHighlightedBar = null; // To keep track of the highlighted bar

function createBarChart(data) {
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
        // .attr('fill', 'black')
        .style('text-anchor', 'end')
        .style('fill-opacity', 0.2);  // Initially faded

    const bars = svg.selectAll("rect")
        .data(data)
        .enter()
        .append("rect")
        .attr("x", 0)
        .attr("y", d => y(d.expedition))
        .attr("height", y.bandwidth())
        .attr("width", d => x(d.artifactCount))
        .attr("fill", "steelblue")
        .style('fill-opacity', 0.3);

         // Highlight function
    function highlightBar(expedition) {
        bars.transition()
            .duration(200)
            .style("fill", d => d.expedition === expedition ? "orange" : "steelblue");

        labels.transition()
            .duration(200)
            .style("fill-opacity", d => d.expedition === expedition ? 1 : 0.2);
    }
        

    // Mouseover event for bars
    bars.on('mouseover', function(event, d) {
        highlightBar(d.expedition);
    })
    .on('mouseout', function() {
        highlightBar();  // Reset
    });

    // Optional: Mouseover event for labels
    labels.on('mouseover', function(event, d) {
        highlightBar(d.expedition);
    })
    .on('mouseout', function() {
        highlightBar();  // Reset
    });



// // Highlight function
// function highlightBar(expedition) {
// bars.attr("fill", d => d.expedition === expedition ? "orange" : "steelblue");
// }

// Mouseover event for bars
bars.on('mouseover', function(event, d) {
labels.filter(data => data === d)
    .style('fill-opacity', 1);  // Darken the label

highlightBar(d.expedition);
})
.on('mouseout', function(event, d) {
labels.filter(data => data === d)
    .style('fill-opacity', 0.7);  // Back to faded

highlightBar();  // Reset
});

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

    svg.selectAll(".expedition-point")
    .data(data)
    .enter()
    .append("circle")
    .attr("class", "expedition-point")
    .attr("cx", width / 2)
    .attr("cy", d => yScale(parseTime(d.year)))
    .attr("r", 5)
    .attr("stroke", "grey") // Set the stroke color to make the circle visible
    .attr("fill", "none") 
    .on("mouseover", function(event, d) {
        highlightBar(d.expedition);
    })
    .on("mouseout", function() {
        highlightBar(null); // Reset opacity when not hovering
    })
    
      // No fill initially
    .on("mouseover", (event, d) => {
        tooltip.style("visibility", "visible") // Show the tooltip
               .text(d.expedition) // Set the text to the expedition name
               .style("left", (event.pageX + 5) + "px") // Position the tooltip
               .style("top", (event.pageY - 28) + "px");
        
        d3.select(event.target) // Fill the circle on hover
          .attr("fill", "grey"); 

        highlightBar(d.expedition); // Highlight the corresponding bar
    })
    .on("mousemove", (event) => {
        tooltip.style("left", (event.pageX + 5) + "px") // Update position
               .style("top", (event.pageY - 28) + "px");
    })
    .on("mouseout", (event) => {
        tooltip.style("visibility", "hidden"); // Hide the tooltip
        
        d3.select(event.target) // Remove the fill when not hovering
          .attr("fill", "none");

        highlightBar(null); // Reset highlight
    })
    .on("mouseover", (event, d) => {
        tooltip.style("visibility", "visible")
               .html(`<strong>${d.expedition}</strong><br/>Year: ${d.year}`)
               .style("left", (event.pageX + 5) + "px")
               .style("top", (event.pageY - 28) + "px");
    
        d3.select(event.target)
          .attr("fill", "grey");
    
        highlightBar(d.expedition);
    })
    
    ;



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

