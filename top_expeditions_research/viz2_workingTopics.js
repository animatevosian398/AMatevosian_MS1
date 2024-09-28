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

function fetchJsonData() {
    Promise.all(jsonFiles.map(url => fetch(url).then(response => response.json())))
        .then(dataArrays => {
            const mergedData = [].concat(...dataArrays);
            console.log(mergedData);

            // Group by expedition_name_2
            const groupedByExpedition = d3.group(mergedData, d => d.expedition_name_2);

            // Log topics for each expedition
            groupedByExpedition.forEach((values, key) => {
                const topics = [...new Set(values.map(v => v.topic).filter(t => t))]; // Get unique topics
                console.log(`Expedition: ${key}, Topics:`, topics);
            });

            // Call createChart if needed here
            createChart(mergedData); 
        })
        .catch(error => console.error('Error fetching JSON files:', error));
}

// Call the function to fetch data
fetchJsonData();

function createChart(data) {
    // Step 1: Group data by expedition and count topics
    const topicData = d3.rollup(
        data.filter(d => d.topic), // Filter out entries without a topic
        v => d3.rollup(v, subV => subV.length, d => d.topic), // Count topics per expedition
        d => d.expedition_name_2 // Group by expedition name
    );

    // Convert the Map to an array for easy manipulation
    const chartData = Array.from(topicData, ([expedition, topics]) => ({
        expedition,
        topics: Array.from(topics).map(([topic, count]) => ({ topic, count }))
    }));

    const allTopics = [...new Set(chartData.flatMap(d => d.topics.map(t => t.topic)))];
    const stackedData = d3.stack()
        .keys(allTopics)
        (chartData.map(d => {
            const topicCounts = Object.fromEntries(d.topics.map(t => [t.topic, t.count]));
            const filledCounts = Object.fromEntries(allTopics.map(topic => [topic, topicCounts[topic] || 0]));
            
            return {
                expedition: d.expedition,
                ...filledCounts
            };
        }));

    // Step 2: Set up SVG dimensions
    const margin = { top: 20, right: 30, bottom: 100, left: 50 }; // Increased bottom margin for the legend
    const width = 800 - margin.left - margin.right;
    const height = 900 - margin.top - margin.bottom;

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
        
    const maxY = d3.max(stackedData, d => d3.max(d, layer => layer[1]));
    const y = d3.scaleLinear()
        .domain([0, maxY || 0]) // Default to 0 if maxY is NaN
        .nice()
        .range([height, 0]);
        
    const color = d3.scaleOrdinal(d3.schemeCategory10);

    // Step 5: Create the stacked bars
    svg.selectAll('.layer')
        .data(stackedData)
        .enter().append('g')
        .attr('class', 'layer')
        .attr('fill', (d, i) => color(i))
        .selectAll('rect')
        .data(d => d)
        .enter().append('rect')
        .attr('x', d => x(d.data.expedition))
        .attr('y', d => y(d[1]))
        .attr('height', d => {
            const heightValue = y(d[0]) - y(d[1]);
            return isNaN(heightValue) || heightValue < 0 ? 0 : heightValue;
        })
        .attr('width', x.bandwidth());

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
        .text('Count of Topics');

    // Call createLegend after creating the chart
    createLegend(svg, allTopics, color, height);
}

function createLegend(svg, topics, color, height) {
    const legend = svg.append('g')
        .attr('transform', `translate(0, ${height + 20})`); // Adjust position as needed

    const legendItem = legend.selectAll('.legend-item')
        .data(topics)
        .enter().append('g')
        .attr('class', 'legend-item')
        .attr('transform', (d, i) => `translate(0, ${i * 20})`); // Adjust spacing

    legendItem.append('rect')
        .attr('x', 0)
        .attr('width', 18)
        .attr('height', 18)
        .style('fill', (d, i) => color(i)); // Use your color scale

    legendItem.append('text')
        .attr('x', 25) // Position text next to the square
        .attr('y', 14) // Align text vertically
        .text(d => d); // Use topic name
}
