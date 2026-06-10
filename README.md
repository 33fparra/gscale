# ScaleGrades - Calculadora de Escala de Notas

Plataforma web para calcular escalas de notas y promedios académicos. Disponible en español, inglés y albanés.

## 🌐 Idiomas y Países Soportados

| Idioma | Países | Escala por defecto |
|--------|--------|-------------------|
| **Español** | Chile, España, México | Variable según país |
| **Inglés** | Estados Unidos | 0-100 (aprobación 60) |
| **Albanés** | Albania | 1-10 (aprobación desde 4) |

### Detección Automática de Idioma

El sistema detecta automáticamente el idioma basándose en la ubicación IP del usuario:

- **Albania** → Albán + Escala Albania
- **Estados Unidos** → Inglés + Escala EE.UU.
- **España/Chile/México** → Español + Escala del país
- **Otro país** → Inglés (fallback por defecto)

El idioma se guarda en `localStorage` y persiste al navegar entre páginas.

---

## 📋 Funcionalidades

### Sección Docente
- Calcula escalas de notas según parámetros configurables
- Parámetros: nota máxima, mínima, aprobación, exigencia, puntaje máximo, incremento
- Orden ascendente/descendente con iconos (↑↓)
- Tabla de resultados con traducción dinámica

### Sección Alumno
- Calcula promedio ponderado por secciones
- Soporta múltiples notas por sección
- Muestra mensaje de eximición según configuración
- Traducción completa de todos los elementos

---

## 🛠️ Tecnologías

- **Astro** - Framework web estático
- **Tailwind CSS** - Estilos
- **Firebase Hosting** - Despliegue

---

## 📁 Estructura del Proyecto

```
gscale/
├── public/
│   ├── img/                 # Banderas de países
│   │   ├── albania.svg
│   │   ├── chile.svg
│   │   ├── espana.svg
│   │   ├── estados-unidos.svg
│   │   └── mexico.svg
│   └── js/
│       ├── navbar.js        # Lógica de país/idioma
│       └── alumnos.js       # Lógica de cálculo de promedio
├── src/
│   ├── components/
│   │   ├── docentes.astro   # Componente docente
│   │   ├── alumnos.astro   # Componente alumno
│   │   ├── Navbar.astro     # Navegación
│   │   └── footer.astro     # Pie de página
│   ├── layouts/
│   │   ├── Layout.astro     # Layout principal (Docente)
│   │   └── LayoutAlumno.astro
│   └── pages/
│       ├── index.astro      # Página docente
│       └── alumno.astro     # Página alumno
├── dist/                    # Build de producción
└── firebase.json           # Configuración Firebase
```

---

## 🎨 Escalas de Notas por País

### Albania (AL)
- Nota mínima: 1
- Nota máxima: 10
- Aprobación: desde 4
- Puntaje máximo: 10
- Incremento: 0.1

### Chile (CL)
- Nota mínima: 10
- Nota máxima: 70
- Aprobación: 40
- Puntaje máximo: 100
- Exigencia: 60%

### España (ES)
- Nota mínima: 0
- Nota máxima: 10
- Aprobación: 5
- Puntaje máximo: 10
- Incremento: 0.1

### Estados Unidos (US)
- Nota mínima: 0
- Nota máxima: 100
- Aprobación: 60
- Puntaje máximo: 100
- Exigencia: 90%

### México (MX)
- Nota mínima: 0
- Nota máxima: 10
- Aprobación: 5
- Puntaje máximo: 10
- Incremento: 0.1

---

## 🚀 Despliegue

### Requisitos
- Node.js 18+
- npm

### Comandos

```bash
# Instalar dependencias
npm install

# Desarrollo
npm run dev

# Build producción
npm run build

# Desplegar a Firebase
npx firebase deploy
```

### URL de Producción
https://scalegrades.com

---

## 📝 Notas de Desarrollo

- El sistema usa `localStorage` para persistir el idioma seleccionado por el usuario
- La detección de IP usa la API `ip-api.com` (gratuita)
- Los textos de la interfaz se traducen dinámicamente según el idioma seleccionado
- Las tablas de resultados tienen encabezados traducidos (Ptje/Nota, Scr/Grade, Pk/Nota)

---

## 📄 Licencia

MIT