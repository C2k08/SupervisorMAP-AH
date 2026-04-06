# Mapa Supervisor

Aplicación web interactiva de mapa para gestión de instalaciones/supervisión en la ciudad de Temuco, Chile.

## Características

- Mapa interactivo con Leaflet
- Búsqueda de instalaciones por nombre o categoría
- Geolocalización del usuario
- Lista de instalaciones filtrable
- Navegación directa con Google Maps o Waze
- Diseño responsivo (móvil y escritorio)

## Tecnologías

- **Vite** - Build tool y servidor de desarrollo
- **Leaflet** - Biblioteca de mapas interactivos
- **CartoDB** - Proveedor de tiles
- **JavaScript Vanilla** - Sin frameworks
- **CSS3** - Estilos personalizados

## Estructura del Proyecto

```
├── index.html          # Punto de entrada
├── package.json        # Dependencias
├── vercel.json         # Configuración Vercel
├── public/             # Assets estáticos
├── src/
│   ├── main.js         # Lógica principal
│   ├── style.css       # Estilos
│   ├── data/
│   │   └── locations.js    # Datos de ubicaciones
│   └── assets/         # Imágenes
```

## Scripts

```bash
# Instalar dependencias
npm install

# Desarrollo
npm run dev

# Build producción
npm run build

# Preview build local
npm run preview
```

## Datos de Ubicaciones

Las ubicaciones se encuentran en `src/data/locations.js` y incluyen:
- Nombre
- Coordenadas (latitud, longitud)
- Categoría
- Dirección

## Categorías

- **Municipales** - Instalaciones municipales
- **Americar** - Instalaciones Americar
- **Otras Instalaciones** - Otras ubicaciones relevantes

## Licencia

MIT
