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

    // Iniciar el árbol genealógico con jsTree
    $('#tree-container').jstree({
        'core': {
            'data': familyTree
        }
    });
});
