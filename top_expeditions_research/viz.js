
    
   // Array of relative paths for JSON files - 1 for every expedition
const jsonFiles = [
    './expeditions_downloaded_arrays/data_AlbatrossPhilippineExp_2b.json',
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
    './expeditions_downloaded_arrays/data_PhilippineExp_extra.json'
];

// Function to fetch and merge JSON data
function fetchJsonData() {
    Promise.all(jsonFiles.map(url => fetch(url).then(response => response.json())))
    .then(dataArrays => {
        const mergedData = [].concat(...dataArrays);
        console.log(mergedData); // Check if data is as expected
        createChart(mergedData); // Call your chart creation function
    })
    
}
// Call the function to fetch data
fetchJsonData();
function createChart(data) {
    // Step 1: Group data by expedition name and count the number of entries per expedition
    const expeditionData = d3.rollup(
        data,
        v => v.length, // Count the number of entries per expedition
        d => d.expedition_name_2 // Group by expedition name
    );

    // Convert the Map to an array for easy manipulation
    const chartData = Array.from(expeditionData, ([expedition, count]) => ({
        expedition,
        count
    }));

    // Step 2: Set up SVG dimensions
    const margin = { top: 20, right: 30, bottom: 40, left: 50 };
    const width = 800 - margin.left - margin.right;
    const height = 800 - margin.top - margin.bottom;

    // Step 3: Create the SVG canvas
    const svg = d3.select('svg')
        .attr('width', width + margin.left + margin.right)
        .attr('height', height + margin.top + margin.bottom)
        .append('g')
        .attr('transform', `translate(${margin.left},${margin.top})`);

    // Step 4: Define scales
    const x = d3.scaleBand()
        .domain(chartData.map(d => d.expedition))
        .range([0, width])
        .padding(0.1);

    const y = d3.scaleLinear()
        .domain([0, d3.max(chartData, d => d.count)])
        .nice()
        .range([height, 0]);

    // Step 5: Create the bars
    svg.selectAll('.bar')
        .data(chartData)
        .enter().append('rect')
        .attr('class', 'bar')
        .attr('x', d => x(d.expedition))
        .attr('y', d => y(d.count))
        .attr('width', x.bandwidth())
        .attr('height', d => height - y(d.count))
        .attr('fill', 'steelblue');

    // Step 6: Add the x-axis
    svg.append('g')
        .attr('class', 'axis axis--x')
        .attr('transform', `translate(0,${height})`)
        .call(d3.axisBottom(x))
        .selectAll("text")
        .attr("y", 0)
        .attr("x", 9)
        .attr("dy", ".35em")
        .attr("transform", "rotate(45)")
        .style("text-anchor", "start");

    // Step 7: Add the y-axis
    svg.append('g')
        .attr('class', 'axis axis--y')
        .call(d3.axisLeft(y).ticks(10));

    // Optional: Add y-axis label
    svg.append('text')
        .attr('transform', 'rotate(-90)')
        .attr('y', -margin.left + 10)
        .attr('x', -height / 2)
        .attr('dy', '1em')
        .attr('text-anchor', 'middle')
        .text('Number of Artifacts');
}
