# Pokédex Argentina — Proyecto TDD 🇦🇷

> **Materia:** Programación de Nuevas Tecnologías (PNT)
> **Metodología:** Test-Driven Development (Red → Green → Refactor)
> **Stack:** React 18 + Vite + Jest + React Testing Library

---

## Objetivo del Proyecto

Crear una **pokédex / tienda de pokémon** como aplicación frontend (solo UI) consumiendo
la [PokeAPI](https://pokeapi.co/api/v2/) pública (sin API key). El foco principal es
aplicar **TDD** (Test-Driven Development) en un proyecto real.

### Objetivos TDD (SMART)

| Dimensión | Detalle |
|-----------|---------|
| **Específico** | Escribir **al menos 10 tests unitarios** antes del código productivo, siguiendo el ciclo Red → Green → Refactor. |
| **Medible** | Cada ciclo TDD queda registrado con commits separados (`test:`, `feat:`, `refactor:`). |
| **Accionable** | Desarrollar la feature "Buscar y filtrar pokémon por tipo + generación" completa con TDD. |
| **Relevante** | Aplicar TDD mejora la calidad del código, reduce bugs y facilita refactors seguros. |
| **Temporal** | Completar el proyecto en el sprint asignado por la cátedra. |

---

## Funcionalidades

- **Listado de pokémon** con nombre, id, tipos y sprite (o placeholder).
- **Filtro por tipo** (Fuego, Agua, etc.) usando un `<select>`.
- **Filtro por generación** (1–9) usando otro `<select>`.
- **Buscador por texto** (busca en nombre y tipo).
- **Estado de carga** (spinner/loader) mientras se esperan datos.
- **Mensaje de error amigable** si la API falla.
- UI completamente en **español (Argentina)** 🇦🇷.

---

## Endpoints PokeAPI utilizados

| Recurso | URL |
|---------|-----|
| Listado de pokémon (paginado) | `https://pokeapi.co/api/v2/pokemon?limit=151&offset=0` |
| Detalle de pokémon | `https://pokeapi.co/api/v2/pokemon/{name_or_id}` |
| Listado de tipos | `https://pokeapi.co/api/v2/type` |
| Pokémon por tipo | `https://pokeapi.co/api/v2/type/{id_or_name}` |
| Listado de generaciones | `https://pokeapi.co/api/v2/generation` |
| Detalle de generación | `https://pokeapi.co/api/v2/generation/{id}` |

---

## Cómo clonar y correr localmente

```bash
# Cloná el repo
git clone <URL_REPO_PNT>
cd pokedex-frontend

# Instalá dependencias
npm install

# Levantá el servidor de desarrollo
npm run dev
```

La app corre en `http://localhost:5173`.

---

## Cómo correr los tests

```bash
# Correr tests con coverage
npm test

# Correr tests en modo watch (re-ejecuta al guardar)
npm run test:watch

# Correr tests en CI (sin paralelismo)
npm run test:ci
```

---

## Scripts disponibles

| Script | Descripción |
|--------|-------------|
| `npm run dev` | Levanta el servidor de desarrollo (Vite). |
| `npm run build` | Build de producción en `dist/`. |
| `npm run preview` | Preview del build de producción. |
| `npm test` | Corre los tests con cobertura. |
| `npm run test:watch` | Tests en modo watch. |
| `npm run test:ci` | Tests para CI (secuencial). |
| `npm run lint` | Ejecuta ESLint. |

---

## CI / CD (GitLab)

El archivo `.gitlab-ci.yml` ejecuta automáticamente:

1. **Stage `test`:** `npm ci` + `npm run test:ci`
2. **Stage `build`:** `npm ci` + `npm run build` (artefacto `dist/`)

### Publicar en GitLab (grupo PNT)

```bash
git remote add origin <URL_REPO_PNT>
git push -u origin main
```

---

## Estructura del proyecto

```
pokedex-frontend/
├── public/
├── src/
│   ├── api/
│   │   └── pokeApi.js          # Cliente API — llama a PokeAPI
│   ├── components/
│   │   ├── App.jsx             # Componente principal
│   │   ├── TypeSelect.jsx      # Select de tipos
│   │   ├── GenerationSelect.jsx # Select de generaciones
│   │   ├── SearchInput.jsx     # Input de búsqueda
│   │   ├── PokemonList.jsx     # Lista de PokemonCards
│   │   └── PokemonCard.jsx     # Card individual
│   ├── utils/
│   │   └── format.js           # Helpers de formato
│   ├── styles/
│   │   └── App.css             # Estilos globales
│   ├── tests/
│   │   ├── App.test.jsx
│   │   ├── pokeApi.test.js
│   │   ├── TypeSelect.test.jsx
│   │   ├── GenerationSelect.test.jsx
│   │   ├── PokemonList.test.jsx
│   │   ├── PokemonCard.test.jsx
│   │   ├── SearchInput.test.jsx
│   │   ├── filter.test.js
│   │   ├── loading.test.jsx
│   │   ├── error.test.jsx
│   │   └── integration.test.jsx
│   └── main.jsx
├── docs/
│   └── notas-lectura-tdd.md    # Notas sobre Kent Beck
├── .eslintrc
├── .prettierrc
├── .gitignore
├── .gitlab-ci.yml
├── babel.config.json
├── jest.config.js
├── package.json
├── vite.config.js
└── README.md
```

---

## Lectura recomendada — "Test Driven Development: By Example" (Kent Beck)

Antes de arrancar con el proyecto, te recomendamos leer estos capítulos:

| Capítulo | Tema | Por qué leerlo |
|----------|------|-----------------|
| **1 – Multi-Currency Money** | Primer ciclo TDD completo | Entendés el ritmo Red/Green/Refactor de punta a punta. |
| **2 – Degenerate Objects** | Implementar lo mínimo | Aprendés a no sobre-diseñar en el paso Green. |
| **3 – Equality for All** | Refactoring con tests como red de seguridad | Practicás el Refactor sin miedo. |
| **6 – Francly Speaking** | Cambios pequeños e incrementales | Reforzás la disciplina de pasos chicos. |
| **7 – Apples and Oranges** | Comparación y diseño emergente | Ves cómo TDD guía el diseño del código. |
| **25 – Test-Driven Development Patterns** | Patrones TDD | Resumen práctico de patrones que vas a usar. |

Podés dejar tus notas de lectura en `/docs/notas-lectura-tdd.md`.

---

## Tests implementados (≥ 10)

1. **App muestra título** de la pokédex en español.
2. **pokeApi.getTypes()** devuelve lista de tipos (mock fetch).
3. **pokeApi.getGenerations()** devuelve lista de generaciones (mock fetch).
4. **TypeSelect** muestra opciones y dispara `onChange`.
5. **GenerationSelect** muestra opciones y dispara `onChange`.
6. **PokemonList** renderiza una lista de PokemonCard.
7. **PokemonCard** muestra nombre, id y tipos.
8. **SearchInput** filtra por texto (nombre/tipo).
9. **Filter por generación** filtra correctamente (lógica pura).
10. **Loading state** se muestra mientras se espera respuesta.
11. **Error state** muestra mensaje amigable si falla la API.
12. **Integration** — seleccionar tipo + generación actualiza la UI (mock fetch).

---

## Registro de commits TDD (feature obligatoria)

La feature **"Buscar y filtrar pokémon por tipo + generación"** se desarrolló con ciclos
Red → Green → Refactor. Cada ciclo queda en el historial de commits:

```
test: add failing test - loader aparece al renderizar
feat: implement Loader component to pass test
refactor: extract Loader a componente reutilizable

test: add failing test - getTypes devuelve tipos
feat: implement getTypes en pokeApi.js
refactor: extraer BASE_URL como constante

test: add failing test - TypeSelect muestra opciones
feat: implement TypeSelect component
...
```

Consultá `git log --oneline` para ver el historial completo.

---

**Hecho con 💪 y mucho mate 🧉 — TDD al estilo argentino.**
