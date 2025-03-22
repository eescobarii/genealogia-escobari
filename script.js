$(document).ready(function() {
    var familyTree = [
        {
            "text": "Juan Pérez",
            "children": [
                {
                    "text": "Carlos Pérez",
                    "children": [
                        {"text": "Ana Pérez"},
                        {"text": "Pedro Pérez"}
                    ]
                },
                {
                    "text": "Lucía Pérez",
                    "children": [
                        {"text": "María García"},
                        {"text": "Luis García"}
                    ]
                }
            ]
        }
    ];

    // Crear el árbol genealógico interactivo
    $('#tree-container').jstree({
        'core': {
            'data': familyTree
        },
        'plugins': ['wholerow']
    });
});
