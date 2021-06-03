const btnSubmit = document.getElementById("btn-submit");

btnSubmit.addEventListener("click", function (e) {
    e.preventDefault();

    const titulo = document.getElementById("titulo").value;
    const artista = document.getElementById("artista").value;
    const lanzamiento = document.getElementById("lanzamiento").value;

    let dataQuery = "";
    let hayDatos = false;

    if (titulo !== "") {
        dataQuery = `?titulo=${titulo}`;
        hayDatos = true;
    }

    if (artista !== "") {
        if (hayDatos) {
            dataQuery += `&artista=${artista}`;
        } else {
            dataQuery = `?artista=${artista}`;
            hayDatos = true;
        }
    }

    if (lanzamiento !== "") {
        if (hayDatos) {
            dataQuery += `&lanzamiento=${lanzamiento}`;
        } else {
            dataQuery = `?lanzamiento=${lanzamiento}`;
            hayDatos = true;
        }
    }


    if (hayDatos) {
        window.location.href = `/discos${dataQuery}`;
    }
});