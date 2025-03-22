$(document).ready(function() {
    var familyTree = [
        {
            "id": "juan",
            "name": "Juan Pérez",
            "photo": "fotos/juan.jpg",
            "info": "Juan nació el 1 de enero de 1950. Es ingeniero.",
            "children": [
                {
                    "id": "carlos",
                    "name": "Carlos Pérez",
                    "photo": "fotos/carlos.jpg",
                    "info": "Carlos nació el 12 de marzo de 1980. Es médico."
                },
                {
                    "id": "lucia",
                    "name": "Lucía Pérez",
                    "photo": "fotos/lucia.jpg",
                    "info": "Lucía nació el 5 de mayo de 1985. Es profesora."
                }
            ]
        },
        {
            "id": "ana",
            "name": "Ana Martínez",
            "photo": "fotos/ana.jpg",
            "info": "Ana nació el 10 de febrero de 1955. Es doctora.",
            "children": [
                {
                    "id": "maria",
                    "name": "María Martínez",
                    "photo": "fotos/maria.jpg",
                    "info": "María nació el 22 de noviembre de 1985. Es abogada."
                }
            ]
        }
    ];

    // Construir el árbol genealógico en HTML
    var treeHTML = '';
    familyTree.forEach(function(parent) {
        treeHTML += `
            <div class="person" id="${parent.id}">
                <div class="name">${parent.name}</div>
                <img src="${parent.photo}" alt="${parent.name}">
                <p>${parent.info}</p>
        `;
        parent.children.forEach(function(child) {
            treeHTML += `
                <div class="person" id="${child.id}">
                    <div class="name">${child.name}</div>
                    <img src="${child.photo}" alt="${child.name}">
                    <p>${child.info}</p>
                </div>
            `;
        });
        treeHTML += `</div>`;
    });

    $('#tree-container').html(treeHTML);

    // Inicializar jsPlumb
    jsPlumb.ready(function() {
        // Conectar las parejas e hijos
        familyTree.forEach(function(parent) {
            parent.children.forEach(function(child) {
                jsPlumb.connect({
                    source: parent.id,
                    target: child.id,
                    connector: "Straight",
                    paintStyle: { stroke: "#000", strokeWidth: 2 },
                    endpointStyle: { fill: "#000", radius: 5 },
                    anchors: ["BottomCenter", "TopCenter"]
                });
            });
        });

        // Configurar el zoom
        $('#zoom-slider').on('input', function() {
            var zoomLevel = $(this).val();
            $('#tree-container').css('transform', 'scale(' + zoomLevel / 100 + ')');
        });
    });

    // Mostrar información adicional al hacer clic en un nodo
    $('.person').on('click', function() {
        var personId = $(this).attr('id');
        var person = findPersonById(personId);

        $('#person-name').text(person.name);
        $('#person-photo').attr('src', person.photo);
        $('#person-info').text(person.info);
        $('#modal').fadeIn();
    });

    $('#close').click(function() {
        $('#modal').fadeOut();
    });

    function findPersonById(id) {
        for (var i = 0; i < familyTree.length; i++) {
            if (familyTree[i].id === id) return familyTree[i];
            for (var j = 0; j < familyTree[i].children.length; j++) {
                if (familyTree[i].children[j].id === id) return familyTree[i].children[j];
            }
        }
        return null;
    }
});
