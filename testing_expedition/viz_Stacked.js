// Array of relative paths for JSON files
const jsonFiles = [
  "./expeditions_downloaded_arrays/data_PhilippineExp_2.json",
  "./expeditions_downloaded_arrays/data_ANSMET_4.json",
  "./expeditions_downloaded_arrays/data_ASLAR_5.json",
  "./expeditions_downloaded_arrays/data_BIMP_3.json",
  "./expeditions_downloaded_arrays/data_CABP_10.json",
  "./expeditions_downloaded_arrays/data_CCRE_13.json",
  "./expeditions_downloaded_arrays/data_CGPS_22.json",
  "./expeditions_downloaded_arrays/data_IIOE_19.json",
  "./expeditions_downloaded_arrays/data_LMRS_11.json",
  "./expeditions_downloaded_arrays/data_MAFLA_6.json",
  "./expeditions_downloaded_arrays/data_NEEB_12.json",
  "./expeditions_downloaded_arrays/data_NGOMCS_16.json",
  "./expeditions_downloaded_arrays/data_NorthwesternPacificExp_20.json",
  "./expeditions_downloaded_arrays/data_OceanAcreExpedition_15.json",
  "./expeditions_downloaded_arrays/data_PalearcticMigBird_17.json",
  "./expeditions_downloaded_arrays/data_POSP_14.json",
  "./expeditions_downloaded_arrays/data_SABP_9.json",
  "./expeditions_downloaded_arrays/data_SmithsonianSTRI_Panama_18.json",
  "./expeditions_downloaded_arrays/data_SOFLA_7.json",
  "./expeditions_downloaded_arrays/data_STOCS_8.json",
  "./expeditions_downloaded_arrays/data_US_Exploring_Exp_21.json",
  "./expeditions_downloaded_arrays/data_USAP_object_1.json",
  // './expeditions_downloaded_arrays/data_PacificOceanBiologicalSurvey.json'
];
// function showTooltip(event, d) {
//   const year = getExpeditionYear(d.expedition); // Get the year based on the expedition name
//   tooltip
//     .style("visibility", "visible")
//     .html(`<strong>${d.expedition}</strong><br/>Year: ${year || "Unknown"}`) // Handle unknown years gracefully
//     .style("left", event.pageX + 5 + "px")
//     .style("top", event.pageY - 28 + "px");
// }

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
  "Central Gulf Platform Study (CGPS)",
];
function sanitizeName(name) {
  return name
    .toLowerCase() // Convert to lowercase
    .replace(/[^a-z0-9]+/g, "-") // Replace non-alphanumeric characters with hyphens
    .replace(/^-+|-+$/g, ""); // Remove leading and trailing hyphens
}
const expeditionImages = {
  "United States Exploring Expedition": {
    description:
      "Objectives: The U.S. Exploring expedition (1838-1842) set out to conduct scientific research and exploration, map uncharted areas, collect specimens that were unkonwn to Western science, and gather scientific data across botany, zoology, geology, and ethnography. Under the leadership of Lieutenant Charles Wilkes, the U.S. Exploring Expedition was one of the first to confirm the existence of the Antarctic continent. It established the United States as a significant player in global exploration and scientific research during the 19th century.",
    imageUrls: [
      "https://ids.si.edu/ids/deliveryService/id/ark:/65665/m351b4295fcb5d440ba0b1e6b4e23066c3",
      "https://collections.nmnh.si.edu/media/?irn=14443814",
      "https://ids.si.edu/ids/deliveryService/id/ark:/65665/m3652e42a90b10401c86182551bdc87442",
      "https://ids.si.edu/ids/deliveryService/id/ark:/65665/m35e086d83cb32407bb3efd801bef57a2c",
    ],
  },
  "United States Antarctic Program (USAP)": {
    description:
      "Objectives: The United States Antarctic Program (USAP) was established in 1956 and is ongoing, supporting scientific research in Antarctica. The program's objectives include studying the unique ecosystems, climate, geology, and glaciology of Antarctica, as well as understanding its role in global climate systems. USAP facilitates research on ice cores to track climate history, wildlife studies, astronomical observations, and research on the Southern Ocean.",
    imageUrls: [
      "https://ids.si.edu/ids/deliveryService/id/ark:/65665/m3afb2be27a6564539be5216bc4903f1b1",
      "https://ids.si.edu/ids/deliveryService/id/ark:/65665/m347ddaa8be3da4ef5944536f27fcc6298",
      "https://ids.si.edu/ids/deliveryService/id/ark:/65665/m3f53a31aa75a94e379da94928fcc61911",
      "https://ids.si.edu/ids/deliveryService/id/ark:/65665/m365dfaefcea32410eabd29c4c59c3ae5f",
    ],
  },
  "Georges Bank Benthic Infauna Monitoring Program (BIMP)": {
    description:
      "Objectives: The Georges Bank Benthic Infauna Monitoring Program (BIMP) (1981-1984) aimed to study the infaunal communities (organisms living within the seabed) of Georges Bank, a large elevated area of the seafloor off the coast of New England. The program sought to monitor and understand the ecological impacts of human activities, such as fishing and pollution, on benthic habitats, as well as natural changes over time. It provided valuable insights into the health and biodiversity of the seafloor ecosystem, contributing to the sustainable management of this important marine area.",
    imageUrls: [
      "https://ids.si.edu/ids/deliveryService/id/ark:/65665/m30fce46c48a204a6684292b21b841f5cc",
      "https://ids.si.edu/ids/deliveryService/id/ark:/65665/m3567af3abd2b54262bb3a097ba8296b20",
      "https://ids.si.edu/ids/deliveryService/id/ark:/65665/m3331dc8cb0eeb4e47983c15ee38a992da",
      "https://ids.si.edu/ids/deliveryService/id/ark:/65665/m3a15984cec6f44eb98d29934c7fd3d16d",
    ],
  },
  "International Indian Ocean Expedition (IIOE)": {
    description:
      "Objectives: The International Indian Ocean Expedition (IIOE) (1959 to 1965) aimed to explore and understand the Indian Ocean's diverse characteristics. It focused on studying ocean currents, monsoon systems, marine ecosystems, and geological features to provide a comprehensive understanding of this largely unexplored region. The expedition's multidisciplinary approach contributed significantly to oceanography by documenting marine biodiversity, understanding ocean circulation patterns, and advancing oceanographic research techniques, making it a landmark endeavor in marine science.",
    imageUrls: [
      "https://ids.si.edu/ids/deliveryService/id/ark:/65665/m3acaba9c826094e189904cef4a15cc3b8",
      "https://ids.si.edu/ids/deliveryService/id/ark:/65665/m30b5cd54324974a649a29b3e24796c309",
      "https://collections.nmnh.si.edu/media/?irn=15812409",

      "https://ids.si.edu/ids/deliveryService/id/ark:/65665/m3c7856ce17ab64f2591d653e5ef80dcb8",
    ],
  },
  "New England Environmental Benchmark Program (NEEB)": {
    description:
      "Objectives: The New England Environmental Benchmark Program (NEEB) took place in 1977 as part of a series of ecological benchmark studies conducted during the 70s to assess and monitor the marine and coastal environments in the New England region. These studies helped establish baseline data for understanding environmental changes over time.",
    imageUrls: ["", "", "", ""],
  },
  "Northwestern Pacific Expedition": {
    description:
      "Objectives: The U.S. North Pacific Exploring Expedition (1853-1856), led by Captain Cadwalader Ringgold and later Lt. John Rodgers, aimed to explore the Bering Straits, North Pacific Ocean, and China Seas, with botanist Charles Wright collecting numerous plant and algae specimens. The expedition discovered new plant species, including seaweed varieties, and documented previously unknown plant relationships in Asia. This work contributed significantly to the formation of the U.S. National Herbarium in 1869.",
    imageUrls: [
      "https://ids.si.edu/ids/deliveryService/id/ark:/65665/m33e9a75d187a9497db46c98fe4c21e911",
      "https://ids.si.edu/ids/deliveryService/id/ark:/65665/m3f4984a3d5a2345bd9582bd8b735e4b42",
      "https://ids.si.edu/ids/deliveryService/id/ark:/65665/m35d66dd86e11d4522bcc806190fffc5d0",
      "https://ids.si.edu/ids/deliveryService/id/ark:/65665/m3c0b278c8f1a8467bb7142ac05f5f3667",
    ],
  },
  "Ocean Acre Expedition": {
    description:
      "Objectives: The Ocean Acre Expedition (1960s), was a multidisciplinary research initiative focused on studying the physical, chemical, and biological properties of the Sargasso Sea, located in the North Atlantic Ocean. Scientists aimed to better understand oceanographic processes, marine life diversity, and the interactions between different ocean layers, making it one of the earliest efforts to explore and document the complexities of an open-ocean ecosystem.",
    imageUrls: ["", "", "", ""],
  },
  "Palearctic Migratory Bird Survey": {
    description:
      "Objectives: The Palearctic Migratory Bird Survey (1960s), aimed to study the migratory patterns, habitats, and behaviors of bird species across the Palearctic region, which covers Europe, North Africa (mainly Eygpt), and parts of Asia. This survey collected crucial data on bird migration routes, timing, and population changes, contributing to our understanding of avian ecology and conservation efforts.",
    imageUrls: [
      "https://ids.si.edu/ids/deliveryService/id/ark:/65665/m3bde366dfbbd8446688706c66fbf27ea4",
      "https://collections.nmnh.si.edu/media/?irn=15812601",
      "https://collections.nmnh.si.edu/media/?irn=15807109",
      "https://ids.si.edu/ids/deliveryService/id/ark:/65665/m352b6667ee1964e8882eca9386d26d696",
    ],
  },
  "Panama Oil Spill Program (POSP)": {
    description:
      "Objectives: The Panama Oil Spill Program (POSP), initiated in 1986, aimed to study the environmental impact of oil spills in tropical marine ecosystems, particularly around the Panama Canal. The program focused on assessing the effects of oil contamination on marine life, coral reefs, mangroves, and coastal habitats, providing valuable insights into the resilience and recovery of these ecosystems after oil spills",
    imageUrls: [
      "https://ids.si.edu/ids/deliveryService/id/ark:/65665/m3259cb8b9f8654de9a8f4950acff27ae1",
      "https://ids.si.edu/ids/deliveryService/id/ark:/65665/m37ba557b6fe704ada9109c122874e8374",
      "https://ids.si.edu/ids/deliveryService/id/ark:/65665/m38d93c11bccb54d40b4b287a38deaf977",
      "https://ids.si.edu/ids/deliveryService/id/ark:/65665/m3faa6a9ed1b594c59855cb9501fbdef32",
    ],
  },
  "South Atlantic Benchmark Program (SABP)": {
    description:
      "Objectives: In 1977, the South Atlantic Benchmark Program (SABP) aimed to establish a baseline understanding of the marine and coastal ecosystems in the South Atlantic region. The program conducted extensive research on water quality, benthic habitats, and marine biodiversity to monitor the health of these ecosystems. By collecting this benchmark data, the SABP provided essential insights into the impacts of human activities and natural events, helping guide future conservation and management efforts in the South Atlantic coastal and marine environments",
    imageUrls: [
      "https://ids.si.edu/ids/deliveryService/id/ark:/65665/m347b8a49a9956443db060842d475488ed",
      "https://ids.si.edu/ids/deliveryService/id/ark:/65665/m30bc0ef6d5dc245d89e201fddaee72cf0",
      "https://ids.si.edu/ids/deliveryService/id/ark:/65665/m3a5f3ba03d97e47dab3f3201534e58513",
      "https://ids.si.edu/ids/deliveryService/id/ark:/65665/m3bb42981bcc7642b2bb4773b97462133b",
    ],
  },
  "Smithsonian STRI Panama Survey": {
    description:
      "Objectives: The Smithsonian Tropical Research Institute (STRI) Panama Survey  aimed to study the biodiversity, ecology, and environmental changes in Panama's diverse ecosystems. This long-term survey, conducted by the STRI, focused on collecting data on various species, their habitats, and the effects of climate change, deforestation, and human activities on tropical ecosystems. The findings from this survey have been crucial in advancing our understanding of tropical biodiversity and guiding conservation efforts in the region.",
    imageUrls: [
      "https://ids.si.edu/ids/deliveryService/id/ark:/65665/m390712e32933240cfa1e83ec1a0ff1c7c",
      "https://ids.si.edu/ids/deliveryService/id/ark:/65665/m3986ab47c46b24073a66f6a04b7401769",
      "https://ids.si.edu/ids/deliveryService/id/ark:/65665/m3255ba394f2b840ce94c48290a79feedd",
      "https://ids.si.edu/ids/deliveryService/id/ark:/65665/m32195177915e940d58144887a6c5d67e6",
    ],
  },
  "Albatross Philippine Expedition": {
    description: "Description for Albatross Philippine Expedition",
    imageUrls: [
      "https://ids.si.edu/ids/deliveryService/id/ark:/65665/m3043427a6370049a58b2aafbeffc83bf2",
      "https://ids.si.edu/ids/deliveryService/id/ark:/65665/m3cecabc44e1a644968a6f177fd3c63a83",
      "https://ids.si.edu/ids/deliveryService/id/ark:/65665/m322317822c7304abf874e146314e108c4",
      "https://ids.si.edu/ids/deliveryService/id/ark:/65665/m3a378cdc40b1249cab0ac4152bd384350",
    ],
  },
}; // Fetch JSON data and create the stacked bar chart and timeline
function fetchJsonData() {
  Promise.all(
    jsonFiles.map((url) =>
      fetch(url)
        .then((response) => response.json())
        .then((data) => {
          const uniqueEntries = [];
          const seenIds = new Set();

          data.forEach((entry) => {
            if (!seenIds.has(entry.id)) {
              seenIds.add(entry.id);
              uniqueEntries.push(entry);
            }
          });

          const expeditionName = uniqueEntries[0]?.expedition_name_2;
          const expeditionYear = getExpeditionYear(expeditionName);

          return {
            expedition: expeditionName,
            year: expeditionYear,
            unitCodes: uniqueEntries
              .reduce((acc, entry) => {
                const unitCode = entry.unitCode || "Unknown"; // Use "Unknown" if unitCode is missing
                const found = acc.find((u) => u.code === unitCode);
                if (found) {
                  found.count++;
                } else {
                  acc.push({ code: unitCode, count: 1 });
                }
                return acc;
              }, [])
              .sort((a, b) => b.count - a.count), // Sort the unitCodes array by count in descending order
          };
        })
    )
  )
    .then((expeditionsData) => {
      // Filter out any null or incomplete expedition data
      const filteredData = expeditionsData.filter(
        (expedition) => expedition.expedition && expedition.year
      );

      // Calculate total count for each expedition
      filteredData.forEach((expedition) => {
        expedition.totalCount = expedition.unitCodes.reduce(
          (sum, unit) => sum + unit.count,
          0
        );
      });

      // Sort by total count in descending order and select the top 10
      const top10Expeditions = filteredData
        .sort((a, b) => b.totalCount - a.totalCount)
        .slice(0, 10);

      // Sort the top 10 expeditions by year for proper display
      const sortedByYear = top10Expeditions.sort((a, b) => a.year - b.year);

      // Create the chart and timeline using only the top 10 expeditions
      createStackedBarChart(sortedByYear);
      createTimeline(sortedByYear);
    })
    .catch((error) => console.error("Error fetching JSON files:", error));
}

// Create the stacked bar chart with click and hover events
function createStackedBarChart(data) {
  const margin = { top: 30, right: 50, bottom: 80, left: 300 };
  const width = 1300 - margin.left - margin.right;
  const height = 700 - margin.top - margin.bottom;

  const svg = d3
    .select("#chart")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom + 100) // Increase height to accommodate the legend
    .append("g")
    .attr("transform", `translate(${margin.left},${margin.top})`);

  const x = d3
    .scaleLinear()
    .domain([0, d3.max(data, (d) => d3.sum(d.unitCodes, (d) => d.count))])
    .range([0, width]);

  const y = d3
    .scaleBand()
    .domain(data.map((d) => d.expedition))
    .range([0, height])
    .padding(0.1);

  const unitCodes = [
    ...new Set(data.flatMap((d) => d.unitCodes.map((u) => u.code))),
  ];
  // Define your custom colors
  // const customColors = [
  //     "#b2df8a", // Light Green

  //     "#DCD649",//yellow
  //     "#a6cee3", // Light Blue
  //     "#DC5E49", // orange
  //     "#133260", // navy
  // "#A7BBEC",//purple
  //     // "#4C585C", // forest green
  //     "#AC9090",// Purple
  //     // "#b7410e",//rust
  //     // "#b15928", // Brown
  //     "#555D62",//grey
  //     // "#393E41", //grey
  //     // "#fb9a99", // Light Red
  //     "#85AF90", // muted green

  //     "#fdbf6f"  // Light Orange
  // ];
  //option 2
  // const customColors = [

  //         "#85AF90", // muted green
  //           "#D04A01",//yellow
  //     "#555D62",//grey
  //     // "#4C585C", // forest green
  //      "#0A8095", // Light Green
  // "#85AF97", // orange
  //    "#00353E",//purple
  //      "#a6cee3", // Light Blue
  //  // "#b7410e",//rust
  //     "#FAC015", // navy
  //   // "#b15928", // Brown
  //      "#AC9090",// Purple
  // // "#393E41", //grey
  //     // "#fb9a99", // Light Red

  //     "#fdbf6f"  // Light Orange
  // ];

  //option 3 - smithsonian brand colors
  const customColors = [
    //botany
    "#85AF97", // green

    //bird
    "#E87722", //orange
    //herpetology
    "#393E41", //grey

    //inv
    "#165C7D ", //teal

    //fish
    "#74D1EA", // Light Blue

    //entomology
    "#F0515A", // Purple

    // "#F0B323",//yellow
    "FFA676", //peach
    //paleobio
    "#612F2F", //dark grey
    //mineral
    "#F0515A", //pink

    //  "#328C9F",  // Light Orange
    //        "#0A8095",//main teal
    //  "#002554", //navy
    // "#4C585C", // forest green
    // //  "#74D1EA",//light blue
    // // "#00353E",//purple
    //          "#F0B323", // orange
    //    "#FAC015", // navy
    //  // "#b7410e",//rust
    // // "#b15928", // Brown
  ];
  // Apply the custom colors to the color scale
  const color = d3.scaleOrdinal().domain(unitCodes).range(customColors);

  const labelMapping = {
    NMNHINV: "Invertebrate",
    NMNHBIRDS: "Bird",
    NMNHBOTANY: "Botany",
    NMNHHERPS: "Herpetology",
    NMNHFISHES: "Fish",
    NMNHENTO: "Entomology",
    NMNHMINSCI: "Mineral Science",
    NMNHPALEO: "Paleobiology",
  };

  function createLegend(unitCodes, color) {
    const legend = d3
      .select("#legend")
      .attr("width", 1400) // Adjust this as needed
      .attr("height", 60) // Adjust height to fit
      .append("g")
      .attr("transform", `translate(590, 10)`); // Adjust positioning inside the legend SVG

    const legendPadding = 10; // Padding between legend items
    let offsetX = 0; // Start position for the first item

    unitCodes.forEach((unitCode, i) => {
      const label = labelMapping[unitCode] || unitCode; // Get the label text

      // Create a temporary text element to measure the width of the text
      const tempText = legend
        .append("text")
        .attr("font-size", "12px")
        .text(label);

      const textWidth = tempText.node().getBBox().width; // Get the width of the text
      tempText.remove(); // Remove the temporary text element

      const legendWidth = textWidth + 24 + legendPadding; // 18 for the rectangle width + 6 spacing + text width

      // Create a legend group for each item
      const legendRow = legend
        .append("g")
        .attr("transform", `translate(${offsetX}, 10)`);

      // Add the colored rectangle
      legendRow
        .append("rect")
        .attr("width", 18)
        .attr("height", 18)
        .attr("fill", color(unitCode))
        .attr("opacity", 0.7);

      // Add the text label
      legendRow
        .append("text")
        .attr("x", 24) // Positioned 6px to the right of the rectangle
        .attr("y", 9)
        .attr("dy", "0.35em")
        .attr("font-size", "12px")
        .attr("fill", "black")
        .text(label);

      offsetX += legendWidth; // Increment the x position for the next legend item
    });
  }

  // Call this function where you create the x-axis
  svg
    .append("text")
    .attr("transform", `translate(${width / 2}, ${height + 60})`) // Adjust as needed for placement
    .style("text-anchor", "middle")
    .style("font-weight", "300")
    .text("Artifact Count");

  createLegend(unitCodes, color);

  // Add labels
  svg
    .selectAll(".chart-label")
    .data(data)
    .enter()
    .append("text")
    .attr("class", (d) => `chart-label label-${sanitizeName(d.expedition)}`)
    .attr("x", -10) // Position labels to the left of the bars
    .attr("y", (d) => y(d.expedition) + y.bandwidth() / 2)
    .attr("dy", ".35em")
    .text((d) => d.expedition)
    .style("text-anchor", "end")
    .style("opacity", 0.8) // Set to 80% opacity
    .style("font-size", "12px") // Set font size
    .style("font-family", "Inter, sans-serif") // Ensure correct font
    .attr("fill", "black")
    .on("mouseover", function (event, d) {
      // Darken the label
      d3.select(this)
        .transition()
        .duration(200)
        .style("opacity", 1) // Darken to full opacity
        .style("font-weight", "430"); // Bolden the font

      // Lighten the corresponding bar
      d3.selectAll(`.bar-${sanitizeName(d.expedition)}`)
        .transition()
        .duration(200)
        .attr("opacity", 0.6) // Adjust the opacity to lighten
        .style("cursor", "grab");
    })
    .on("mouseout", function (event, d) {
      // Reset the label's style
      d3.select(this)
        .transition()
        .duration(200)
        .style("opacity", 0.8) // Reset to original opacity
        .style("font-weight", "300"); // Reset font weight

      // Reset the bar's opacity
      d3.selectAll(`.bar-${sanitizeName(d.expedition)}`)
        .transition()
        .duration(200)
        .attr("opacity", 0.9); // Reset to original opacity
    });

  svg
    .append("g")
    .attr("transform", `translate(0,${height})`)
    .call(d3.axisBottom(x).ticks(10).tickSize(5).tickPadding(15));
  svg
    .selectAll(".tick text")
    .style("font-family", "Inter, sans-serif")
    .style("font-size", "10px")
    .style("font-weight", "300")
    .style("fill", "#666");
  const barsGroup = svg.append("g");

  data.forEach((expedition) => {
    let x0 = 0;

    barsGroup
      .selectAll(`.bar-${sanitizeName(expedition.expedition)}`)
      .data(expedition.unitCodes)
      .enter()
      .append("rect")
      .attr("class", `bar-${sanitizeName(expedition.expedition)}`)
      .attr("y", y(expedition.expedition))
      .attr("x", (d) => {
        const pos = x(x0);
        x0 += d.count;
        return pos;
      })
      .attr("height", y.bandwidth())
      .attr("width", (d) => x(d.count))
      .attr("fill", (d) => color(d.code))
      .attr("opacity", 0.9) // Start with lighter opacity
      .on("click", (event, d) => {
        showImageCard(expedition.expedition);
      })
      .on("mouseover", function (event, d) {
        d3.select(this).attr("fill-opacity", 0.9);

        // Get the mapped category name using the labelMapping
        const category = labelMapping[d.code] || d.code;

        // Display the tooltip with category and count information
        tooltip
          .style("visibility", "visible")
          .html(
            `<strong>Category:</strong> ${category}<br/><strong>Count:</strong> ${d.count}`
          )
          .style("left", event.pageX + 5 + "px")
          .style("top", event.pageY - 28 + "px");

        highlightBar(expedition.expedition);
      })
      .on("mouseout", function (event, d) {
        d3.select(this).attr("fill-opacity", 1);
        tooltip.style("visibility", "hidden");
        highlightBar(null);
      });
  });

  function highlightBar(expedition) {
    // Highlight corresponding bars
    barsGroup
      .selectAll("rect")
      .transition()
      .duration(200)
      .style("fill", (d) =>
        d.expedition === expedition ? "orange" : color(d.code)
      );

    d3.selectAll(".expedition-point").attr("fill", (d) =>
      d.expedition === expedition ? "#FACC44" : "white"
    );

    // Darken the corresponding label
    d3.selectAll(`.label-${sanitizeName(expedition)}`)
      .transition()
      .duration(200)
      .style("opacity", 0.7) // Set to fully opaque on hover
      .style("font-weight", "400");

    // Reset all labels except the hovered one
    d3.selectAll(".chart-label")
      .filter(function (d) {
        return sanitizeName(d.expedition) !== sanitizeName(expedition);
      })
      .transition()
      .duration(200)
      .style("opacity", 0.8) // Reset non-hovered labels to lighter opacity
      .style("font-weight", "300");
  }
}

function createTimeline(data) {
  const margin = { top: 20, right: 30, bottom: 40, left: 70 };
  const width = 200 - margin.left - margin.right;
  const height = 700 - margin.top - margin.bottom;

  const svg = d3
    .select("#timeline")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", `translate(${margin.left},${margin.top})`);

  const parseTime = d3.timeParse("%Y");
  const yScale = d3
    .scaleTime()
    .domain([
      d3.max(data, (d) => parseTime(d.year)),
      d3.min(data, (d) => parseTime(d.year)),
    ])
    .range([height, 0]);

  svg
    .append("line")
    .attr("x1", width / 2)
    .attr("y1", 0)
    .attr("x2", width / 2)
    .attr("y2", height + 10)
    .attr("stroke", "#868585")
    .attr("opacity", 0.7)
    .attr("stroke-width", 10);

  // Inside createTimeline()
  svg
    .selectAll(".expedition-point")
    .data(data)
    .enter()
    .append("circle")
    .attr("class", "expedition-point")
    .attr("cx", width / 2)
    .attr("cy", (d) => yScale(parseTime(d.year)))
    .attr("r", 8)
    .attr("stroke", "#868585")
    .attr("fill", "white")
    .on("mouseover", (event, d) => {
      // tooltip
      //   .style("visibility", "visible")
      //   .html(`<strong>${d.expedition}</strong><br/>Year: ${d.year}`)
      //   .style("left", event.pageX + 5 + "px")
      //   .style("top", event.pageY - 28 + "px");

      d3.select(event.target).attr("fill", "#FAC015");

      // Ensure this line targets bars correctly using attr
      d3.selectAll(`.bar-${sanitizeName(d.expedition)}`)
        .transition()
        .duration(200)
        .attr("opacity", 0.7); // Set opacity to a lower value to lighten the bar

      // Darken the corresponding label (use the right class format)
      d3.selectAll(`.label-${sanitizeName(d.expedition)}`)
        .transition()
        .duration(200)
        .style("opacity", 1) // Make it fully opaque
        .style("font-weight", "700") // Increase font weight to darken
        .style("fill", "black"); // Ensure the text color is dark
    })
    .on("mouseout", (event, d) => {
      tooltip.style("visibility", "hidden");
      d3.select(event.target).attr("fill", "white");

      // Reset the bar's opacity to its original style
      d3.selectAll(`.bar-${sanitizeName(d.expedition)}`)
        .transition()
        .duration(200)
        .attr("opacity", 0.9); // Reset to original opacity

      // Reset the label's opacity and font-weight
      d3.selectAll(`.label-${sanitizeName(d.expedition)}`)
        .transition()
        .duration(200)
        .style("opacity", 0.8) // Set to a consistent, readable opacity
        .style("font-weight", "260") // Maintain a visible weight
        .style("fill", "black"); // Ensure text color remains consistent
    });

  // Add year labels to the timeline
  const startYear = d3.min(data, (d) => parseInt(d.year, 10));
  const endYear = d3.max(data, (d) => parseInt(d.year, 10));

  for (let year = startYear; year <= endYear; year += 10) {
    svg
      .append("text")
      .attr("class", "year-label")
      .attr("x", width / 2 - 45) // Adjust horizontal position
      .attr("y", yScale(parseTime(year.toString())))
      .attr("dy", ".35em")
      .text(year)
      .style("font-size", "14px")
      .attr("fill", "black");
  }
}

// Initialize tooltip element
const tooltip = d3
  .select("body")
  .append("div")
  .attr("id", "tooltip")
  .style("position", "absolute")
  .style("visibility", "hidden")
  .style("background-color", "white")
  .style("padding", "5px")
  .style("border", "1px solid black")
  .style("border-radius", "5px");
function showImageCard(expeditionName) {
  const expeditionData = expeditionImages[expeditionName];
  console.log("Expedition Data:", expeditionData);

  if (!expeditionData) {
    console.error(`No data found for expedition: ${expeditionName}`);
    return;
  }

  // Populate the card with data
  const cardContainer = document.getElementById("image-card");
  const titleElement = document.getElementById("expedition-title");
  const descriptionElement = document.getElementById("expedition-description");
  const imageContent = document.getElementById("image-content");

  titleElement.textContent = expeditionName;
  descriptionElement.textContent = expeditionData.description;
  imageContent.innerHTML = ""; // Clear existing images

  // Check if there are no valid images or if all URLs are either empty or "No Images Found in Collection"
  if (
    !expeditionData.imageUrls.length ||
    expeditionData.imageUrls.every(
      (imgURL) => !imgURL || imgURL === "No Images Found in Collection"
    )
  ) {
    // Display a message saying no images are available
    const noImageMessage = document.createElement("p");
    noImageMessage.textContent = "No Images Available.";
    noImageMessage.style.textAlign = "center";
    noImageMessage.style.color = "#666"; // Optional styling
    imageContent.appendChild(noImageMessage);
  } else {
    // Loop through each image URL and create an image element
    expeditionData.imageUrls.forEach((imgURL) => {
      if (imgURL && imgURL !== "No Images Found in Collection") {
        const imgElement = document.createElement("img");
        imgElement.src = imgURL; // Assign the URL
        imgElement.alt = expeditionName;
        imgElement.style.width = "100%"; // Set width for visibility
        imgElement.style.height = "auto"; // Maintain aspect ratio

        // Add click event to open modal for larger view
        imgElement.addEventListener("click", () => {
          const modal = document.getElementById("modal");
          const modalImage = document.getElementById("modal-image");
          modalImage.src = imgElement.src; // Set modal image source
          modal.style.display = "flex"; // Show modal
        });

        imageContent.appendChild(imgElement); // Add to grid
      }
    });
  }

  // Show the card
  cardContainer.style.display = "block"; // Show the card
}

// Close button event listener
document
  .getElementById("closeImageCard")
  .addEventListener("click", function () {
    document.getElementById("image-card").style.display = "none"; // Corrected ID
  });

// Close modal when clicked
document.getElementById("modal").addEventListener("click", () => {
  document.getElementById("modal").style.display = "none"; // Hide modal
});
document.addEventListener("DOMContentLoaded", () => {
  const visualizationContainer = document.getElementById("visualization");
  const citationElement = document.getElementById("citation");

  // Show the citation initially
  citationElement.style.display = "block";

  // Check if the visualization container is present on the page
  if (visualizationContainer) {
    visualizationContainer.addEventListener("mouseenter", () => {
      citationElement.style.display = "none"; // Hide citation when visualization is hovered
    });
    visualizationContainer.addEventListener("mouseleave", () => {
      citationElement.style.display = "block"; // Show citation when not hovered
    });
  }
});

// Call the fetchJsonData function to start
fetchJsonData();
