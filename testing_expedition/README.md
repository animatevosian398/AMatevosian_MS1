## MS 1 
## Exploring Expeditions

Exploring the Smithsonian’s material and history made me wonder where specimens like corals or fossils came from. Here, I investigate the following questions:
- Which scientific expeditions yielded the most specimens, artifacts, and records?
- What categories do those materials belong to (botany, fossils/paleontology, archival material, seeds)?
- Which expeditions are less focused on or underrepresented?
- From which expedition does the Smithsonian hold the most archival material?

A micro-exploration could zoom in within a category to see the biodiversity of plants collected on an expedition. The quantitative dataset includes the number of artifacts in object types like “plants” for a given expedition. For example, the notable U.S. Exploring Expedition from 1838 yielded: 284 results for NMNH Vertebrate Zoology - Birds, 369 for NMNH Invertebrate Zoology Dept, 6 for Herpetology, 1 in Mammals, and 8 in Botany. A stacked bar chart will display the diversity of material that the Smithsonian collected around each expedition and the contributions these expeditions made. The bar heights will show the number of artifacts in each category, allowing for comparisons among expeditions. 

## Exploring Expeditions Process 
(Link)[https://docs.google.com/spreadsheets/d/16QyoU5pXi25KyBFgINcCdsgFQZ_5GubsRPRdHZ4W134/edit?gid=0#gid=0] to Data Management and Data Tracker which stores the results and initial analysis of searching the term "expedition" across museum units.
Process included
1) Initial Researching with Expeditions were High Yielding
2) getting lists of expedition names in each unit
2) create an object and sorting them by their count
3) repeating for each unit
4) picking the top yielding expeditions over time
5) Selecting images for each expedition

   

# Prototype Images


<img width="1409" alt="prototypeImage_3" src="https://github.com/user-attachments/assets/2805563c-06ee-4090-bf46-b01100722dbe">
<img width="1329" alt="PrototypeImage_2" src="https://github.com/user-attachments/assets/eb2d3a67-e919-4975-a1c6-1d22b6e1c301">
<img width="1393" alt="prototypeImage_1" src="https://github.com/user-attachments/assets/273370c1-5a60-4a7f-8d2b-e24a3f51453e">




## Sketches
[Link to pdf of images](https://github.com/user-attachments/files/16972172/Sketches_pdf.pdf)






## 1- Foraminifera (“Forams”) at the Smithsonian: Visualizing the World’s Largest Foram Collection

The Smithsonian has about 16,000 primary type specimens of foraminifera (and over 200,000 secondary types) serving as the world’s largest repository, with the Cushman Collection being the most notable. Foraminifera (“forams” for short) are microfossils storing incredible amounts of data. Their shells tell us about past ocean conditions, from temperature to acidity and salinity. 

Forams are split into two groups – benthic and planktonic – depending on their ocean depth. Some questions I want to explore are: 
- What is the proportion of benthic to planktonic species in the collection at the Smithsonian?
- What is the distribution of species represented across the different museum units?
  
With this visualization, I aim to quantify the specimen types across the Smithsonian units and by category (benthic vs. planktonic) to convey the richness of this collection. Bands in the outer ring will show the diversity of species type within each unit (NMNH Education & Outreach, Invertebrate Zoology Dept, and Paleobiology Dept) and visualize their locations within the institution.
The quantitative dataset will include the number of objects and fossils/microslides of different foram types in the collections, as well as the number within each museum unit. I am using a sunburst chart to display this information because it breaks down categories effectively, and I can expand the rings to include more specific data points (like the number of species types). The data quality is high, containing all taxonomic information. I will need to join this dataset with another one that contains planktonic and benthic information for each specimen in the Smithsonian collection. Approximately 7,000 results are returned when searching "foraminifera" in the SI API’s discover database preview.

---

## 2- Foraminifera and Time: Temporal Distribution of the Smithsonian’s Foram Collection

Using the same dataset of forams at the Smithsonian (or possibly narrowing the scope to one collection like the Cushman Collection), I am charting key foraminifera species on a geologic timescale. These species have known ages, determined by the sediment they were found in and other dating methods. By linking these species in the Smithsonian’s repository to their known ages, we can place them on a timeline.
A timeline chart was chosen because it provides a clear picture of foram species and their ages on a geologic scale. The species’ age ranges will be represented by horizontal lines, showing when those species appeared and disappeared over time. The questions I want to explore include:
- How much of Earth’s geologic time does the collection cover?
- Are there notable gaps in geologic eras?
- Compared to foram databases, does the Smithsonian collection span all eras?

The dataset remains the same, but here, we focus on the Paleobiology unit, which holds the bulk of the collection.

---

## 3- Exploring and Quantifying Expeditions

Exploring the Smithsonian’s material and history made me wonder where specimens like corals or fossils came from. Here, I investigate the following questions:
- Which scientific expeditions yielded the most specimens, artifacts, and records?
- What categories do those materials belong to (botany, fossils/paleontology, archival material, seeds)?
- Which expeditions are less focused on or underrepresented?
- From which expedition does the Smithsonian hold the most archival material?

A micro-exploration could zoom in within a category to see the biodiversity of plants collected on an expedition. The quantitative dataset includes the number of artifacts in object types like “plants” for a given expedition. For example, the notable U.S. Exploring Expedition from 1838 yielded: 284 results for NMNH Vertebrate Zoology - Birds, 369 for NMNH Invertebrate Zoology Dept, 6 for Herpetology, 1 in Mammals, and 8 in Botany.
A stacked bar chart will display the diversity of material that the Smithsonian collected around each expedition and the contributions these expeditions made. The bar heights will show the number of artifacts in each category, allowing for comparisons among expeditions. An additional view could display the geographical routes and distribution of the expeditions, showing where teams traveled and what they brought back.
