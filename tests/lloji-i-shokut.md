# Test: Cili është lloji yt?
## Dokument Arkitekture — `/nxenes/lloji-i-shokut`

_Versión: 2026-06-09_

---

## 1. Qué es este test

Una herramienta de autoconocimiento para estudiantes albaneses de 15–19 años. El estudiante responde 32 preguntas sobre cómo piensa, decide y se relaciona con el mundo. Al final recibe uno de 16 tipos de personalidad con nombre propio albanés — arquetipos inspirados en la cultura, historia y literatura albanesa.

**Base metodológica:** modelo de cuatro dimensiones cognitivas bipolares, ampliamente usado en orientación vocacional y psicología aplicada. No se menciona MBTI ni ninguna marca registrada en ninguna parte del test ni del resultado.

**Objetivo principal:** entretenimiento y autoconocimiento. Retención de la audiencia estudiantil. El resultado debe ser lo suficientemente específico para que el estudiante lo reconozca en sí mismo y lo suficientemente evocador para que lo comparta.

---

## 2. Ubicación en el proyecto

```
src/pages/nxenes/lloji-i-shokut.astro    ← página ya existe (vacía), implementar
public/js/test-styles.css                ← estilos compartidos (ya existe)
```

Layout: `LayoutInfo.astro` (sin selector de idioma, solo albanés)

URL: `/nxenes/lloji-i-shokut` (ya en el mapa de URLs, estado ✅ Live)

---

## 3. Las 4 dimensiones

El test mide 4 ejes bipolares. Cada eje tiene dos polos. La combinación de los 4 polos dominantes produce uno de los 16 tipos.

| Dimensión | Polo A | Polo B | Código |
|---|---|---|---|
| Energía | Introvertido | Ekstrovertuar | I / E |
| Información | Intuitiv | Shqisor (sensorial) | N / S |
| Decisión | Mendimtar (racional) | Ndjenjëtar (emocional) | T / F |
| Estructura | Gjykues (planificador) | Perceptues (flexible) | J / P |

Cada dimensión tiene 8 preguntas. Total: 32 preguntas fijas.

---

## 4. Flujo del test

```
Pantalla 0 — Datos iniciales
  └── Emri yt (nombre, texto libre)
  └── Gjinia: Femër / Mashkull / Tjetër

Pantallas 1–8 — Preguntas (grupos de 4)
  └── 8 grupos × 4 preguntas = 32 preguntas
  └── Cada grupo mezcla las 4 dimensiones (nunca 4 del mismo eje seguidas)
  └── Escala bipolar de 5 puntos (ver sección 5)
  └── Barra de progreso visible
  └── "Vazhdo" bloqueado hasta responder las 4

Pantalla 9 — Resultado
  └── Nombre del tipo en albanés (grande, protagonista)
  └── Código de 4 letras (pequeño, secundario)
  └── Descripción del tipo (3–4 líneas, tono directo y poético)
  └── 3 fortalezas del tipo
  └── 1 desafío del tipo (honesto, sin endulzar)
  └── Carreras que suelen encajar con este tipo
  └── Frase icónica albanesa o proverbio adaptado al tipo
  └── CTA → hacer el test de carrera (/nxenes/zgjidhje-karriere)
  └── Botón "Bëje përsëri"
```

---

## 5. Escala de respuesta bipolar

No se usa Likert 1–5. Se usan dos afirmaciones opuestas con 5 grados entre ellas.

```
Interfaz visual: 5 botones entre dos afirmaciones

[Afirmacion A]  ●  ○  ○  ○  ○  [Afirmacion B]
               -2 -1  0 +1 +2
```

Los valores son: -2, -1, 0, +1, +2

Al final de las 8 preguntas de cada dimensión:
- Suma negativa → polo A (I, N, T, o J)
- Suma positiva → polo B (E, S, F, o P)
- Suma = 0 → se resuelve con el valor de la última pregunta de esa dimensión

Esto es más preciso que Likert para dimensiones bipolares porque mide dirección, no intensidad.

---

## 6. Distribución de preguntas por pantalla

Las 32 preguntas se distribuyen en 8 grupos de 4, mezclando dimensiones:

```
Grupo 1:  E/I  —  S/N  —  T/F  —  J/P
Grupo 2:  S/N  —  T/F  —  J/P  —  E/I
Grupo 3:  T/F  —  J/P  —  E/I  —  S/N
Grupo 4:  J/P  —  E/I  —  S/N  —  T/F
Grupo 5:  E/I  —  T/F  —  S/N  —  J/P
Grupo 6:  S/N  —  E/I  —  J/P  —  T/F
Grupo 7:  T/F  —  S/N  —  E/I  —  J/P
Grupo 8:  J/P  —  T/F  —  S/N  —  E/I
```

Cada dimensión aparece exactamente 2 veces por cada 4 grupos consecutivos. El orden dentro de cada grupo está fijo para garantizar la distribución, pero las afirmaciones A/B de cada pregunta se pueden barajar (cuál aparece a la izquierda) para reducir el sesgo de posición.

---

## 7. Las 32 preguntas

8 preguntas por dimensión. Cada pregunta tiene dos afirmaciones opuestas (A y B).

### Dimensión E/I — Energía

| # | Afirmación A (polo I) | Afirmación B (polo E) |
|---|---|---|
| 1 | Pas një dite të gjatë me njerëz, kam nevojë të jem vetëm për t'u çlodhur. | Pas një dite të gjatë me njerëz, ndihem më i/e energjizuar dhe dua të vazhdoj. |
| 2 | Preferoj të mendoj gjatë para se të flas. | Mendoj ndërsa flas — biseda më ndihmon të kuptoj mendimet e mia. |
| 3 | Kam pak miq të ngushtë me të cilët ndaj gjithçka. | Kam shumë njohje dhe e gëzoj kontaktin me njerëz të ndryshëm. |
| 4 | Punoj më mirë kur jam vetëm dhe pa ndërprerje. | Punoj më mirë kur ka jetë rreth meje dhe mund të shkëmbej ide. |
| 5 | Ndihem rehat me heshtjen — nuk kam nevojë ta mbush gjithmonë. | Heshtja e gjatë më shqetëson — preferoj të kem diçka që ndodh. |
| 6 | Shpesh njerëzit nuk e dinë çfarë mendoj vërtet sepse nuk e shpreh lehtë. | Njerëzit zakonisht e dinë qëndrimin tim — e shpreh hapur dhe shpejt. |
| 7 | Festë e madhe me shumë njerëz të panjohur? Jo, faleminderit. | Festë e madhe me shumë njerëz të panjohur? Ku është — jam aty. |
| 8 | Rifreskohem kur kam kohë të qetë për vete. | Rifreskohem kur jam i/e rrethuar nga njerëz dhe aktivitet. |

### Dimensión S/N — Información

| # | Afirmación A (polo N) | Afirmación B (polo S) |
|---|---|---|
| 9  | Më interesojnë mundësitë dhe ato që mund të jenë, jo vetëm ato që janë. | Më interesojnë faktet dhe ato që ekzistojnë vërtet, jo spekulimet. |
| 10 | Shpesh mendja ime shkon te lidhjet e fshehura midis gjërave. | Më pëlqen të fokusohem tek e konkretja dhe praktikja. |
| 11 | Preferoj udhëzime të hapura që lënë hapësirë për interpretim. | Preferoj udhëzime të qarta hap pas hapi. |
| 12 | Ndihem i/e tërhequr nga ideja e "çfarë do të ndodhte nëse...". | Preferoj të merrem me çfarë ndodh vërtet tani. |
| 13 | Kur lexoj, shpesh ndalem të imagjinoj skenarë të ndryshëm. | Kur lexoj, fokusohem tek informacioni dhe kuptimi i drejtpërdrejtë. |
| 14 | Parashikimet dhe vizionet afatgjata më duken emocionuese. | Plani konkret për javën e ardhshme më duket më i dobishëm se vizioni 10-vjeçar. |
| 15 | Mësoj mirë kur kuptoj konceptin e madh — detajet vijnë vetë. | Mësoj mirë kur filloj me shembuj konkretë dhe detaje specifike. |
| 16 | Intuitën time e besoj shpesh edhe pa prova të qarta. | Vendimin e bazoj mbi të dhëna dhe përvojë, jo ndjenjë. |

### Dimensión T/F — Decisión

| # | Afirmación A (polo T) | Afirmación B (polo F) |
|---|---|---|
| 17 | Kur dikush ka problem, i ofroj zgjidhje praktike. | Kur dikush ka problem, fillimisht dëgjoj dhe tregoj se e kuptoj. |
| 18 | Vendos bazuar mbi logjikën edhe kur vendimi është i vështirë emocionalisht. | Marr parasysh ndjenjat e të tjerëve edhe kur kjo e ndërlikon vendimin. |
| 19 | Kritika e drejtpërdrejtë është e dobishme — nuk ka nevojë për zbukurime. | Mënyra si thuhet diçka është po aq e rëndësishme sa çfarë thuhet. |
| 20 | Në mosmarrëveshje kërkoj të di kush ka të drejtë objektivisht. | Në mosmarrëveshje kërkoj të kuptoj si ndihet secila palë. |
| 21 | Konsistenca dhe drejtësia janë vlera që nuk duhen negociuar. | Harmonia dhe mirëkuptimi janë baza e marrëdhënieve të shëndetshme. |
| 22 | Mund të marr vendime të vështira pa u ndikuar shumë emocionalisht. | Vendimet e vështira më lënë me ndjenjë të rëndë edhe pasi janë marrë. |
| 23 | Preferoj të jem i/e drejtë sesa të jem i/e dashur, nëse duhet të zgjedh. | Preferoj të ruaj marrëdhënien edhe nëse duhet të lëshoj pe pak. |
| 24 | Analizoj situatat me distancë për të arritur në përfundimin më të logjikshëm. | Vlerësoj situatat duke u vënë në vendin e njerëzve të përfshirë. |

### Dimensión J/P — Estructura

| # | Afirmación A (polo J) | Afirmación B (polo P) |
|---|---|---|
| 25 | Preferoj të kem planin e qartë — surprizat e fundit çasit më stresojnë. | Preferoj të mbaj mundësi të hapura — planet e ngurta më kufizojnë. |
| 26 | Ndihem mirë kur detyrat janë kryer dhe gjithçka është në rregull. | Ndihem mirë kur ka gjëra interesante në horizont, edhe nëse janë të pasigurta. |
| 27 | Filloj projektet herët dhe i ndaj në hapa të qartë. | Pres afatin të afrohet — presioni më ndihmon të fokusohem. |
| 28 | Dhoma, çanta, orari — preferoj që gjithçka të ketë vendin e vet. | Kaosi i jashtëm nuk më shqetëson nëse di ku janë gjërat e mia. |
| 29 | Vendimi i marrë më jep prehje — nuk dua ta rishqyrtoj vazhdimisht. | Mbaj vendimin të hapur sa të mundem — mund të dalë diçka më e mirë. |
| 30 | Lista e detyrave është miku im i besueshëm. | Lista e detyrave bëhet burg nëse nuk ka fleksibilitet. |
| 31 | Preferoj të di çfarë të pres — parashikueshmëria është e qetësueshme. | Preferoj të jem i/e hapur ndaj mundësive të papritura — ato shpesh janë më interesante. |
| 32 | Kur mbaroj diçka, ndihem i/e kënaqur dhe kaloj te tjetri. | Kur mbaroj diçka, tashmë po mendoj për projektin tjetër që mund të filloj. |

---

## 8. Los 16 tipos con nombre albanés

Cada tipo tiene: código de 4 letras, nombre albanés, arquetipo cultural, descripción corta, 3 fortalezas, 1 desafío, proverbio o frase albanesa adaptada.

---

### INTJ — Ndërtuesi i Heshtur
**Arkitekt i mendjes, ndërtues i botëve të brendshme**

Ke një vizion të qartë për atë që duhet të jetë bota — dhe padurim për gjithçka që e pengon. Mendon shumë, flet pak, por kur flet, ia vlen të dëgjohet. Nuk ke nevojë për aprovim — ke nevojë për rezultate.

Forcat: Vizion strategjik · Pavarësi mendore · Zgjidhje origjinale
Sfida: Duron me vështirësi papërmbajtjen e të tjerëve
Fjalë: *"Mendja e mençur hapet si libër — ngadalë, por tërësisht."*
Karriera: Shkenca kompjuterike · Arkitekturë · Kërkim shkencor · Filozofi

---

### INTP — Filozofi i Malit
**Mendimtar i lirë, kërkues i së vërtetës**

Jeton në botën e ideve dhe sistemeve. Pyetja "pse?" është motori yt. Nuk pranon asgjë pa e kuptuar — dhe shpesh gjen mangësi në gjëra që të tjerët i marrin si të mirëqena. I pavarur, kurioz, dhe shpesh i humbur në mendime të veta.

Forcat: Analizë e thellë · Origjinalitet · Objektivitet
Sfida: Vështirësi në zbatimin praktik të ideve
Fjalë: *"Njeriu që pyet është gjysmë i ditur — njeriu që nuk pyet është gjysmë i verbër."*
Karriera: Matematikë · Filozofi · Programim · Fizikë

---

### ENTJ — Komandanti i Fushës
**Lider i lindur, strateg pa kompromis**

Ti sheh mundësi ku të tjerët shohin pengesa. Organizon, drejton, vendos — dhe pret të njëjtën vendosmëri nga të tjerët. Nuk ke kohë për gjysmë-masa. Ke një qëllim dhe di si të arrish atje.

Forcat: Lidershi · Vendosmëri · Eficiencë
Sfida: Mund të duket i/e ftohtë ose autoritar/e
Fjalë: *"Shqiponja nuk pyet erën — ajo e pret atë."*
Karriera: Drejtim biznesi · Drejtësi · Politikë · Menaxhim

---

### ENTP — Debatisti i Pazarit
**Mendim i shpejtë, gjuhë e mprehtë**

Të pëlqen të sfidosh idetë — edhe ato të tua. Gjen kënaqësi në debat jo për të fituar, por për të zbuluar çfarë është e vërtetë. Bezdis disa, fascinon shumë. Nuk të pëlqejnë rregullat pa arsye.

Forcat: Improvizim · Aftësi debati · Zgjidhje kreative
Sfida: Fillon shumë projekte, mbaron pak
Fjalë: *"Fjala e mençur bën më shumë se shpata — por duhet të godasi në kohën e duhur."*
Karriera: Gazetari · Drejtësi · Marketing · Sipërmarrje

---

### INFJ — Ruajtësi i Zjarrit
**Vizionar i heshtur, ndjeshmëri e thellë**

Ke një botë të brendshme shumë të pasur që pak njerëz e shohin. Kujdeset thellë — për njerëzit, për vlerat, për ardhmërinë. Shpesh di si ndihet dikush para se ai vetë ta kuptojë. Kërkon kuptim në gjithçka.

Forcat: Empati · Vizion · Besnikëri ndaj vlerave
Sfida: Mban shumë brenda — lodhja emocionale është reale
Fjalë: *"Zemra e mirë është si burimi i malit — e qetë, por s'thahet kurrë."*
Karriera: Psikologji · Letërsi · Punë sociale · Mësuesi

---

### INFP — Endrruesi i Lirisë
**Poet i brendshëm, kërkues i autenticitetit**

Jeton sipas vlerave të tua — dhe nuk ke ndërmend t'i shesësh për asgjë. Ndjen thellë, krijon shumë, dhe shpesh e shikon botën siç mund të ishte, jo siç është. Ndjeshmëria jote është një superfuqi, jo dobësi.

Forcat: Kreativitet · Autenticitet · Ndjeshmëri e thellë
Sfida: Idealizmi shpesh has në realitetin e ashpër
Fjalë: *"Ëndrra e lirë fluturon më lart se shqiponja."*
Karriera: Letërsi · Art · Psikologji · Dizajn

---

### ENFJ — Zëri i Fshatit
**Lider i zemrës, bashkues i njerëzve**

Njerëzit ndihen të kuptuar kur janë me ty. Ke aftësi natyrale për të motivuar, bashkuar dhe drejtuar — jo me forcë, por me ngrohtësi. Shpesh vën nevojat e të tjerëve para tua.

Forcat: Karizëm · Empati · Aftësi komunikimi
Sfida: Humbas veten duke u kujdesur për të gjithë
Fjalë: *"Njeriu i mirë është si drita — ndriçon pa u shuar."*
Karriera: Mësuesi · Psikologji · HR · Komunikim

---

### ENFP — Shpirti i Lirë
**Entuziast i palodhur, lidhës i botëve**

Gjej lidhje midis gjërave që të tjerët nuk i shohin. Ke energji ngjitëse dhe kuriozitet të pafund. Njerëzit të tërhiqen — jo sepse përpiqesh, por sepse je autentik/e. Bezdisesh shpejt nga rutina.

Forcat: Entuziazëm · Kreativitet · Aftësi lidhëse
Sfida: Fokusin e humb kur ka shumë gjëra interesante njëherësh
Fjalë: *"Kroi i malit nuk pyet nga rrjedh — rrjedh e gjallë."*
Karriera: Marketing kreativ · Gazetari · Psikologji · Sipërmarrje

---

### ISTJ — Gardiani i Traditës
**Besnik, i besueshëm, guri i themeltë**

Ke fjalën — dhe e mban. Punon seriozisht, respekton rregullat, dhe është mburoja e njerëzve rreth teje. Nuk bën zhurmë, por gjithçka funksionon sepse je aty. Tradicioni dhe besueshmëria janë vlerat e tua themelore.

Forcat: Besueshmëri · Organizim · Qëndrueshmëri
Sfida: Vështirësi me ndryshimin e papritur
Fjalë: *"Guri i vjetër nuk zhvendoset nga era — por mban urën."*
Karriera: Kontabilitet · Drejtësi · Administrim · Mjëkësi

---

### ISFJ — Mbrojtësi i Shtëpisë
**Kujdestari i heshtur, bujar pa bujë**

Të tjerët mund të mos ta vënë re punën tënde — por do ta ndiejnë menjëherë kur mungon. Kujdeset me durim dhe pa u ankuar. Kujtesa jote për detajet e njerëzve të afërt është e jashtëzakonshme.

Forcat: Kujdes · Besnikëri · Vëmendje ndaj detajeve
Sfida: Thotë po kur duhet të thotë jo
Fjalë: *"Dora që jep s'lodhet kurrë."*
Karriera: Shëndetësi · Mësuesi · Punë sociale · Administrim

---

### ESTJ — Organizatori i Komunës
**Drejtues praktik, zbatues i rregullave**

Beson në rregull, efikasitet dhe rezultate. Ti nuk pret që gjërat të ndodhin vetë — i organizon. Drejtues natyral në situata ku duhet aksion i shpejtë dhe i qartë. Pak tolerancë për çorganizimin.

Forcat: Organizim · Lidershi praktik · Vendosmëri
Sfida: Mund të jetë i/e ngurtë kur situata kërkon fleksibilitet
Fjalë: *"Puna e bërë sot nuk pret nesër."*
Karriera: Menaxhim · Administratë publike · Drejtësi · Financa

---

### ESFJ — Zemra e Lagjes
**Lidhës i komunitetit, kujdesëtar i njerëzve**

Ke radar të mprehtë për nevojat e njerëzve rreth teje. Gëzohesh kur të tjerët gëzohen. Feston me gjithë zemër dhe mbështet me gjithë forcë. Harmonia sociale është si ajri — pa të nuk funksionon.

Forcat: Ngrohtësi · Bashkëpunim · Ndjeshmëri sociale
Sfida: Konflikti i brendshëm kur njerëzit e dashur nuk pajtohen
Fjalë: *"Shtëpia pa ngrohtësi është vetëm mur."*
Karriera: Shëndetësi · HR · Mësuesi · Event management

---

### ISTP — Mjeshtri i Heshtjes
**Pragmatist i ftohtë, ekspert i mjeteve**

Pak fjalë, shumë veprim. Kupton si funksionojnë gjërat duke i prishur dhe rindërtuar. Të tjerët e shohin të rezervuar — ti thjesht nuk shpenzon energji për gjëra pa vlerë. Kriza? Ti qetësohet pikërisht atëherë.

Forcat: Aftësi teknike · Qetësi nën presion · Pragmatizëm
Sfida: Komunikimi emocional vjen me vështirësi
Fjalë: *"Dora e qetë pret më prerë."*
Karriera: Inxhinieri · IT · Mekanikë · Kirurgji

---

### ISFP — Artisti i Natyrshëm
**I/e butë, autentik/e, creator i heshtur**

Nuk bën zhurmë — por vepra jote flet. Ke ndjeshmëri artistike të natyrshme dhe një botë të brendshme të pasur. Vlerëson lirinë, bukurinë dhe autenticitetin mbi gjithçka. Nuk të pëlqen t'u imponohesh të tjerëve.

Forcat: Ndjeshmëri artistike · Autenticitet · Butësi
Sfida: Vështirësi në vetëpromovim dhe vendosmëri
Fjalë: *"Lulëzimi vjen pa zhurmë — por e gjithë fusha e ndjen."*
Karriera: Art · Dizajn · Muzikë · Shëndetësi

---

### ESTP — Luani i Pazarit
**Energjik, i guximshëm, i gjallë në çdo situatë**

Jeton në të tashmen — dhe e bën çdo çast të mbetet mend. Ke refleks të shpejtë, karizëm natyral dhe aftësi për të lexuar njerëzit brenda sekondash. Rregullat i zbaton kur ka kuptim — dhe i sfidosh kur nuk ka.

Forcat: Energji · Aftësi sociale · Improvizim
Sfida: Vështirësi me angazhimet afatgjata
Fjalë: *"Shqiponja nuk pyet gur nëse do të fluturojë."*
Karriera: Sipërmarrje · Sport · Shitje · Gazetari

---

### ESFP — Dielli i Grupit
**Entuziast, spontan, gëzimi i pranishëm**

Kur hyn ti, dhoma ndryshon. Ke aftësi të rrallë për të bërë njerëzit të ndihen mirë — jo duke u përpjekur, por duke qenë vetvetja. Jeton plotësisht në të tashmen dhe e infekton të tjerët me gëzim.

Forcat: Ngrohtësi · Spontanitet · Aftësi performuese
Sfida: Planifikimi afatgjatë nuk është pikën e fortë
Fjalë: *"Gëzimi i vërtetë është si dielli — nuk pyet kë ndriçon."*
Karriera: Aktorí · Muzikë · Event management · Mësuesi

---

## 9. Sistema de puntuación

```javascript
scores = { E: 0, I: 0, N: 0, S: 0, T: 0, F: 0, J: 0, P: 0 }

Escala bipolar por pregunta: -2, -1, 0, +1, +2
  Valor negativo → polo A (I, N, T, J)
  Valor positivo → polo B (E, S, F, P)

Por cada dimensión:
  suma_EI = suma de las 8 preguntas E/I
  suma_SN = suma de las 8 preguntas S/N
  suma_TF = suma de las 8 preguntas T/F
  suma_JP = suma de las 8 preguntas J/P

Determinación del tipo:
  dim1 = suma_EI >= 0 ? 'E' : 'I'
  dim2 = suma_SN >= 0 ? 'S' : 'N'
  dim3 = suma_TF >= 0 ? 'F' : 'T'
  dim4 = suma_JP >= 0 ? 'P' : 'J'

  tipo = dim1 + dim2 + dim3 + dim4  // ej: "INFP", "ESTJ"

Empate exacto (suma = 0):
  Se usa el valor de la última pregunta de esa dimensión.
  Si también es 0 (neutro central), se asigna el polo A por defecto.
```

---

## 10. Estructura del archivo .astro

```astro
---
// src/pages/nxenes/lloji-i-shokut.astro
import LayoutInfo from '../../layouts/LayoutInfo.astro';
---

<LayoutInfo
  title="Cili është lloji yt? | ScaleGrades"
  description="Zbulo llojin tënd të personalitetit — 32 pyetje, rezultat unik me emër shqiptar."
  lang="sq"
>
  <link rel="stylesheet" href="/js/test-styles.css" />

  <div id="app">
    <!-- Pantalla 0: nombre y sexo -->
    <!-- Pantallas 1–8: grupos de 4 preguntas con escala bipolar -->
    <!-- Pantalla 9: resultado con tipo albanés -->
  </div>

  <script>
    // IIFE autocontenida — sin dependencias externas
    // Mismo patrón que zgjidhje-karriere.astro y prinderit.astro
  </script>
</LayoutInfo>
```

---

## 11. Lógica JS — resumen de módulos internos

```
TIPOS{}           — los 16 tipos con nombre, descripción, fortalezas, desafío, frase, carreras
PREGUNTAS[]       — las 32 preguntas con dimension (EI/SN/TF/JP) y polo (A/B)
GRUPOS[]          — distribución fija de 8 grupos × 4 preguntas (ver sección 6)

startTest()
  — lee nombre y sexo
  — inicializa scores { EI:0, SN:0, TF:0, JP:0 }
  — muestra grupo 0

showGroup(idx)
  — renderiza 4 preguntas del grupo idx con escala bipolar visual
  — actualiza barra de progreso (idx/8 × 100%)
  — bloquea "Vazhdo" hasta responder las 4

selectAnswer(preguntaIdx, valor)
  — valor: -2, -1, 0, +1, +2
  — guarda en answers[preguntaIdx]
  — checkNext()

nextGroup()
  — acumula scores de las 4 preguntas del grupo
  — si idx < 7: showGroup(idx+1)
  — si idx === 7: calcularTipo() → showResult()

calcularTipo()
  — determina polo dominante en cada dimensión
  — construye código de 4 letras
  — devuelve TIPOS[codigo]

showResult()
  — renderiza nombre albanés del tipo (grande)
  — código MBTI-like (pequeño, sin mencionar MBTI)
  — descripción, fortalezas, desafío, frase albanesa
  — carreras sugeridas
  — CTA hacia /nxenes/zgjidhje-karriere
  — adapta saludo según gjinia

restart()
  — resetea estado y vuelve a pantalla 0
```

---

## 12. SEO — meta tags necesarios

```html
<title>Cili është lloji yt? | ScaleGrades</title>
<meta name="description"
  content="Test personaliteti falas në shqip — zbulo llojin tënd nga 16 profile unike me emra shqiptarë. 32 pyetje, rezultat i menjëhershëm." />
<link rel="canonical" href="https://scalegrades.com/nxenes/lloji-i-shokut" />
<meta property="og:title" content="Cili është lloji yt? — ScaleGrades" />
<meta property="og:description"
  content="32 pyetje për të zbuluar llojin tënd të personalitetit — me emra dhe frymëzim nga kultura shqiptare." />
<meta property="og:url" content="https://scalegrades.com/nxenes/lloji-i-shokut" />
```

---

## 13. Diferencias clave respecto a los otros tests del sitio

| Aspecto | zgjidhje-karriere | lloji-i-shokut |
|---|---|---|
| Modelo base | Holland RIASEC | 4 dimensiones bipolares |
| Escala | Likert 1–5 | Bipolar -2 a +2 |
| Preguntas por pantalla | 3 | 4 |
| Aleatorización | Sí (pool de 33) | No (32 fijas, orden mezclado) |
| Resultado | Top 3 áreas + carreras | 1 tipo de 16 + nombre albanés |
| CTA final | /universitetet | /nxenes/zgjidhje-karriere |
| Objetivo | Orientación vocacional | Entretenimiento + autoconocimiento |

---

## 14. Checklist de implementación

- [ ] Implementar contenido de `src/pages/nxenes/lloji-i-shokut.astro`
- [ ] Implementar escala bipolar visual (5 botones entre dos afirmaciones)
- [ ] Verificar distribución de dimensiones por grupo (sección 6)
- [ ] Verificar lógica de empate (suma = 0)
- [ ] Verificar que los 16 tipos tienen resultado visible y correcto
- [ ] Verificar CTA hacia `/nxenes/zgjidhje-karriere` al final del resultado
- [ ] Verificar adaptación de saludo según gjinia
- [ ] Probar los 16 combinaciones posibles manualmente
- [ ] Añadir enlace desde `/nxenes` (hub alumnos) hacia esta página
- [ ] Verificar que no aparece ninguna mención a MBTI, Myers-Briggs ni 16Personalities
