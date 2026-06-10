# Test: Çfarë karriera mund të zgjedhësh?
## Dokument Arkitekture — `/nxenes/zgjidhje-karriere`

_Versión: 2026-06-09_

---

## 1. Qué es este test

Una herramienta de orientación vocacional para estudiantes albaneses de 15–19 años. El estudiante responde 21 preguntas sobre sus intereses, aptitudes y valores, y recibe sus 3 áreas de interés dominantes con carreras concretas disponibles en Albania y Kosovo.

**Base metodológica:** modelo Holland (RIASEC) — el estándar de orientación vocacional más validado científicamente a nivel mundial, usado por O\*NET, universidades europeas y sistemas educativos de más de 30 países. No es una adaptación libre: las 6 dimensiones (R, I, A, S, E, C) son las categorías del test.

---

## 2. Ubicación en el proyecto

```
src/pages/nxenes/zgjidhje-karriere.astro   ← página principal
public/js/test-styles.css                  ← estilos compartidos de tests (ya existe)
```

Layout: `LayoutInfo.astro` (sin selector de idioma, solo albanés)

URL: `/nxenes/zgjidhje-karriere`

Añadir al mapa de URLs en `ARQUITECTURA.md`:

| URL | Página | Estado |
|---|---|---|
| `/nxenes/zgjidhje-karriere` | Test elección de carrera | ✅ Construido |

---

## 3. Flujo del test

```
Pantalla 0 — Datos iniciales
  └── Nombre (texto libre)
  └── Gjinia: Femër / Mashkull / Tjetër

Pantalla 1–7 — Preguntas (grupos de 3)
  └── 7 grupos × 3 preguntas = 21 preguntas en pantalla
  └── Cada pregunta: escala Likert 1–5
  └── Barra de progreso visible en todo momento
  └── Botón "Vazhdo" bloqueado hasta responder las 3

Pantalla 8 — Resultado
  └── Saludo personalizado con nombre
  └── Top 3 áreas dominantes (con barra de puntuación)
  └── Descripción de cada área
  └── Carreras sugeridas en Albania/Kosovo
  └── CTA → /universitetet
  └── Botón "Bëje përsëri"
```

---

## 4. Mecánica de selección aleatoria

**Objetivo:** que dos amigos que hagan el test juntos reciban preguntas distintas.

**Algoritmo:**

```
Pool total: 33 preguntas (33 en JSON, ver sección 6)
Distribución: ~5–6 preguntas por área Holland (R, I, A, S, E, C)

Selección por sesión:
  1. Separar pool por área
  2. Barajar cada grupo por área
  3. Tomar 3 aleatorias de cada área → 18 preguntas base
  4. Completar hasta 21 con preguntas aleatorias del pool restante
  5. Barajar las 21 seleccionadas
  6. Mostrar en grupos de 3 por pantalla
```

Resultado: 21 preguntas por sesión, nunca exactamente iguales entre dos usuarios, pero siempre con cobertura balanceada de las 6 áreas.

---

## 5. Sistema de puntuación

Cada pregunta pertenece a una de las 6 áreas Holland. Al responder, el valor Likert (1–5) se suma al score del área correspondiente.

```
scores = { R: 0, I: 0, A: 0, S: 0, E: 0, C: 0 }

Por cada pregunta respondida:
  scores[pregunta.area] += valorLikert(1–5)

Máximo teórico por área:
  Si las 3 preguntas de un área reciben 5 → 15 puntos

Resultado:
  Ordenar áreas por score descendente
  Mostrar top 3
```

No hay empates resueltos aleatoriamente: en empate exacto se muestra el área que aparece primero en el orden R→I→A→S→E→C (orden canónico Holland).

---

## 6. Pool de 33 preguntas

Cada pregunta tiene: `id`, `area` (R/I/A/S/E/C), `text` (en albanés).

```json
[
  { "id": 1,  "area": "R", "text": "Më pëlqen të ndërtoj ose riparojnë gjëra me duart e mia." },
  { "id": 2,  "area": "R", "text": "Preferoj të punoj jashtë ose në mjedise fizike, jo në zyrë." },
  { "id": 3,  "area": "R", "text": "Më interesojnë makineritë, mjetet dhe si funksionojnë ato." },
  { "id": 4,  "area": "R", "text": "Kënaqem kur zgjidh probleme praktike me zgjidhje konkrete." },
  { "id": 5,  "area": "R", "text": "Do të preferoja një punë ku rezultati i punës time mund të shihet dhe preket." },
  { "id": 31, "area": "R", "text": "Preferoj aktivitete fizike dhe sportin ndaj atyre të ulur." },

  { "id": 6,  "area": "I", "text": "Kënaqem kur hulumtoj dhe lexoj për tema shkencore ose teknike." },
  { "id": 7,  "area": "I", "text": "Kam kënaqësi në zgjidhjen e problemeve komplekse dhe abstrakte." },
  { "id": 8,  "area": "I", "text": "Pyetja 'pse funksionon kështu?' më mban të zgjuar natën." },
  { "id": 9,  "area": "I", "text": "Më pëlqen të analizoj të dhëna dhe të nxjerr përfundime nga to." },
  { "id": 10, "area": "I", "text": "Eksperimentet dhe kërkimet shkencore më duken fascinuese." },
  { "id": 32, "area": "I", "text": "Lexoj artikuj shkencorë ose libra edukativë për kënaqësi personale." },

  { "id": 11, "area": "A", "text": "Shprehem lehtë nëpërmjet artit, muzikës, shkrimit ose dizajnit." },
  { "id": 12, "area": "A", "text": "Preferoj detyra ku kam liri kreative dhe nuk ka vetëm një përgjigje të saktë." },
  { "id": 13, "area": "A", "text": "Vërej detaje estetike që të tjerët shpesh i kalojnë pa i parë." },
  { "id": 14, "area": "A", "text": "Imagjinata dhe origjinaliteti janë pikat e mia më të forta." },
  { "id": 15, "area": "A", "text": "Kënaqem kur krijoj diçka nga e para — histori, vizatime, muzikë, ose dizajne." },
  { "id": 33, "area": "A", "text": "Muzika, filmat ose librat janë burime frymëzimi të rëndësishme për mua." },

  { "id": 16, "area": "S", "text": "Më jep energji kur ndihmoj njerëz të tjerë të zgjidhin problemet e tyre." },
  { "id": 17, "area": "S", "text": "Preferoj të punoj në grup sesa vetëm." },
  { "id": 18, "area": "S", "text": "Jam i/e mirë në dëgjim dhe i/e kuptoj njerëzit me lehtësi." },
  { "id": 19, "area": "S", "text": "Do të kënaqesha duke mësuar ose duke trajnuar të tjerët." },
  { "id": 20, "area": "S", "text": "Çështjet sociale dhe komunitare më preokupojnë sinqerisht." },

  { "id": 21, "area": "E", "text": "Më pëlqen të drejtoj projekte dhe të vendos strategji." },
  { "id": 22, "area": "E", "text": "Bindja dhe negocimi janë aftësi ku ndihem i/e fortë." },
  { "id": 23, "area": "E", "text": "Nuk më frikëson të marr rreziqe të llogarituara për të arritur qëllimin tim." },
  { "id": 24, "area": "E", "text": "Kënaqem kur ndërtoj diçka nga e para — një projekt, biznes ose iniciativë." },
  { "id": 25, "area": "E", "text": "Jam motivuar nga sfida, konkurrenca dhe mundësia për të fituar." },

  { "id": 26, "area": "C", "text": "Më pëlqen të organizoj informacionin dhe të mbaj gjërat në rregull." },
  { "id": 27, "area": "C", "text": "Saktësia dhe vëmendja ndaj detajeve janë pikat e mia të forta." },
  { "id": 28, "area": "C", "text": "Preferohem të ndjek procedura dhe rregulla të qarta në punë." },
  { "id": 29, "area": "C", "text": "Kënaqem kur punë me numra, spreadsheet-e ose sisteme organizimi." },
  { "id": 30, "area": "C", "text": "Planifikimi dhe strukturimi i detyrave vijnë natyrshëm tek unë." }
]
```

> **Nota:** el pool puede ampliarse en el futuro sin cambiar la lógica. Agregar preguntas solo requiere añadirlas al JSON y asegurarse de mantener al menos 5 por área.

---

## 7. Datos de resultado por área

Cada área Holland tiene: nombre en albanés, ícono, color del sitio, descripción, y lista de carreras concretas disponibles en Albania/Kosovo.

| Área | Nombre | Color | Carreras sugeridas |
|---|---|---|---|
| R | Realist & Teknik | `#f97316` | Inxhinieri ndërtimi, Mekanikë, Agronomí, Arkitekturë, IT & rrjete, Elektroteknikë |
| I | Hulumtues & Analitik | `#38bdf8` | Mjëkësi, Kimi & farmaci, Matematikë, Biologji, Psikologji klinike, Shkenca kompjuterike |
| A | Krijues & Artistik | `#c084fc` | Design grafik, Arkitekturë, Gazetari, Art & muzikë, Marketing kreativ, Film & produksion |
| S | Social & Ndihmues | `#4ade80` | Mësuesi, Punë sociale, Shëndet publik, HR, Komunikim & PR, Psikologji |
| E | Sipërmarrës & Lider | `#fbbf24` | Biznes & menaxhim, Marketing, Administrim publik, Financë, Sipërmarrje, Drejtësi |
| C | Organizues & Sistematik | `#60a5fa` | Kontabilitet, Administrim biznesi, Drejtësi & noter, Logistikë, Statistikë, Arkivistikë |

Los colores son consistentes con la paleta definida en `ARQUITECTURA.md` sección 7.

---

## 8. Estructura del archivo .astro

```astro
---
// src/pages/nxenes/zgjidhje-karriere.astro
import LayoutInfo from '../../layouts/LayoutInfo.astro';
---

<LayoutInfo
  title="Çfarë karriera mund të zgjedhësh? | ScaleGrades"
  description="Test i thjeshtë por i hartuar me kujdes — zbulo karrierat që përputhen me interesat dhe aftësitë e tua."
  lang="sq"
>
  <link rel="stylesheet" href="/js/test-styles.css" />

  <!-- Contenedor del test -->
  <div id="app">
    <!-- Pantalla 0: datos iniciales -->
    <!-- Pantallas 1–7: grupos de preguntas -->
    <!-- Pantalla 8: resultado -->
  </div>

  <script>
    // IIFE autocontenida — sin dependencias externas
    // Ver sección 9 para la lógica completa
  </script>
</LayoutInfo>
```

**Importante:** toda la lógica va en una IIFE dentro de `<script>`. Sin imports, sin bundler, sin dependencias externas. Mismo patrón que `lloji-i-shokut.astro`.

---

## 9. Lógica JS — resumen de módulos internos

```
AREAS{}          — datos estáticos de las 6 áreas (nombre, color, carreras)
POOL[]           — las 33 preguntas con id, area, text

selectQuestions()
  — baraja por área, toma 3 por área, completa a 21, baraja resultado

startTest()
  — lee nombre y sexo, llama selectQuestions(), muestra grupo 0

showGroup(idx)
  — renderiza 3 preguntas del grupo idx con botones Likert 1–5
  — actualiza barra de progreso
  — bloquea "Vazhdo" hasta que las 3 estén respondidas

nextGroup()
  — acumula scores del grupo actual
  — si idx < 6: showGroup(idx+1)
  — si idx === 6: showResult()

showResult()
  — ordena scores descendente
  — muestra top 3 áreas con barra proporcional, descripción, carreras
  — adapta pronombre según gjinia (F → "e", M/T → "i")
  — muestra CTA hacia /universitetet

restart()
  — resetea estado y vuelve a pantalla 0
```

---

## 10. SEO — meta tags necesarios

Añadir en el frontmatter de `LayoutInfo` o directamente en el `<head>`:

```html
<title>Çfarë karriera mund të zgjedhësh? | ScaleGrades</title>
<meta name="description"
  content="Test falas për orientim karriere — zbulo fushat ku je më i/e fortë dhe karrierat që të përshtaten në Shqipëri dhe Kosovë." />
<link rel="canonical" href="https://scalegrades.com/nxenes/zgjidhje-karriere" />
<meta property="og:title" content="Test i karrierës — ScaleGrades" />
<meta property="og:description"
  content="21 pyetje, rezultat personal. Zbulo karrierën tënde sipas modelit Holland (RIASEC)." />
<meta property="og:url" content="https://scalegrades.com/nxenes/zgjidhje-karriere" />
```

Añadir la URL al `sitemap.xml` existente.

---

## 11. CTA post-resultado (captura de leads — futura)

Al final de la pantalla de resultado, después de las áreas, agregar:

```html
<!-- CTA inmediato -->
<a href="/universitetet" class="cta-btn">
  Shiko universitetet për këto karriera →
</a>

<!-- Futura captura de email (cuando esté listo el backend) -->
<!--
<div class="lead-form">
  <p>Dëshiron informacion nga universitetet për këto fusha?</p>
  <input type="email" placeholder="Email-i yt" />
  <button>Dërgoni</button>
</div>
-->
```

El bloque de captura de email queda comentado hasta que haya un backend o servicio de formularios (Formspree, EmailJS, o solución propia).

---

## 12. Checklist de implementación

- [ ] Crear `src/pages/nxenes/zgjidhje-karriere.astro`
- [ ] Usar `LayoutInfo.astro` como layout
- [ ] Implementar IIFE con la lógica descrita en sección 9
- [ ] Verificar que `test-styles.css` cubre los estilos necesarios (o añadir los que falten)
- [ ] Añadir URL a `sitemap.xml`
- [ ] Añadir URL al mapa de URLs en `ARQUITECTURA.md`
- [ ] Marcar como ✅ en el checklist de la sección 11 de `ARQUITECTURA.md`
- [ ] Añadir enlace desde `/nxenes` (hub de alumnos) hacia esta página
- [ ] Probar selección aleatoria: hacer el test 3 veces seguidas y verificar que las preguntas varían
- [ ] Verificar adaptación de pronombre (Femër vs Mashkull)
- [ ] Verificar que el botón "Vazhdo" solo se activa cuando las 3 preguntas del grupo están respondidas
