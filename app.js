// ===== Constantes =====
const CLAVE = "sesionesEstudio";

// ===== Elementos del DOM =====
const form = document.getElementById("formSesion");
const campoFecha = document.getElementById("fecha");
const campoTema = document.getElementById("tema");
const campoMinutos = document.getElementById("minutos");
const aviso = document.getElementById("aviso");
const lista = document.getElementById("listaSesiones");
const mensajeVacio = document.getElementById("mensajeVacio");
const rachaNumero = document.getElementById("rachaNumero");
const mejorRachaNumero = document.getElementById("mejorRachaNumero");

// ===== Fechas en hora local (nunca UTC) =====

// Devuelve la fecha como texto "aaaa-mm-dd" usando la hora local del usuario.
function fechaLocalTexto(fecha) {
  const anio = fecha.getFullYear();
  const mes = String(fecha.getMonth() + 1).padStart(2, "0");
  const dia = String(fecha.getDate()).padStart(2, "0");
  return `${anio}-${mes}-${dia}`;
}

// Convierte un texto "aaaa-mm-dd" en un objeto Fecha a medianoche local.
function textoAFecha(texto) {
  const [anio, mes, dia] = texto.split("-").map(Number);
  return new Date(anio, mes - 1, dia);
}

// Devuelve el texto de la fecha de hoy en hora local.
function hoyTexto() {
  return fechaLocalTexto(new Date());
}

// ===== Guardar y cargar =====

function cargarSesiones() {
  try {
    const datos = localStorage.getItem(CLAVE);
    return datos ? JSON.parse(datos) : [];
  } catch {
    return [];
  }
}

function guardarSesiones(sesiones) {
  localStorage.setItem(CLAVE, JSON.stringify(sesiones));
}

let sesiones = cargarSesiones();

// ===== Racha =====

// Conjunto de días con al menos una sesión.
function diasConSesion() {
  return new Set(sesiones.map((s) => s.fecha));
}

function calcularRacha() {
  const dias = diasConSesion();

  // Empezamos a contar desde hoy. Si hoy no hay sesión, la racha sigue
  // viva contando desde ayer (no se rompe hasta que termine el día).
  let racha = 0;
  const fecha = new Date();
  if (!dias.has(fechaLocalTexto(fecha))) {
    fecha.setDate(fecha.getDate() - 1);
  }

  // Contamos días consecutivos hacia atrás.
  while (dias.has(fechaLocalTexto(fecha))) {
    racha += 1;
    fecha.setDate(fecha.getDate() - 1);
  }

  return racha;
}

// Racha más larga de todas: recorre todos los días con sesión desde la
// fecha más antigua hasta hoy, contando los tramos de días seguidos.
function calcularMejorRacha() {
  const dias = diasConSesion();
  if (dias.size === 0) return 0;

  // Convertimos cada día a su objeto Fecha y ordenamos de antigua a reciente.
  const fechasOrdenadas = [...dias].map(textoAFecha).sort((a, b) => a - b);

  let mejor = 1;
  let actual = 1;

  for (let i = 1; i < fechasOrdenadas.length; i++) {
    // Día siguiente a la fecha anterior, en hora local (sumar con setDate
    // es correcto aunque haya cambio de hora).
    const diaSiguiente = new Date(fechasOrdenadas[i - 1]);
    diaSiguiente.setDate(diaSiguiente.getDate() + 1);

    if (fechaLocalTexto(diaSiguiente) === fechaLocalTexto(fechasOrdenadas[i])) {
      // Día consecutivo: alargamos el tramo actual.
      actual += 1;
    } else {
      // Hubo un hueco: reiniciamos el tramo.
      actual = 1;
    }

    if (actual > mejor) {
      mejor = actual;
    }
  }

  return mejor;
}

// ===== Pintar =====

function pintar() {
  // Racha
  rachaNumero.textContent = calcularRacha();
  mejorRachaNumero.textContent = calcularMejorRacha();

  // Lista ordenada de la más reciente a la más antigua
  const ordenadas = [...sesiones].sort((a, b) => {
    if (a.fecha === b.fecha) return b.id - a.id;
    return a.fecha < b.fecha ? 1 : -1;
  });

  lista.innerHTML = "";
  mensajeVacio.hidden = ordenadas.length > 0;

  for (const sesion of ordenadas) {
    const li = document.createElement("li");

    const izquierda = document.createElement("div");
    const tema = document.createElement("span");
    tema.className = "item-tema";
    tema.textContent = sesion.tema;

    const fecha = document.createElement("span");
    fecha.className = "item-fecha";
    // Parseamos a mano para que se muestre también en hora local
    const f = textoAFecha(sesion.fecha);
    fecha.textContent = f.toLocaleDateString("es-ES", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });

    izquierda.appendChild(tema);
    izquierda.appendChild(document.createElement("br"));
    izquierda.appendChild(fecha);

    const minutos = document.createElement("span");
    minutos.className = "item-minutos";
    minutos.textContent = `${sesion.minutos} min`;

    li.appendChild(izquierda);
    li.appendChild(minutos);
    lista.appendChild(li);
  }
}

// ===== Eventos =====

form.addEventListener("submit", function (evento) {
  evento.preventDefault();

  const fecha = campoFecha.value;
  const tema = campoTema.value.trim();
  const minutos = Number(campoMinutos.value);

  // Validaciones
  if (!fecha || !tema || !Number.isFinite(minutos) || minutos <= 0) {
    aviso.textContent = "Revisa los campos: tema obligatorio y minutos mayores que 0.";
    aviso.hidden = false;
    return;
  }

  aviso.hidden = true;

  sesiones.push({
    id: Date.now(),
    fecha,
    tema,
    minutos,
  });

  guardarSesiones(sesiones);

  // Limpiamos todo menos la fecha
  campoTema.value = "";
  campoMinutos.value = "";
  campoTema.focus();

  pintar();
});

// ===== Inicio =====
campoFecha.value = hoyTexto();
pintar();
