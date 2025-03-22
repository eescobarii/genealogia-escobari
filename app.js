// Datos de ejemplo con múltiples parejas
const data = {
    "name": "Juan Pérez",
    "birthdate": "1950-01-01",
    "parejas": [
        {
            "name": "Ana López",
            "birthdate": "1955-02-25",
            "children": [
                {
                    "name": "Carlos Pérez",
                    "birthdate": "1980-05-10"
                },
                {
                    "name": "Luisa Pérez",
                    "birthdate": "1985-03-22"
                }
            ]
        },
        {
            "name": "María García",
            "birthdate": "1960-07-15",
            "children": [
                {
                    "name": "Pedro Pérez",
                    "birthdate": "1990-06-05"
                }
            ]
        }
    ]
};

// Función para crear el árbol genealógico
function createFamilyTree(data) {
    const width = 1000;
    const height = 600;
    const margin = { top: 40, right: 40, bottom: 40, left: 40 };

    const svg = d3.select("#tree-container").append("svg")
        .attr("width", width)
        .attr("height", height)
        .call(d3.zoom().scaleExtent([0.5, 3]).on("zoom", zoom)) // Agregar zoom
        .append("g"); // Añadir un grupo para aplicar el zoom

    const root = d3.hierarchy(data, d => {
        let children = [];
        // Procesamos todas las parejas, cada una con sus propios hijos
        d.parejas.forEach(pareja => {
            children = children.concat(pareja.children.map(child => ({
                name: child.name,
                birthdate: child.birthdate,
                parent: d.name
            })));
        });
        return children;
    });

    const treeLayout = d3.tree().size([width - margin.left - margin.right, height - margin.top - margin.bottom]);

    treeLayout(root);

    // Dibujar líneas de conexión rectas entre nodos
    svg.selectAll(".link")
        .data(root.links())
        .enter().append("line")
        .attr("class", "link")
        .attr("x1", d => d.source.x + margin.left)
        .attr("y1", d => d.source.y + margin.top)
        .attr("x2", d => d.target.x + margin.left)
        .attr("y2", d => d.target.y + margin.top)
        .attr("stroke", "black")
        .attr("stroke-width", 2);

    // Crear nodos
    const nodes = svg.selectAll(".node")
        .data(root.descendants())
        .enter().append("g")
        .attr("class", "node")
        .attr("transform", d => `translate(${d.x + margin.left}, ${d.y + margin.top})`);

    // Dibujar rectángulos para los nodos
    nodes.append("rect")
        .attr("width", 150)
        .attr("height", 50)
        .attr("rx", 5)
        .attr("ry", 5)
        .attr("fill", "#4CAF50");

    // Añadir texto con el nombre
    nodes.append("text")
        .attr("x", 75)
        .attr("y", 25)
        .attr("dy", ".35em")
        .attr("text-anchor", "middle")
        .attr("fill", "white")
        .text(d => d.data.name);

    // Hacer el árbol interactivo: clic para mostrar más información
    nodes.on("click", function(event, d) {
        const personInfo = `
            <h3>${d.data.name}</h3>
            <p>Fecha de nacimiento: ${d.data.birthdate}</p>
        `;
        document.getElementById("info-content").innerHTML = personInfo;
        document.getElementById("info-container").style.display = "block";
    });

    // Cerrar el modal cuando se hace clic en el botón de cerrar
    document.getElementById("close-btn").addEventListener("click", function() {
        document.getElementById("info-container").style.display = "none";
    });

    // Función de zoom para desplazar y hacer zoom en el árbol
    function zoom(event) {
        svg.attr("transform", event.transform);
    }
}

// Llamar a la función para crear el árbol genealógico
createFamilyTree(data);
