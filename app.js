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

function createFamilyTree(data) {
    const width = 1200; // Aumentamos el ancho para que los nodos no se superpongan
    const height = 600; // Aumentamos la altura
    const margin = { top: 40, right: 40, bottom: 40, left: 40 };

    const svg = d3.select("#tree-container").append("svg")
        .attr("width", width)
        .attr("height", height);

    const root = d3.hierarchy(data, d => d.children);
    const treeLayout = d3.tree().size([width - margin.left - margin.right, height - margin.top - margin.bottom]);

    treeLayout(root);

    // Dibuja las líneas de conexión entre los nodos (enlaces)
    svg.selectAll(".link")
        .data(root.links())
        .enter().append("path")
        .attr("class", "link")
        .attr("d", d3.linkHorizontal()
            .x(d => d.x + margin.left)
            .y(d => d.y + margin.top));

    // Dibuja los nodos (personas)
    const nodes = svg.selectAll(".node")
        .data(root.descendants())
        .enter().append("g")
        .attr("class", "node")
        .attr("transform", d => `translate(${d.x + margin.left}, ${d.y + margin.top})`);

    // Cuadros de los nodos
    nodes.append("rect")
        .attr("width", 150)
        .attr("height", 50)
        .attr("rx", 5)
        .attr("ry", 5)
        .attr("fill", "#4CAF50");

    // Nombres dentro de los nodos
    nodes.append("text")
        .attr("x", 75)
        .attr("y", 25)
        .attr("dy", ".35em")
        .attr("text-anchor", "middle")
        .attr("fill", "white")
        .text(d => d.data.name);

    // Mostrar información de la persona al hacer clic
    nodes.on("click", function(event, d) {
        const personInfo = `<h3>${d.data.name}</h3>
                            <p>Fecha de nacimiento: ${d.data.birthdate}</p>`;
        document.getElementById("info-container").innerHTML = personInfo;
        document.getElementById("info-container").style.display = "block";
    });
}

createFamilyTree(data);
