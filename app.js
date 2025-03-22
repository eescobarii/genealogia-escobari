// Datos de ejemplo con imágenes
const data = {
    "name": "Juan Pérez",
    "birthdate": "1950-01-01",
    "photo": "images/juan.jpg",
    "parejas": [
        {
            "name": "Ana López",
            "birthdate": "1955-02-25",
            "photo": "images/ana.jpg",
            "children": [
                {
                    "name": "Carlos Pérez",
                    "birthdate": "1980-05-10",
                    "photo": "images/carlos.jpg"
                },
                {
                    "name": "Luisa Pérez",
                    "birthdate": "1985-03-22",
                    "photo": "images/luisa.jpg"
                }
            ]
        },
        {
            "name": "María García",
            "birthdate": "1960-07-15",
            "photo": "images/maria.jpg",
            "children": [
                {
                    "name": "Pedro Pérez",
                    "birthdate": "1990-06-05",
                    "photo": "images/pedro.jpg"
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
        d.parejas.forEach(pareja => {
            children = children.concat(pareja.children.map(child => ({
                name: child.name,
                birthdate: child.birthdate,
                photo: child.photo,
                parent: d.name
            })));
        });
        return children;
    });

    const treeLayout = d3.tree().size([width - margin.left - margin.right, height - margin.top - margin.bottom]);

    treeLayout(root);

    // Animar las líneas de conexión entre nodos
    const links = svg.selectAll(".link")
        .data(root.links())
        .enter().append("line")
        .attr("class", "link")
        .attr("x1", d => d.source.x + margin.left)
        .attr("y1", d => d.source.y + margin.top)
        .attr("x2", d => d.target.x + margin.left)
        .attr("y2", d => d.target.y + margin.top)
        .attr("stroke", "black")
        .attr("stroke-width", 2)
        .attr("stroke-dasharray", "5,5")  // Estilo de línea punteada al principio
        .transition()  // Animación
        .duration(1000)
        .attr("stroke-dasharray", "0,0");  // Hacer la línea continua al final

    // Crear nodos
    const nodes = svg.selectAll(".node")
        .data(root.descendants())
        .enter().append("g")
        .attr("class", "node")
        .attr("transform", d => `translate(${d.x + margin.left}, ${d.y + margin.top})`);

    // Dibujar rectángulos para los nodos
    nodes.append("rect")
        .attr("width", 150)
        .attr("height", 150)
        .attr("rx", 5)
        .attr("ry", 5)
        .attr("fill", "#4CAF50")
        .style("opacity", 0)  // Hacerlos invisibles al principio
        .transition()  // Animación
        .duration(1000)
        .style("opacity", 1);  // Hacerlos visibles después de la animación

    // Añadir las fotos dentro de los nodos
    nodes.append("image")
        .attr("x", 10)
        .attr("y", 10)
        .attr("width", 130)
        .attr("height", 130)
        .attr("href", d => d.data.photo || "images/default.jpg");

    // Añadir texto con el nombre dentro de los nodos
    nodes.append("text")
        .attr("x", 75)
        .attr("y", 140)
        .attr("dy", ".35em")
        .attr("text-anchor", "middle")
        .attr("fill", "white")
        .text(d => d.data.name);

    // Animación de entrada para el texto (que aparece con un retraso)
    nodes.select("text")
        .style("opacity", 0)
        .transition()
        .duration(1000)
        .style("opacity", 1);

    // Hacer el árbol interactivo: clic para mostrar más información
    nodes.on("click", function(event, d) {
        const personInfo = `
            <h3>${d.data.name}</h3>
            <p>Fecha de nacimiento: ${d.data.birthdate}</p>
            <img src="${d.data.photo}" alt="${d.data.name}" style="width: 150px; height: 150px; border-radius: 10px;">
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
