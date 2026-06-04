let miGrafico = null;

function fibonacci(n) {
    let serie = [0, 1];
    for (let i = 2; i <= n; i++) {
        serie[i] = serie[i-1] + serie[i-2];
    }
    return serie;
}

function calcularTodo() {
    
    let precioAntes = parseFloat(document.getElementById("precioAntes").value);
    let precioActual = parseFloat(document.getElementById("precioActual").value);
    let meses = parseInt(document.getElementById("meses").value);

    if (precioAntes <= 0 || precioActual <= 0) {
        alert("Por favor ingresa precios mayores a 0");
        return;
    }

    let subida = ((precioActual - precioAntes) / precioAntes) * 100;

    let serieFib = fibonacci(meses + 8);
    let precioFuturo = precioActual;
    let resultados = [];

    for (let i = 1; i <= meses; i++) {
        let aumento = serieFib[i] * 2.5;
        precioFuturo = precioFuturo * (1 + aumento / 100);
        resultados.push(Math.round(precioFuturo * 10) / 10);
    }

    mostrarResultados(precioAntes, precioActual, subida, resultados);

    dibujarGrafico(precioActual, resultados, meses);
}

function mostrarResultados(antes, actual, subida, proyecciones) {
    let div = document.getElementById("resultados");
    
    let texto = "<h3>Resultados:</h3>";
    texto += "<p>Precio antes: Bs " + antes + "</p>";
    texto += "<p>Precio actual: Bs " + actual + "</p>";
    texto += "<p>Subida: " + subida.toFixed(1) + "%</p>";
    texto += "<hr><h4>Proyección:</h4>";

    for (let i = 0; i < proyecciones.length; i++) {
        texto += "<p>Mes " + (i+1) + ": Bs " + proyecciones[i] + "</p>";
    }

    div.innerHTML = texto;
    div.style.display = "block";
}

function dibujarGrafico(precioActual, proyecciones, meses) {
    let canvas = document.getElementById("grafico");

    if (miGrafico) {
        miGrafico.destroy();
    }

    let etiquetas = ["Actual"];
    for (let i = 1; i <= meses; i++) {
        etiquetas.push("Mes " + i);
    }

    miGrafico = new Chart(canvas, {
        type: "line",
        data: {
            labels: etiquetas,
            datasets: [{
                label: "Precio del Pollo",
                data: [precioActual].concat(proyecciones),
                borderColor: "#00f5ff",
                borderWidth: 3
            }]
        },
        options: {
            responsive: true
        }
    });
}