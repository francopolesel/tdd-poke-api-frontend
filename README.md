🌐 [English](README.en.md)

# Pokédex Frontend — Práctica TDD

Proyecto frontend personal para practicar Test-Driven Development en un contexto React real.
Consume la [PokeAPI](https://pokeapi.co/api/v2/) (pública, sin API key) para listar, buscar y filtrar pokémon.

## Por qué este proyecto

Quería aplicar TDD en frontend de forma concreta, no solo leer sobre el tema. La idea fue
elegir un dominio conocido (pokémon) y una API pública estable para no depender de backend
propio, y enfocarme exclusivamente en el ciclo Red → Green → Refactor con Jest y React
Testing Library.

## Stack

- React 18 + Vite
- Jest + React Testing Library + jest-environment-jsdom
- ESLint + Prettier
- CSS vanilla
- GitLab CI

## Funcionalidades

- Listado de pokémon con nombre, número, tipos y sprite (placeholder si no hay imagen)
- Filtro por tipo y por generación (selects combinables)
- Búsqueda por texto (nombre o tipo)
- Estado de carga y mensaje de error si falla la API
- UI en español (Argentina)

## Endpoints PokeAPI consumidos

Base URL: `https://pokeapi.co/api/v2`

| Recurso | Endpoint |
|---------|----------|
| Listado paginado | `GET /pokemon?limit=151&offset=0` |
| Detalle | `GET /pokemon/{name_or_id}` |
| Tipos | `GET /type` |
| Pokémon por tipo | `GET /type/{id_or_name}` |
| Generaciones | `GET /generation` |
| Pokémon por generación | `GET /generation/{id}` |

## Instalación

```bash
git clone https://github.com/francopolesel/tdd-poke-api-frontend.git
cd pokedex-frontend
npm install
npm run dev
```

La app corre en `http://localhost:5173`.

## Tests

```bash
npm test            # con cobertura
npm run test:watch  # modo watch
npm run test:ci     # secuencial, para pipelines
```

## Scripts

| Script | Descripción |
|--------|-------------|
| `dev` | Servidor de desarrollo (Vite) |
| `build` | Build de producción en `dist/` |
| `preview` | Sirve el build localmente |
| `test` | Jest con cobertura |
| `test:watch` | Jest en modo watch |
| `test:ci` | Jest secuencial |
| `lint` | ESLint |

## CI (GitLab)

`.gitlab-ci.yml` define dos stages:

1. **test** — `npm ci` + `npm run test:ci`
2. **build** — `npm ci` + `npm run build` (artefacto: `dist/`)

Para publicar:

```bash
git remote add origin <URL_REPO>
git push -u origin main
```

## Estructura

```
src/
├── api/
│   └── pokeApi.js
├── components/
│   ├── App.jsx
│   ├── TypeSelect.jsx
│   ├── GenerationSelect.jsx
│   ├── SearchInput.jsx
│   ├── PokemonList.jsx
│   ├── PokemonCard.jsx
│   └── Pagination.jsx
├── utils/
│   ├── filter.js
│   └── format.js
├── styles/
│   └── App.css
├── tests/
│   └── *.test.{js,jsx}
└── main.jsx
```

## Enfoque TDD

El desarrollo siguió el ciclo:

1. **Red** — escribir el test que describe el comportamiento esperado, verificar que falla.
2. **Green** — implementar el mínimo código para que pase.
3. **Refactor** — mejorar estructura sin romper tests.

Cada paso quedó en commits con prefijos `test:`, `feat:`, `refactor:`.

La feature principal desarrollada con este flujo fue la búsqueda y filtrado
por tipo + generación. El historial de la rama `feature/buscar-filtros-tdd`
muestra el ciclo completo.

## Lecturas de referencia

Capítulos de *Test Driven Development: By Example* (Kent Beck) que consulté
antes de arrancar:

- **Cap. 1–3:** primer ciclo completo, implementación mínima, refactoring con red de seguridad.
- **Cap. 6–7:** pasos chicos y diseño emergente.
- **Cap. 25:** patrones TDD.

Notas en `docs/notas-lectura-tdd.md`.
