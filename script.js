

function calcular() {

    let voltaje = parseFloat(
        document.getElementById("voltaje").value
    );

    let resistencia = parseFloat(
        document.getElementById("resistencia").value
    );

    if (!Number.isFinite(voltaje) ||
        !Number.isFinite(resistencia) ||
        voltaje < 0 || resistencia <= 0) {

        alert("Introduce valores válidos.");
        return;
    }

    let corriente = voltaje / resistencia;

    document.getElementById("resultado").textContent =
        corriente.toFixed(2) + " A";

    document.getElementById("operacion").textContent =
        voltaje + " ÷ " + resistencia +
        " = " + corriente.toFixed(2) + " A";
}




const voltageSlider =
    document.getElementById("voltageSlider");

const resistanceSlider =
    document.getElementById("resistanceSlider");

function actualizarSimulador() {

    let voltaje = Number(voltageSlider.value);
    let resistencia = Number(resistanceSlider.value);

    let corriente = voltaje / resistencia;

    document.getElementById("voltageValue").textContent =
        voltaje + " V";

    document.getElementById("resistanceValue").textContent =
        resistencia + " Ω";

    document.getElementById("vDisplay").textContent =
        voltaje + " V";

    document.getElementById("rDisplay").textContent =
        resistencia + " Ω";

    document.getElementById("iDisplay").textContent =
        corriente.toFixed(2) + " A";

    document.getElementById("currentValue").textContent =
        corriente.toFixed(2) + " A";

    actualizarGrafica(voltaje, resistencia);
}

voltageSlider.addEventListener(
    "input", actualizarSimulador
);

resistanceSlider.addEventListener(
    "input", actualizarSimulador
);




function reiniciar() {

    voltageSlider.value = 12;
    resistanceSlider.value = 6;

    actualizarSimulador();
}




const ctx = document.getElementById("myChart");

let chart = new Chart(ctx, {

    type: "line",

    data: {
        labels: [],
        datasets: [{
            label: "Corriente (A)",
            data: [],
            borderColor: "#24C8DB",
            backgroundColor: "#24C8DB33",
            fill: true,
            tension: 0.3
        }]
    },

    options: {
        responsive: true,

        maintainAspectRatio: false,

        scales: {
            x: {
                title: {
                    display: true,
                    text: "Voltaje (V)",
                    color: "white"
                },
                ticks: {
                    color: "white"
                }
            },

            y: {
                beginAtZero: true,
                title: {
                    display: true,
                    text: "Corriente (A)",
                    color: "white"
                },
                ticks: {
                    color: "white"
                }
            }
        },

        plugins: {
            legend: {
                labels: {
                    color: "white"
                }
            }
        }
    }
});


function actualizarGrafica(voltaje, resistencia) {

    let voltajes = [];
    let corrientes = [];

    for (let v = 0; v <= voltaje; v += 1) {

        voltajes.push(v);

        corrientes.push(
            Number((v / resistencia).toFixed(2))
        );
    }

    chart.data.labels = voltajes;
    chart.data.datasets[0].data = corrientes;

    chart.update();
}




function verificar() {

    let respuesta = parseFloat(
        document.getElementById("respuesta").value
    );

    let mensaje = document.getElementById("mensaje");

    if (!Number.isFinite(respuesta)) {
        mensaje.textContent = "Introduce una respuesta.";
        mensaje.style.color = "#F59E0B";
        return;
    }

    if (Math.abs(respuesta - 2) < 0.001) {

        mensaje.textContent =
            "¡Correcto! Has aplicado correctamente la Ley de Ohm.";

        mensaje.style.color = "#22C55E";

    } else {

        mensaje.textContent =
            "Respuesta incorrecta. Intenta nuevamente.";

        mensaje.style.color = "#EF4444";
    }
}



actualizarSimulador();

function calcular() {

    const k = 9e9;

    let q1 = parseFloat(document.getElementById("carga1").value);
    let q2 = parseFloat(document.getElementById("carga2").value);
    let r = parseFloat(document.getElementById("distancia").value);

    let resultado = document.getElementById("resultado");
    let operacion = document.getElementById("operacion");
    let tipoFuerza = document.getElementById("tipoFuerza");

    if (!Number.isFinite(q1) ||
        !Number.isFinite(q2) ||
        !Number.isFinite(r) || r <= 0) {

        resultado.textContent = "Datos inválidos";
        operacion.textContent = "Ingresa cargas válidas y una distancia mayor que cero.";
        tipoFuerza.textContent = "";
        return;
    }

    let fuerza = k * Math.abs(q1 * q2) / (r * r);

    resultado.textContent = fuerza.toExponential(4) + " N";

    operacion.textContent =
        "F = (9 × 10⁹ × |" + q1 + " × " + q2 +
        "|) ÷ " + r + "²";

    if (q1 * q2 > 0) {
        tipoFuerza.textContent = "Las cargas se REPelen.";
    } else if (q1 * q2 < 0) {
        tipoFuerza.textContent = "Las cargas se ATRAEN.";
    } else {
        tipoFuerza.textContent = "La fuerza eléctrica es cero.";
    }
}