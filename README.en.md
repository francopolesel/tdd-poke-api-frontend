🌐 [Español](README.md)

# Pokédex Frontend — TDD Practice

Personal frontend project to practice Test-Driven Development in a real React context.
It consumes the [PokeAPI](https://pokeapi.co/api/v2/) (public, no API key required) to list, search, and filter Pokémon.

## Why this project

I wanted to apply TDD on the frontend in a concrete way, not just read about it. The idea was
to choose a well-known domain (Pokémon) and a stable public API so I wouldn't depend on my own
backend, and focus exclusively on the Red → Green → Refactor cycle with Jest and React
Testing Library.

## Stack

- React 18 + Vite
- Jest + React Testing Library + jest-environment-jsdom
- ESLint + Prettier
- Vanilla CSS
- GitLab CI

## Features

- Pokémon list with name, number, types, and sprite (placeholder if no image)
- Filter by type and generation (combinable selects)
- Text search (by name or type)
- Loading state and error message if the API fails
- UI in Spanish (Argentina)

## PokeAPI Endpoints Used

Base URL: `https://pokeapi.co/api/v2`

| Resource | Endpoint |
|----------|----------|
| Paginated list | `GET /pokemon?limit=151&offset=0` |
| Detail | `GET /pokemon/{name_or_id}` |
| Types | `GET /type` |
| Pokémon by type | `GET /type/{id_or_name}` |
| Generations | `GET /generation` |
| Pokémon by generation | `GET /generation/{id}` |

## Installation

```bash
git clone https://github.com/francopolesel/tdd-poke-api-frontend.git
cd pokedex-frontend
npm install
npm run dev
```

The app runs at `http://localhost:5173`.

## Tests

```bash
npm test            # with coverage
npm run test:watch  # watch mode
npm run test:ci     # sequential, for pipelines
```

## Scripts

| Script | Description |
|--------|-------------|
| `dev` | Development server (Vite) |
| `build` | Production build in `dist/` |
| `preview` | Serve the build locally |
| `test` | Jest with coverage |
| `test:watch` | Jest in watch mode |
| `test:ci` | Sequential Jest |
| `lint` | ESLint |

## CI (GitLab)

`.gitlab-ci.yml` defines two stages:

1. **test** — `npm ci` + `npm run test:ci`
2. **build** — `npm ci` + `npm run build` (artifact: `dist/`)

## Project Structure

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

## TDD Approach

Development followed the cycle:

1. **Red** — write the test describing the expected behavior, verify it fails.
2. **Green** — implement the minimum code to make it pass.
3. **Refactor** — improve structure without breaking tests.

Each step was committed with prefixes `test:`, `feat:`, `refactor:`.

The main feature developed with this flow was the search and filtering
by type + generation. The history of the `feature/buscar-filtros-tdd` branch
shows the full cycle.

## Reference Reading

Chapters from *Test Driven Development: By Example* (Kent Beck) that I consulted
before starting:

- **Ch. 1–3:** first full cycle, minimal implementation, refactoring with safety net.
- **Ch. 6–7:** small steps and emergent design.
- **Ch. 25:** TDD patterns.

Notes in `docs/notas-lectura-tdd.md`.
