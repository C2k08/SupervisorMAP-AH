// src/data/locations.js

// Función para evitar que marcadores en la misma dirección se tapen entre sí
const checkOverlap = (lat, lng, address) => {
  if (!window._addressCache) window._addressCache = {};
  if (!window._addressCache[address]) {
    window._addressCache[address] = 0;
    return [lat, lng];
  }
  window._addressCache[address]++;
  const offset = window._addressCache[address] * 0.00015; // Ajuste de ~15 metros
  return [lat + offset, lng + offset];
};

export const locations = [
  // === MUNICIPALES ===
  { id: 1, name: "DIRECCION DE TRANSITO", address: "ANTONIO VARAS Nro. 755", category: "Municipales", coords: checkOverlap(-38.74012, -72.58982, "VARAS 755") },
  { id: 2, name: "CASA DE LA CULTURA", address: "AV. ALEMANIA NRO. 0560", category: "Municipales", coords: checkOverlap(-38.73475, -72.60252, "ALEMANIA 0560") },
  { id: 3, name: "CASA OF. PROYECTO ESCALA", address: "AV. ALEMANIA NRO. 01680", category: "Municipales", coords: checkOverlap(-38.73142, -72.62015, "ALEMANIA 1680") },
  { id: 4, name: "OF. TENENCIA RESPONSABLE -VETERINARIA", address: "IMPERIAL NRO. 40", category: "Municipales", coords: checkOverlap(-38.73035, -72.58305, "IMPERIAL 40") },
  { id: 5, name: "OF. DIRECCION DE OPERACIONES", address: "FREIRE NRO. 1270", category: "Municipales", coords: checkOverlap(-38.74105, -72.58412, "FREIRE 1270") },
  { id: 6, name: "OF. DIRECCION MEDIO AMBIENTE ASEO Y ORNATO", address: "FREIRE NRO. 1280", category: "Municipales", coords: checkOverlap(-38.74082, -72.58392, "FREIRE 1280") },
  //{ id: 7, name: "OF. BAÑOS Y CASINO OPERACIONES Y ASEO", address: "LOS CONFINES NRO. 1296", category: "Municipales", coords: checkOverlap(-38.75165, -72.61635, "CONFINES 1296") },
  { id: 8, name: "OF. ADMINISTRACION Y BAÑO RECINTO LOS CONFINES / OF. BAÑOS Y CASINO OPERACIONES Y ASEO", address: "LOS CONFINES NRO. 1296", category: "Municipales", coords: checkOverlap(-38.75165, -72.61635, "CONFINES 1296") },
  { id: 9, name: "CENTRO RECREACIONAL LOS CONFINES", address: "EDUARDO SOLANO NRO. 055", category: "Municipales", coords: checkOverlap(-38.75252, -72.61712, "SOLANO 055") },
  { id: 10, name: "INMUEBLE LEON GALLO", address: "LEON GALLO 135", category: "Municipales", coords: checkOverlap(-38.74565, -72.59832, "LEON GALLO 135") },
  { id: 11, name: "BIBLIOTECA GALO SEPULVEDA", address: "PRAT NRO. 102", category: "Municipales", coords: checkOverlap(-38.73885, -72.59082, "PRAT 102") },
  { id: 12, name: "CENTRO COMUNITARIO NAHUELBUTA", address: "NAHUELBUTA NRO. 02835", category: "Municipales", coords: checkOverlap(-38.72142, -72.62382, "NAHUELBUTA 2835") },
  { id: 13, name: "CASA ADULTO MAYOR PARQUE CORCOLEN", address: "LOS JAZMINES S/N", category: "Municipales", coords: checkOverlap(-38.75785, -72.61645, "JAZMINES") },
  { id: 14, name: "GUARDERIA ARBOLITO", address: "PUDETO NRO. 570", category: "Municipales", coords: checkOverlap(-38.72745, -72.61482, "PUDETO 570") },
  { id: 15, name: "BIBLIOTECA LOS BOLDOS", address: "PUDETO NRO. 570", category: "Municipales", coords: checkOverlap(-38.72745, -72.61482, "PUDETO 570") },
  { id: 16, name: "BIBLIOTECA TURINGIA", address: "QUELLON NRO. 01495", category: "Municipales", coords: checkOverlap(-38.71755, -72.61142, "QUELLON 1495") },
  { id: 17, name: "CENTRO ESTERILIZACION Y MANTENIMIENTO", address: "CAMINO CHOL CHOL KM.5", category: "Municipales", coords: checkOverlap(-38.68212, -72.64525, "CHOL CHOL") },
  { id: 18, name: "CENTRO COMUNITARIO PEDRO DE VALDIVIA", address: "QUISQUIÑA NRO. 1914", category: "Municipales", coords: checkOverlap(-38.72985, -72.63215, "QUISQUIÑA 1914") },
  { id: 19, name: "CENTRO COMUNITARIO PONIENTE", address: "ARTURO PEREZ CANTO NRO. 02165", category: "Municipales", coords: checkOverlap(-38.73712, -72.64485, "PEREZ CANTO 2165") },
  { id: 20, name: "CENTRO COMUNITARIO FUNDO EL CARMEN", address: "FUNDO EL CARMEN", category: "Municipales", coords: checkOverlap(-38.72455, -72.66525, "EL CARMEN") },
  { id: 21, name: "DIDECO", address: "FRANCISCO BILBAO NRO. 875", category: "Municipales", coords: checkOverlap(-38.74212, -72.58515, "BILBAO 875") },

  // === AMERICAR ===
  { id: 22, name: "COSECHE AV. CAUPOLICAN", address: "Av. Caupolicán 693", category: "Americar", coords: checkOverlap(-38.73912, -72.59382, "CAUPOLICAN 693") },
  { id: 23, name: "COSECHE AV. GENERAL MACKENNA", address: "Av. General Mackenna 1030", category: "Americar", coords: checkOverlap(-38.73642, -72.58425, "MACKENNA 1030") },
  { id: 24, name: "COSECHE AV. O'HIGGINS", address: "Av. O'Higgins 0498", category: "Americar", coords: checkOverlap(-38.74582, -72.59715, "OHIGGINS 0498") },
  { id: 25, name: "Temuco Caupolicán Servicios SAIS", address: "Av. Caupolicán 1476", category: "Americar", coords: checkOverlap(-38.74685, -72.59482, "CAUPOLICAN 1476") },
  { id: 26, name: "Temuco Tolosa SAIS", address: "Av. Caupolican 1490", category: "Americar", coords: checkOverlap(-38.74712, -72.59515, "CAUPOLICAN 1490") },
  { id: 27, name: "Caupolicán VW-Audi SAIS", address: "Av. Caupolicán 48", category: "Americar", coords: checkOverlap(-38.73312, -72.59255, "CAUPOLICAN 48") },
  { id: 28, name: "Caupolicán Kia SAIS", address: "Av. Caupolicán 536", category: "Americar", coords: checkOverlap(-38.73785, -72.59342, "CAUPOLICAN 536") },
  { id: 29, name: "Temuco Alemania SAIS", address: "Av. Dinamarca 501", category: "Americar", coords: checkOverlap(-38.73142, -72.60782, "DINAMARCA 501") },
  { id: 30, name: "Temuco General Mackenna SAIS", address: "Av. General Mackenna 1040", category: "Americar", coords: checkOverlap(-38.73612, -72.58382, "MACKENNA 1040") },
  { id: 31, name: "Temuco San Martin SAIS", address: "Av. San Martín 54", category: "Americar", coords: checkOverlap(-38.74185, -72.59415, "SAN MARTIN 54") },
  { id: 32, name: "Temuco Las Banderas SAIS", address: "Hochstetter 976", category: "Americar", coords: checkOverlap(-38.73742, -72.61115, "HOCHSTETTER 976") },

  // === OTRAS INSTALACIONES ===
  { id: 33, name: "SALFA 1 PADRE LAS CASAS", address: "RUTA 5 NRO. 2680", category: "Otras Instalaciones", coords: checkOverlap(-38.76542, -72.58215, "RUTA 5 2680") },
  { id: 34, name: "SALFA 2 MAQUEHUE", address: "MAQUEHUE NRO. 2931", category: "Otras Instalaciones", coords: checkOverlap(-38.76985, -72.58915, "MAQUEHUE 2931") },
  { id: 35, name: "BUSES JAC VILLARRICA", address: "FCO. BILBAO NRO. 629", category: "Otras Instalaciones", coords: checkOverlap(-38.74152, -72.58742, "BILBAO 629") },
  { id: 36, name: "BUSES BIO BIO", address: "LAUTARO NRO. 853", category: "Otras Instalaciones", coords: checkOverlap(-38.73525, -72.58825, "LAUTARO 853") },
  { id: 37, name: "BUSES BIO BIO (RUDECINDO O.)", address: "RUDECINDO ORTEGA", category: "Otras Instalaciones", coords: checkOverlap(-38.71525, -72.57525, "RUDECINDO") },
  { id: 38, name: "SECREDUC", address: "GENERAL MACKENA 574", category: "Otras Instalaciones", coords: checkOverlap(-38.73655, -72.58525, "MACKENA 574") }
];
