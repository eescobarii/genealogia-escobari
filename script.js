$(document).ready(function() {
    var familyTree = [
        {
            "text": "Juan Pérez",
            "icon": "fotos/juan.jpg",
            "data": {
                "info": "Juan nació el 1 de enero de 1950. Es ingeniero."
            },
            "children": [
                {
                    "text": "Carlos Pérez",
                    "icon": "fotos/carlos.jpg",
                    "data": {
                        "info": "Carlos nació el 12 de marzo de 1980. Es médico."
                    }
                },
                {
                    "text": "Lucía Pérez",
                    "icon": "fotos/lucia.jpg",
                    "data": {
                        "info": "Lucía nació el 5 de mayo de 1985. Es profesora."
                    }
                }
            ]
        }
    ];

    // Crear el árbol genealógico con jsTree
    $('#tree-container').jstree({
        'core': {
            'data': familyTree
        },
        'plugins': ['wholerow']
    });

    // Ajustar el zoom según el valor del slider
    $('#zoom-slider').on('input', function() {
        var zoomLevel = $(this).val(); // Obtener el valor del slider
        $('#tree-container').css('transform', 'scale(' + zoomLevel / 100 + ')');
    });

    // Abrir ventana modal con información adicional al hacer clic en un nodo
    $('#tree-container').on('select_node.jstree', function(e, data) {
        var person = data.node;
        var name = person.text;
        var photo = person.icon;
        var info = person.data.info;

        // Llenar la ventana modal con la información
        $('#person-name').text(name);
        $('#person-photo').attr('src', photo);
        $('#person-info').text(info);

        // Mostrar la ventana modal
        $('#modal').fadeIn();
    });

    // Cerrar la ventana modal
    $('#close').click(function() {
        $('#modal').fadeOut();
    });
});
