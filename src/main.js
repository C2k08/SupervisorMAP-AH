import './style.css';
import { locations } from './data/locations.js';

// ---- Configuración de iconos Leaflet para evitar problemas en Vite ----
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
});

// ==== 1. INICIALIZAR MAPA ====
// Coordenadas centrales de Temuco
const TEMUCO_LAT = -38.7359;
const TEMUCO_LNG = -72.5904;

const map = L.map('map', {
  center: [TEMUCO_LAT, TEMUCO_LNG],
  zoom: 13,
  zoomControl: false // Movemos control a otra parte si se requiere, para que no tape UI
});

L.control.zoom({ position: 'bottomright' }).addTo(map);

// Capa de mapas de OpenStreetMap
L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png', {
  attribution: '&copy; OpenStreetMap | CartoDB',
  subdomains: 'abcd',
  maxZoom: 20
}).addTo(map);

// Arrays para guardar las referencias de marcadores y elementos UI
const markers = [];
const uiElements = [];

// ==== 2. FUNCIONES DE UI Y ROUTING ====

const categoryColors = {
  "Municipales": "#3182ce",
  "Americar": "#dd6b20",
  "Otras Instalaciones": "#38a169"
};

const getGoogleMapsDirUrl = (lat, lng) => {
  return `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}&dir_action=navigate`;
};

const getWazeDirUrl = (lat, lng) => {
  return `https://waze.com/ul?ll=${lat},${lng}&navigate=yes`;
};

const renderLocationsList = (filteredLocations) => {
  const container = document.getElementById('locationsList');
  const countDisplay = document.getElementById('countDisplay');
  container.innerHTML = '';
  countDisplay.innerText = filteredLocations.length;
  uiElements.length = 0;
  
  if (filteredLocations.length === 0) {
    container.innerHTML = `<p style="text-align:center; color: var(--text-muted); opacity:0.7;">No se encontraron instalaciones coincidientes.</p>`;
    return;
  }

  const grouped = filteredLocations.reduce((acc, loc) => {
    if (!acc[loc.category]) acc[loc.category] = [];
    acc[loc.category].push(loc);
    return acc;
  }, {});

  Object.keys(grouped).forEach(categoryName => {
    const locationsInCategory = grouped[categoryName];
    
    // Create Accordion Container
    const groupDiv = document.createElement('div');
    groupDiv.className = 'category-group';
    
    // Header
    const header = document.createElement('div');
    header.className = 'category-header collapsed';
    header.innerHTML = `
      <span>${categoryName} (${locationsInCategory.length})</span>
      <svg class="chevron" width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path></svg>
    `;
    
    // Content Container
    const content = document.createElement('div');
    content.className = 'category-content collapsed';
    
    // Sort locations by distance if available
    locationsInCategory.sort((a, b) => (a.distance || 0) - (b.distance || 0));

    locationsInCategory.forEach((loc) => {
      const card = document.createElement('div');
      card.className = 'location-card';
      const distanceBadge = loc.distance ? `<span class="distance-badge">${(loc.distance / 1000).toFixed(1)} km</span>` : '';
      
      card.innerHTML = `
        <div class="card-header">
          <h3 class="location-title">${loc.name}</h3>
          <div style="display:flex; flex-direction:column; align-items:flex-end; gap:4px;">
            <span class="category-badge" data-category="${loc.category}">${loc.category}</span>
            ${distanceBadge}
          </div>
        </div>
        <div class="location-address">
          <svg fill="none" width="16" height="16" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
          ${loc.address}
        </div>
        <div class="action-buttons">
          <a href="${getWazeDirUrl(loc.coords[0], loc.coords[1])}" target="_blank" class="route-btn waze-btn">
            Waze
          </a>
          <a href="${getGoogleMapsDirUrl(loc.coords[0], loc.coords[1])}" target="_blank" class="route-btn gmaps-btn">
            Maps
          </a>
        </div>
      `;

      card.addEventListener('click', (e) => {
        if (e.target.closest('.route-btn')) return;
        map.flyTo(loc.coords, 16, { animate: true, duration: 1 });
        const markerObj = markers.find(m => m.id === loc.id);
        if (markerObj) { markerObj.marker.openPopup(); }
      });

      content.appendChild(card);
      uiElements.push({ id: loc.id, card });
    });

    // Accordion Toggle Event
    header.addEventListener('click', () => {
      header.classList.toggle('collapsed');
      content.classList.toggle('collapsed');
    });

    groupDiv.appendChild(header);
    groupDiv.appendChild(content);
    container.appendChild(groupDiv);
  });
};

const setupMarkers = () => {
  locations.forEach(loc => {
    const color = categoryColors[loc.category] || "#3182ce";
    const customIcon = L.divIcon({
      className: 'custom-icon-wrapper',
      html: `<div class="custom-marker" style="background-color: ${color};"></div>`,
      iconSize: [20, 20],
      iconAnchor: [10, 10]
    });

    const marker = L.marker(loc.coords, { icon: customIcon }).addTo(map);
    
    // Contenido del Popup en el Mapa
    const popupContent = `
      <h3>${loc.name}</h3>
      <p>${loc.address}</p>
      <div class="popup-actions">
        <a href="${getWazeDirUrl(loc.coords[0], loc.coords[1])}" target="_blank" class="popup-route-btn waze-btn">WAZE</a>
        <a href="${getGoogleMapsDirUrl(loc.coords[0], loc.coords[1])}" target="_blank" class="popup-route-btn gmaps-btn">MAPS</a>
      </div>
    `;
    marker.bindPopup(popupContent);
    
    markers.push({ id: loc.id, marker, data: loc });
  });
};

// ==== 3. LÓGICA DE BÚSQUEDA Y FILTRADO ====
const handleSearch = (e) => {
  const query = e.target.value.toLowerCase().trim();
  
  // Filtrar locations
  const filtered = locations.filter(loc => 
    loc.name.toLowerCase().includes(query) ||
    loc.category.toLowerCase().includes(query) ||
    loc.address.toLowerCase().includes(query)
  );
  
  // Actualizar UI
  renderLocationsList(filtered);
  
  // Filtrar Marcadores en Mapa: ocultamos los que no coinciden y mostramos los válidos
  const validIds = filtered.map(f => f.id);
  
  markers.forEach(mObj => {
    if (validIds.includes(mObj.id)) {
      if (!map.hasLayer(mObj.marker)) {
        map.addLayer(mObj.marker);
      }
    } else {
      if (map.hasLayer(mObj.marker)) {
        map.removeLayer(mObj.marker);
      }
    }
  });

  // Si hay al menos un resultado, centrar la vista
  if (filtered.length > 0 && query !== '') {
    const group = new L.featureGroup(
      markers.filter(m => validIds.includes(m.id)).map(m => m.marker)
    );
    map.flyToBounds(group.getBounds(), { padding: [50, 50], maxZoom: 15, duration: 0.8 });
  } else if (query === '') {
    // Si la busqueda vacía, volver al centro clásico
    map.flyTo([TEMUCO_LAT, TEMUCO_LNG], 13);
  }
};

// ==== 4. COMPORTAMIENTO PANEL MOBILE ====
const panel = document.getElementById('locationsPanel');
const toggleBtn = document.getElementById('toggleListBtn');

toggleBtn.addEventListener('click', (e) => {
  e.stopPropagation();
  panel.classList.toggle('hidden-mobile');
  
  if (!panel.classList.contains('hidden-mobile')) {
    toggleBtn.innerHTML = 'Ocultar Lista';
  } else {
    toggleBtn.innerHTML = 'Lista de Instalaciones';
  }
});

// Cerrar el panel si se hace click en cualquier parte del mapa
map.on('click', () => {
  if (!panel.classList.contains('hidden-mobile')) {
    panel.classList.add('hidden-mobile');
    toggleBtn.innerHTML = 'Lista de Instalaciones';
  }
});

// ==== INIT ====
setupMarkers();
renderLocationsList(locations);
document.getElementById('searchInput').addEventListener('input', handleSearch);

// ==== GEOLOCATION ====
let userMarker = null;
let trackingUser = false;
let userCoords = null;

const locateBtn = document.getElementById('locateMeBtn');

const handleLocationFound = (e) => {
  userCoords = [e.latlng.lat, e.latlng.lng];
  
  if (!userMarker) {
    userMarker = L.marker(e.latlng, {
      icon: L.divIcon({ className: 'user-marker', html: '<div class="user-dot"></div>', iconSize: [20,20] }),
      zIndexOffset: 1000
    }).addTo(map);
  } else {
    userMarker.setLatLng(e.latlng);
  }

  // Update distances in locations array
  locations.forEach(loc => {
    loc.distance = map.distance(e.latlng, loc.coords);
  });
  
  // Re-render the list with distances if search is empty or just refresh
  const query = document.getElementById('searchInput').value.toLowerCase().trim();
  const filtered = locations.filter(loc => 
    loc.name.toLowerCase().includes(query) ||
    loc.category.toLowerCase().includes(query) ||
    loc.address.toLowerCase().includes(query)
  );
  
  renderLocationsList(filtered);
};

map.on('locationfound', handleLocationFound);
map.on('locationerror', (e) => {
  alert("No se pudo obtener la ubicación: " + e.message);
  locateBtn.classList.remove('active-tracking');
  trackingUser = false;
});

locateBtn.addEventListener('click', () => {
  trackingUser = !trackingUser;
  if (trackingUser) {
    locateBtn.classList.add('active-tracking');
    map.locate({setView: true, maxZoom: 15, watch: true});
  } else {
    locateBtn.classList.remove('active-tracking');
    map.stopLocate();
    if(userCoords) {
      map.flyTo(userCoords, 15);
    }
  }
});
