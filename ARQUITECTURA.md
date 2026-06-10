# ScaleGrades — Documento de Arquitectura

_Versión: 2026-06-09_

---

## 1. Tecnología y Stack

| Capa | Tecnología | Notas |
|---|---|---|
| Framework | **Astro 4.5.12** (static output) | SSG — 0 JS en servidor |
| Hosting | **Firebase Hosting** | CDN global, HTTPS automático |
| CSS | Tailwind CSS + estilos `<style>` per-page | Sin framework de componentes |
| Iconos | Font Awesome 6 (CDN) | |
| Gráficos | Chart.js (CDN) | Solo en RIASEC test |
| JS | Vanilla JS inline + archivos en `public/js/` | Sin bundler de JS propio |
| Dominio | scalegrades.com | |

### Cómo funciona el build

```
src/pages/**/*.astro  →  astro build  →  dist/**/*.html
public/**             →  se copia tal cual a dist/
firebase.json         →  reglas de reescritura + 301 redirects
```

Cada `.astro` en `src/pages/` produce exactamente un HTML estático. No hay API routes ni server-side rendering.

---

## 2. Estructura de Archivos

```
gscale/
├── src/
│   ├── layouts/
│   │   ├── Layout.astro          # Bilingual — tiene flag selector (sq/en)
│   │   ├── LayoutInfo.astro      # Solo albanés — sin selector de idioma
│   │   └── LayoutAlumno.astro    # Legado (página /alumno)
│   ├── components/
│   │   ├── Navbar.astro          # Barra de navegación (desktop + mobile)
│   │   ├── docentes.astro        # Calculadora de notas (teacher tool)
│   │   ├── alumnos.astro         # Tool de alumnos (legado)
│   │   └── footer.astro
│   └── pages/
│       ├── index.astro           # Hub landing — 4 secciones
│       ├── llogarites-mesues.astro # Calculadora de notas para docentes
│       ├── nxenes/
│       │   ├── index.astro       # Hub de herramientas para alumnos
│       │   ├── lloji-i-shokut.astro  # Test 1: personalidad
│       │   └── test-riasec.astro    # Test 3: RIASEC vocacional
│       ├── prinderit.astro       # Test para padres
│       ├── universitetet.astro   # Universidades + carreras
│       ├── estudiante.astro      # Redirect 301 → /nxenes/test-riasec
│       ├── alumno.astro          # Legado — puede deprecarse
│       ├── universidades.astro   # Redirect 301 → /universitetet
│       └── blog/
│           ├── index.astro       # Índice del blog
│           ├── sistema-educativo-albania.astro
│           ├── mejores-universidades-albania.astro
│           └── sistema-notas-albania.astro
├── public/
│   ├── js/
│   │   ├── navbar.js             # Lógica de idioma y textos del navbar
│   │   ├── test-app.js           # Lógica RIASEC (preguntas, radar chart)
│   │   └── test-styles.css       # CSS compartido para todas las páginas de test
│   ├── assets/
│   │   └── data/questions.json   # Preguntas del test RIASEC
│   └── sitemap.xml
├── firebase.json                 # Hosting config + redirects 301
└── astro.config.mjs
```

---

## 3. Mapa de URLs

| URL | Página | Estado |
|---|---|---|
| `/` | Hub landing | ✅ Live |
| `/llogarites-mesues` | Calculadora docente | ✅ Live |
| `/nxenes` | Hub alumnos | ✅ Live |
| `/nxenes/lloji-i-shokut` | Test personalidad | ✅ Live |
| `/nxenes/zgjidhje-karriere` | Test elección de carrera | ❌ No construido |
| `/nxenes/test-riasec` | Test RIASEC | ✅ Live |
| `/prinderit` | Test padres | ✅ Live |
| `/universitetet` | Universidades albanesas | ✅ Live |
| `/blog` | Índice blog | ✅ Live |
| `/blog/sistema-educativo-albania` | Artículo 1 | ✅ Live |
| `/blog/mejores-universidades-albania` | Artículo 2 | ✅ Live |
| `/blog/sistema-notas-albania` | Artículo 3 | ✅ Live |
| `/estudiante` | Redirect 301 → /nxenes/test-riasec | ✅ |
| `/universidades` | Redirect 301 → /universitetet | ✅ |

---

## 4. Layouts y cuándo usar cada uno

### `Layout.astro` — Para páginas bilingüe (sq / en)
- Tiene el **flag selector** (bandera Albania / UK)
- El JS en `Navbar.astro` activa el selector solo cuando `path === '/llogarites-mesues'`
- `window.cambiarPais(pais)` guarda el idioma en `localStorage` y recarga
- En todas las demás páginas se fuerza albanés: `window.switchLang('sq')`

### `LayoutInfo.astro` — Para páginas solo albanés
- Sin selector de idioma
- Más ligero — ideal para blog y páginas de tests
- Todas las páginas de tests y blog usan este layout

---

## 5. Sistema de idiomas (navbar.js)

```
localStorage['pais'] = 'albania' | 'uk'

actualizarTextos()
  └── setNavText(btnId, key)
        └── lee translations[lang][key]
              └── actualiza .nav-text del botón
```

Los textos de cada botón se definen en `public/js/navbar.js` en dos objetos (`sq` y `en`). Agregar un botón nuevo requiere:
1. Añadir la clave en ambos objetos
2. Llamar `setNavText('btn-nuevo', 'clave')` en `actualizarTextos()`
3. Añadir el span `.nav-text` en `Navbar.astro`

---

## 6. Los 2 Tests que Faltan

### Test 2: Elección de Carrera (`/nxenes/zgjidhje-karriere`)

**Concepto:** El alumno responde preguntas sobre sus gustos (¿te gusta trabajar con personas? ¿con datos? ¿al aire libre?) y recibe 2–3 sugerencias de carrera concreta con la nota mínima de ingreso en Albania.

**Arquitectura sugerida:**
- 12–15 preguntas con opciones (A/B/C/D)
- Cada opción suma puntos a una de 5 áreas: Ciencias, Humanidades, Tecnología, Arte, Negocios
- Resultado: top 2 áreas + 3 carreras sugeridas por área (con universidades donde estudiarlas en Albania)
- Mismo stack: IIFE self-contained, `test-styles.css`, `LayoutInfo`
- Archivo: `src/pages/nxenes/zgjidhje-karriere.astro`

**Datos necesarios:** Lista de ~30 carreras con: nombre en albanés, área, nota mínima aproximada de ingreso, universidades que la ofrecen.

**Esfuerzo estimado:** 1 sesión de trabajo (3–4 horas).

---

### Test complementario al RIASEC (mejora futura)

El test RIASEC actual (`/nxenes/test-riasec`) carga las preguntas desde `public/assets/data/questions.json`. Una mejora posible: al final del resultado RIASEC mostrar un CTA para ir a `/nxenes/zgjidhje-karriere` con el tipo RIASEC pre-cargado como filtro, para una recomendación más específica al contexto albanés.

---

## 7. Paleta de Colores del Sitio

```
Fondo general:    #1e212a
Card oscura:      #2a3042
Borde:            #333b4e

Naranja (acción): #f97316
Morado (alumno):  #7c3aed
Azul (padres):    #3b82f6

RIASEC por categoría:
  R (Realista):     #fb7185  (rosa)
  I (Investigador): #38bdf8  (celeste)
  A (Artístico):    #c084fc  (lila)
  S (Social):       #4ade80  (verde)
  E (Emprendedor):  #fbbf24  (amarillo)
  C (Convencional): #60a5fa  (azul)
```

---

## 8. Dónde Colocar Publicidad (AdSense / Redes de Ads)

### Regla general
Los ads deben integrarse visualmente con el fondo oscuro (`#1e212a`) o el fondo blanco de las páginas de blog. Evitar ads entre preguntas de tests (rompen la experiencia).

### Ubicaciones ideales por página

| Página | Posición | Formato sugerido |
|---|---|---|
| `/blog/*` (artículos) | Después del primer bloque de texto (párrafo 2–3) | Banner 728×90 o Responsive |
| `/blog/*` (artículos) | Al final del artículo, antes del CTA | Banner 300×250 |
| `/blog/index` | Entre el grid de posts y el CTA | Banner horizontal |
| `/universitetet` | Sidebar derecha (si se añade layout de 2 columnas) | 300×600 |
| `/nxenes/lloji-i-shokut` | Pantalla de resultado (después de mostrar el tipo) | Banner 320×100 mobile |
| `/nxenes/test-riasec` | Pantalla de resultado | Banner 300×250 |
| `/prinderit` | Pantalla de resultado | Banner 300×250 |
| `/llogarites-mesues` | Lateral o debajo de la tabla de resultados | 300×250 o Responsive |

### Qué evitar
- **NO** poner ads en medio de un test (entre preguntas) — la tasa de abandono sube drásticamente
- **NO** ads in-page sobre la calculadora activa (interfiere con la usabilidad)
- **NO** más de 3 ads por página (penalización Google)

### Implementación en Astro
```astro
<!-- En blog artículos, agregar después del primer <p> -->
<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-XXXXXXXXXXXXXXXX"
     data-ad-slot="YYYYYYYYYY"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>
<script>(adsbygoogle = window.adsbygoogle || []).push({});</script>
```
Añadir el script de AdSense en `LayoutInfo.astro` (una vez) dentro del `<head>`.

---

## 9. Dónde Colocar Backlinks

Los backlinks son enlaces entrantes desde otros sitios. Para conseguirlos y para colocar los salientes estratégicamente:

### Backlinks salientes (outbound) — ya en el sitio
Colocar en zonas de alta credibilidad:

| Destino sugerido | Dónde colocarlo en el sitio |
|---|---|
| Ministerio de Educación Albania (mash.gov.al) | Artículos de blog — sección de fuentes |
| Universidad de Tirana, UT, etc. | Artículo "mejores universidades" + /universitetet |
| ECTS/Proceso de Bolonia (ec.europa.eu) | Artículo de notas — sección de equivalencias |
| RIASEC/O*NET (onetonline.org) | Página /nxenes/test-riasec — sección informativa |

### Estrategia para conseguir backlinks entrantes
1. **Foros albaneses de educación** — Compartir la calculadora como herramienta gratuita para docentes (Reddit albanés, grupos de Facebook de profesores)
2. **Universidades albanesas** — Contactar admisiones ofreciendo el artículo de notas como referencia para estudiantes internacionales
3. **Directorios de herramientas educativas** — Submittir `scalegrades.com` en directorios `.edu` y herramientas de docentes
4. **Guest posts** — Escribir para blogs de educación mencionando la herramienta
5. **Schema markup** — Ya implementado (JSON-LD en todas las páginas) — ayuda al SEO estructural aunque no son backlinks directos

### Páginas del sitio con más potencial de backlinks entrantes

| Página | Por qué atraería links |
|---|---|
| `/llogarites-mesues` | Herramienta única para docentes albaneses — alta utilidad |
| `/blog/sistema-notas-albania` | Recurso informativo que otros blogs citarían |
| `/nxenes/test-riasec` | Herramienta vocacional gratuita — compartible |
| `/universitetet` | Directorio de universidades — referencia |

---

## 10. Consideraciones SEO Actuales

- **Sitemap** en `/sitemap.xml` — incluye todas las URLs con `hreflang` albanés
- **Canonical** configurado en cada página via `LayoutInfo`
- **JSON-LD** schema en blog y páginas principales
- **Robots.txt** — verificar que no bloquea `/blog/` (crear si no existe)
- **Redirects 301** — `/estudiante` y `/universidades` configurados en `firebase.json`
- **Pendiente:** Open Graph images personalizadas por página (actualmente sin og:image)

---

## 11. Checklist de Páginas para Completar el Sitio

- [x] Hub landing `/`
- [x] Calculadora docente `/llogarites-mesues`
- [x] Hub alumnos `/nxenes`
- [x] Test personalidad `/nxenes/lloji-i-shokut`
- [ ] **Test carrera** `/nxenes/zgjidhje-karriere` ← FALTA
- [x] Test RIASEC `/nxenes/test-riasec`
- [x] Test padres `/prinderit`
- [x] Universidades `/universitetet`
- [x] Blog índice `/blog`
- [x] Blog artículo 1 (sistema educativo)
- [x] Blog artículo 2 (universidades)
- [x] Blog artículo 3 (sistema de notas)
- [ ] **Robots.txt** — crear `public/robots.txt`
- [ ] **OG Images** — imágenes 1200×630 para redes sociales
- [ ] **AdSense** — integrar scripts en LayoutInfo cuando se apruebe la cuenta
