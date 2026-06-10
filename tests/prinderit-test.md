# Test: Si e njoh fëmijën tim?
## Dokument Arkitekture — `/prinderit`

_Versión: 2026-06-09_

---

## 1. Qué es este test

Una herramienta de orientación para padres albaneses y kosovares con hijos de 15–19 años. El padre responde preguntas sobre comportamientos observables de su hijo y sobre sus propias expectativas. Al final recibe un perfil del hijo, una reflexión honesta sobre el equilibrio entre lo que el padre quiere y lo que el hijo probablemente necesita, y recomendaciones concretas sobre cómo acompañar sin presionar.

**Premisa central:** el padre es el observador más cercano de su hijo, pero también el que tiene más filtros propios. Este test ayuda a separar las dos cosas.

**Lo que este test NO hace:** no reemplaza la conversación con el hijo. No da respuestas definitivas sobre qué carrera elegir. No juzga al padre.

---

## 2. Ubicación en el proyecto

```
src/pages/prinderit.astro    ← página ya existe, reemplazar contenido
public/js/test-styles.css    ← estilos compartidos (ya existe)
```

Layout: `LayoutInfo.astro` (sin selector de idioma, solo albanés)

URL: `/prinderit` (ya en el mapa de URLs, estado ✅ Live — actualizar contenido)

---

## 3. Flujo del test

```
Pantalla 0 — Datos iniciales
  └── Emri i prindit (nombre del padre/madre, texto libre)
  └── Gjinia e fëmijës: Djalë / Vajzë / Tjetër
  └── Mosha e fëmijës: 14–16 / 17–18 / 19+ (selector)

Pantallas 1–5 — Parte 1: El padre describe a su hijo (15 preguntas, grupos de 3)
  └── Preguntas sobre comportamientos observables del hijo
  └── Escala Likert 1–5 ("Aspak" → "Gjithmonë")
  └── Barra de progreso visible
  └── "Vazhdo" bloqueado hasta responder las 3

Pantallas 6–7 — Parte 2: Las expectativas del padre (6 preguntas, grupos de 3)
  └── Preguntas sobre lo que el padre espera y valora
  └── Misma escala Likert 1–5
  └── Separador visual entre parte 1 y parte 2

Pantalla 8 — Resultado
  └── Saludo con nombre del padre
  └── Perfil del hijo (top 2 áreas de fortaleza)
  └── Cómo se integran esas fortalezas al mercado laboral actual
  └── Reflexión sobre el equilibrio padre-hijo
  └── 3 recomendaciones concretas de cómo acompañar
  └── 2–3 artículos del blog sugeridos
  └── Botón "Bëje përsëri"
```

---

## 4. Estructura de las dos partes

### Parte 1 — El padre describe a su hijo (16 preguntas del pool)

Preguntas sobre comportamientos concretos y observables. No opiniones, no proyecciones. El padre puede responderlas con cierta objetividad porque describen lo que ve, no lo que espera.

Estas preguntas mapean a las mismas 6 áreas Holland del resto del sitio (R, I, A, S, E, C), lo que permite conectar el resultado con el test `/nxenes/zgjidhje-karriere` si el hijo también lo hace.

### Parte 2 — Las expectativas del padre (5 preguntas del pool)

Preguntas sobre los valores y expectativas del padre respecto al futuro de su hijo. No hay respuestas correctas. El resultado las usa para calibrar el mensaje final: si las expectativas del padre están muy alejadas del perfil del hijo, el resultado lo menciona con delicadeza y sin juzgar.

Las preguntas de esta parte mapean a un índice de "presión expectativas" (0–25) que no se muestra al padre pero que condiciona el tono del resultado.

---

## 5. Mecánica de selección aleatoria

```
Pool total: 33 preguntas
  — 27 preguntas Parte 1 (comportamientos del hijo, ~4–5 por área Holland)
  — 6 preguntas Parte 2 (expectativas del padre)

Selección por sesión:
  Parte 1:
    1. Separar pool de parte 1 por área Holland
    2. Barajar cada grupo
    3. Tomar mínimo 2 por área → 12 preguntas base
    4. Completar hasta 15 con preguntas aleatorias del pool restante de parte 1
    5. Barajar las 15 seleccionadas
    6. Mostrar en 5 grupos de 3

  Parte 2:
    1. Tomar las 6 preguntas de expectativas
    2. Barajar
    3. Mostrar las primeras 6 en 2 grupos de 3

Total por sesión: 15 + 6 = 21 preguntas
```

---

## 6. Sistema de puntuación

### Parte 1 — Perfil del hijo

```
scores_hijo = { R: 0, I: 0, A: 0, S: 0, E: 0, C: 0 }

Por cada pregunta de parte 1:
  scores_hijo[pregunta.area] += valorLikert(1–5)

Máximo por área: variable según cuántas preguntas de esa área
  se seleccionaron (2–3 × 5 = 10–15 puntos)

Normalizar antes de comparar:
  score_normalizado[area] = score[area] / preguntas_seleccionadas[area]

Resultado: top 2 áreas con score_normalizado más alto
```

### Parte 2 — Índice de presión parental

```
presion = suma de valorLikert de las 6 preguntas de expectativas

Rango: 6–30
  6–14  → presión baja    (padre abierto, acompañante)
  15–22 → presión media   (padre involucrado, con algunas expectativas fijas)
  23–30 → presión alta    (padre con expectativas muy definidas)

Este índice NO se muestra al padre.
Condiciona el tono del mensaje de equilibrio en el resultado.
```

---

## 7. Pool de 33 preguntas

### Parte 1 — Comportamientos del hijo (27 preguntas)

```json
[
  { "id": 1,  "parte": 1, "area": "R", "text": "Fëmija im ndreq ose ndërton gjëra me duar kur ka kohë të lirë." },
  { "id": 2,  "parte": 1, "area": "R", "text": "Preferon aktivitete jashtë shtëpisë dhe lëvizje fizike." },
  { "id": 3,  "parte": 1, "area": "R", "text": "Tregon interes për makina, teknologji mekanike ose elektrike." },
  { "id": 4,  "parte": 1, "area": "R", "text": "Zgjidh problemet duke provuar me duar, jo vetëm duke menduar." },

  { "id": 5,  "parte": 1, "area": "I", "text": "Bën pyetje të shumta — kërkon të kuptojë pse funksionojnë gjërat." },
  { "id": 6,  "parte": 1, "area": "I", "text": "Lexon ose shikon dokumentarë për shkencë, histori ose teknologji." },
  { "id": 7,  "parte": 1, "area": "I", "text": "I/e pëlqen të analizojë situata përpara se të vendosë." },
  { "id": 8,  "parte": 1, "area": "I", "text": "Tregon kënaqësi kur zbulon diçka të re vetë, pa i treguar dikush." },

  { "id": 9,  "parte": 1, "area": "A", "text": "Kalon kohë duke krijuar — vizatime, muzikë, shkrime ose dizajn." },
  { "id": 10, "parte": 1, "area": "A", "text": "Ka një mënyrë unike të shprehjes — në veshje, hapësirë ose komunikim." },
  { "id": 11, "parte": 1, "area": "A", "text": "Preferon detyra pa përgjigje të vetme të saktë." },
  { "id": 12, "parte": 1, "area": "A", "text": "Vëren detaje estetike që të tjerët nuk i shohin." },

  { "id": 13, "parte": 1, "area": "S", "text": "Shokët ose miqtë vijnë tek ai/ajo kur kanë probleme." },
  { "id": 14, "parte": 1, "area": "S", "text": "Ndihet mirë kur ndihmon të tjerët — vëllezërit, shokët, fqinjët." },
  { "id": 15, "parte": 1, "area": "S", "text": "Preferon të punojë në grup sesa vetëm." },
  { "id": 16, "parte": 1, "area": "S", "text": "Tregon empati — e ndjen kur dikush tjetër është i/e shqetësuar." },

  { "id": 17, "parte": 1, "area": "E", "text": "Merr iniciativë — organizon, propozon, fillon gjëra vetë." },
  { "id": 18, "parte": 1, "area": "E", "text": "I/e pëlqen të bindë të tjerët ose të drejtojë aktivitete." },
  { "id": 19, "parte": 1, "area": "E", "text": "Nuk tërhiqet lehtë kur has vështirësi — ka këmbëngulje." },
  { "id": 20, "parte": 1, "area": "E", "text": "Flet me siguri për idetë e tij/saj, edhe para të rriturve." },

  { "id": 21, "parte": 1, "area": "C", "text": "Mban gjërat në rregull — librat, dhomën, detyrat." },
  { "id": 22, "parte": 1, "area": "C", "text": "Ndjek rregulla dhe procedura pa nevojë për t'u kujtuar." },
  { "id": 23, "parte": 1, "area": "C", "text": "I/e pëlqen të planifikojë përpara — lista, orare, hapa të qartë." },
  { "id": 24, "parte": 1, "area": "C", "text": "Punon mirë me detaje dhe vëren gabimet e vogla." },

  { "id": 25, "parte": 1, "area": "R", "text": "Preferon të mësojë duke bërë, jo duke dëgjuar ose lexuar." },
  { "id": 26, "parte": 1, "area": "I", "text": "Kënaqet me lojëra strategjike ose puzzle-t komplekse." },
  { "id": 27, "parte": 1, "area": "S", "text": "Përfshihet në aktivitete vullnetare ose komunitare kur ka mundësi." }
]
```

### Parte 2 — Expectativas del padre (6 preguntas)

```json
[
  { "id": 28, "parte": 2, "text": "Për mua, një karrierë e mirë është para së gjithash ajo që siguron të ardhura të qëndrueshme." },
  { "id": 29, "parte": 2, "text": "Jam i/e shqetësuar nëse fëmija zgjedh një fushë që nuk ka prestigj social." },
  { "id": 30, "parte": 2, "text": "Mendoj se disa karriera (art, muzikë, sport) janë hobi, jo punë e vërtetë." },
  { "id": 31, "parte": 2, "text": "Preferohet që fëmija të studiojë diçka të sigurt edhe nëse nuk i pëlqen shumë." },
  { "id": 32, "parte": 2, "text": "Vendimi final për karrierën duhet të jetë kryesisht i familjes, jo vetëm i fëmijës." },
  { "id": 33, "parte": 2, "text": "Më vjen vështirë ta imagjinoj fëmijën tim duke punuar në një fushë kreative ose artistike." }
]
```

> Las 6 preguntas de la Parte 2 se usan **todas** en cada sesión (no se aleatoriza cuáles, solo el orden). Son solo 6 y cubren dimensiones distintas, no tiene sentido descartar ninguna.

---

## 8. Datos de resultado por área Holland

Mismo sistema que `/nxenes/zgjidhje-karriere`, pero el texto está redactado para el padre, no para el hijo.

| Área | Lo que el padre observa | Cómo se integra al mercado laboral actual |
|---|---|---|
| R | Su hijo aprende haciendo, necesita resultados tangibles | Demanda alta en Albania: construcción, infraestructura, energías renovables, IT de hardware |
| I | Su hijo pregunta constantemente, necesita profundidad | Medicina, investigación, tecnología, farmacia — carreras largas pero con salida real |
| A | Su hijo crea, necesita libertad y expresión | Economía digital: diseño UX, marketing de contenido, producción audiovisual — mercado en crecimiento |
| S | Su hijo ayuda, necesita conexión con personas | Educación, salud pública, trabajo social — sectores con demanda sostenida en Albania y Kosovo |
| E | Su hijo lidera, necesita autonomía y retos | Emprendimiento, negocios, administración pública — Albania necesita más líderes locales |
| C | Su hijo organiza, necesita estructura y claridad | Contabilidad, finanzas, logística, administración — alta empleabilidad, poca volatilidad |

---

## 9. Lógica del resultado — tres mensajes

El resultado combina tres elementos que se generan juntos:

### Mensaje 1 — Perfil del hijo

```
"Bazuar në atë që keni vëzhguar, [emri i fëmijës] tregon forcë në dy fusha:"

[Área 1 dominante] — descripción breve redactada para el padre
[Área 2 dominante] — descripción breve

"Këto aftësi janë të kërkuara në tregun e punës sot sepse..."
→ párrafo corto con contexto de mercado albanés/kosovar
```

### Mensaje 2 — Reflexión de equilibrio (condicionada por índice de presión)

```
presion 6–14 (baja):
  "Ju tashmë po e shoqëroni fëmijën tuaj në mënyrën e duhur.
   Ajo që mund ta forconi është..."
   → consejo de cómo profundizar la conversación

presion 15–22 (media):
  "Ju keni pritshmëri të qarta — kjo është normale.
   Megjithatë, ka një tension midis asaj që dëshironi dhe asaj që fëmija tregon.
   Ja si mund ta gjeni ekuilibrin..."
   → consejo concreto de cómo negociar expectativas

presion 23–30 (alta):
  "Dashuria juaj për fëmijën është e qartë — por mund të ndodhë që
   pritshmëritë tuaja po e bëjnë vendimin më të vështirë për të/atë.
   Një fëmijë që studion diçka që nuk e dëshiron..."
   → dato sobre abandono universitario + cómo abrir la conversación
   (tono empático, nunca acusatorio)
```

### Mensaje 3 — 3 recomendaciones concretas

Siempre las mismas 3 estructuras, con contenido que varía según el perfil del hijo:

1. **Çfarë mund të bëni këtë javë** — una acción inmediata y pequeña (ej: "preguntarle sobre qué le gusta hacer cuando nadie lo mira")
2. **Çfarë duhet të dini për tregun e punës** — un dato real sobre el mercado laboral albanés relevante al perfil del hijo
3. **Si ta mbani bisedën e hapur** — una frase concreta para iniciar la conversación con el hijo sin que suene a presión

---

## 10. Artículos del blog sugeridos al final

Al final del resultado, mostrar 2–3 artículos del catálogo del blog. La selección depende del perfil del hijo:

```
Perfil R o I → 
  "Sistemi i arsimit në Shqipëri" (/blog/sistema-educativo-albania)
  "Universitetet më të mira në Shqipëri" (/blog/mejores-universidades-albania)

Perfil A o S →
  "Sistemi i notave në Shqipëri" (/blog/sistema-notas-albania)
  "Universitetet më të mira në Shqipëri" (/blog/mejores-universidades-albania)

Perfil E o C →
  "Sistemi i arsimit në Shqipëri" (/blog/sistema-educativo-albania)
  "Sistemi i notave në Shqipëri" (/blog/sistema-notas-albania)
```

> Cuando el blog crezca, esta lógica se amplía con artículos más específicos por área.

---

## 11. Estructura del archivo .astro

```astro
---
// src/pages/prinderit.astro
import LayoutInfo from '../layouts/LayoutInfo.astro';
---

<LayoutInfo
  title="Si e njoh fëmijën tim? | ScaleGrades"
  description="Test për prindër — zbulo pikat e forta të fëmijës tënd dhe si mund ta shoqërosh më mirë në zgjedhjen e karrierës."
  lang="sq"
>
  <link rel="stylesheet" href="/js/test-styles.css" />

  <div id="app">
    <!-- Pantalla 0: nombre del padre, sexo del hijo, edad del hijo -->
    <!-- Pantallas 1–5: Parte 1, grupos de 3 (preguntas sobre el hijo) -->
    <!-- Separador visual entre parte 1 y parte 2 -->
    <!-- Pantallas 6–7: Parte 2, grupos de 3 (expectativas del padre) -->
    <!-- Pantalla 8: resultado -->
  </div>

  <script>
    // IIFE autocontenida — sin dependencias externas
    // Mismo patrón que zgjidhje-karriere.astro
  </script>
</LayoutInfo>
```

---

## 12. Lógica JS — resumen de módulos internos

```
AREAS{}              — datos de las 6 áreas (redactados para el padre)
POOL_HIJO[]          — 27 preguntas de comportamientos del hijo
POOL_PADRE[]         — 6 preguntas de expectativas (fijas, solo se baraja el orden)
ARTICULOS{}          — mapa área → artículos del blog

selectQuestions()
  — baraja POOL_HIJO por área, toma mínimo 2 por área, completa a 15
  — baraja POOL_PADRE (las 6 siempre presentes)
  — devuelve { hijo: [15], padre: [6] }

startTest()
  — lee nombre del padre, sexo e edad del hijo
  — llama selectQuestions()
  — muestra grupo 0 de parte 1

showGroup(idx)
  — grupos 0–4: preguntas de parte 1 (hijo)
  — al llegar a grupo 5: mostrar separador visual "Tani disa pyetje për ju"
  — grupos 5–6: preguntas de parte 2 (padre)
  — actualiza barra de progreso
  — bloquea "Vazhdo" hasta responder las 3

nextGroup()
  — acumula scores según parte
  — si idx < 6: showGroup(idx+1)
  — si idx === 6: calcularResultado() → showResult()

calcularResultado()
  — normaliza scores_hijo por preguntas seleccionadas por área
  — calcula indice_presion (suma raw de parte 2, rango 6–30)
  — determina top 2 áreas del hijo
  — selecciona tono del mensaje de equilibrio según indice_presion
  — selecciona artículos del blog según área dominante

showResult()
  — renderiza los 3 mensajes (perfil, equilibrio, recomendaciones)
  — muestra artículos del blog sugeridos
  — adapta pronombre del hijo según gjinia (Vajzë → "ajo/së", Djalë → "ai/të")

restart()
  — resetea estado y vuelve a pantalla 0
```

---

## 13. SEO — meta tags necesarios

```html
<title>Si e njoh fëmijën tim? | ScaleGrades</title>
<meta name="description"
  content="Test për prindër — zbulo pikat e forta të fëmijës dhe si ta shoqërosh në zgjedhjen e karrierës pa e shtypur." />
<link rel="canonical" href="https://scalegrades.com/prinderit" />
<meta property="og:title" content="Test për prindër — ScaleGrades" />
<meta property="og:description"
  content="21 pyetje për të kuptuar më mirë fëmijën tënd dhe për të gjetur ekuilibrin midis pritshmërive tuaja dhe rrugës së tij/saj." />
<meta property="og:url" content="https://scalegrades.com/prinderit" />
```

---

## 14. Diferencias clave respecto a los otros tests

| Aspecto | `/nxenes/zgjidhje-karriere` | `/prinderit` |
|---|---|---|
| Quién responde | El estudiante sobre sí mismo | El padre sobre su hijo |
| Partes | 1 parte | 2 partes (hijo + padre) |
| Preguntas hijo | 21 directas | 15 observacionales |
| Preguntas padre | — | 6 de expectativas |
| Índice oculto | No | Sí (presión parental) |
| Tono resultado | Personal, directo | Empático, nunca acusatorio |
| CTA final | `/universitetet` | Artículos del blog |
| Pronombre | Adaptado al propio usuario | Adaptado al sexo del hijo |

---

## 15. Checklist de implementación

- [ ] Reemplazar contenido de `src/pages/prinderit.astro`
- [ ] Implementar IIFE con lógica de dos partes
- [ ] Implementar separador visual entre parte 1 y parte 2
- [ ] Implementar cálculo del índice de presión parental (oculto)
- [ ] Implementar los 3 tonos del mensaje de equilibrio
- [ ] Implementar lógica de artículos del blog por área dominante
- [ ] Verificar adaptación de pronombre según sexo del hijo
- [ ] Verificar que "Vazhdo" se bloquea correctamente en ambas partes
- [ ] Probar los 3 escenarios de presión parental con respuestas extremas
- [ ] Verificar que el índice de presión nunca aparece visible al padre
- [ ] Añadir enlace desde `/` (hub landing) hacia esta página si no existe
