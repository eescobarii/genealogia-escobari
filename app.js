// Sample data for the family tree
const data = {
    "name": "Juan Pérez",
    "birthdate": "1950-01-01",
    "children": [
        {
            "name": "Carlos Pérez",
            "birthdate": "1980-05-10",
            "children": [
                {
                    "name": "Luis Pérez",
                    "birthdate": "2005-07-20"
                },
                {
                    "name": "Ana Pérez",
                    "birthdate": "2007-11-11"
                }
            ]
        },
        {
            "name": "Luisa Pérez",
            "birthdate": "1985-03-22",
            "children": [
                {
                    "name": "Pedro Pérez",
                    "birthdate": "2010-06-15"
                }
            ]
        }
    ]
};

// Function to create the tree
function createFamilyTree(data) {
    const width = 1000;
    const height = 600;
    const margin = { top: 40, right: 40, bottom: 40, left: 40 };

    const svg = d3.select("#tree-container").append("svg")
        .attr("width", width)
        .attr("height", height);

    const root = d3.hierarchy(data, d => d.children);
    const treeLayout = d3.tree().size([width - margin.left - margin.right, height - margin.top - margin.bottom]);

    treeLayout(root);

    // Draw straight lines connecting nodes
    svg.selectAll(".link")
        .data(root.links())
        .enter().append("line")  // Use line instead of path
        .attr("class", "link")
        .attr("x1", d => d.source.x + margin.left)  // Start X
        .attr("y1", d => d.source.y + margin.top)  // Start Y
        .attr("x2", d => d.target.x + margin.left) // End X
        .attr("y2", d => d.target.y + margin.top) // End Y
        .attr("stroke", "black")
        .attr("stroke-width", 2);

    // Create nodes for each person
    const nodes = svg.selectAll(".node")
        .data(root.descendants())
        .enter().append("g")
        .attr("class", "node")
        .attr("transform", d => `translate(${d.x + margin.left}, ${d.y + margin.top})`);

    // Create rectangles for nodes
    nodes.append("rect")
        .attr("width", 150)
        .attr("height", 50)
        .attr("rx", 5)
        .attr("ry", 5)
        .attr("fill", "#4CAF50");

    // Add names inside the nodes
    nodes.append("text")
        .attr("x", 75)
        .attr("y", 25)
        .attr("dy", ".35em")
        .attr("text-anchor", "middle")
        .attr("fill", "white")
        .text(d => d.data.name);

    // Make the tree interactive: click on a node to show more info
    nodes.on("click", function(event, d) {
        const personInfo = `
            <h3>${d.data.name}</h3>
            <p>Fecha de nacimiento: ${d.data.birthdate}</p>
        `;
        document.getElementById("info-content").innerHTML = personInfo;
        document.getElementById("info-container").style.display = "block";
    });

    // Close the modal when the close button is clicked
    document.getElementById("close-btn").addEventListener("click", function() {
        document.getElementById("info-container").style.display = "none";
    });
}

// Call the function to create the family tree
createFamilyTree(data);
