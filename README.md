## clean-architecture-front

Project for see clean architecture examples

## Requirements

node v22 (see `.nvmrc`)

The backend (`clean-architecture-api`) must be running on `http://localhost:3001`.

## Configuration

```bash
cp .env.example .env
```

`VITE_API_HOST` points to the backend base URL (`http://localhost:3001/ms-logica-negocio/api`).

## Scripts

### `npm install`

Install node modules dependencies.

> If `npm run dev` fails with `Cannot find native binding` (`@rolldown/binding-win32-x64-msvc`),
> `node_modules` was installed from another OS. Delete `node_modules` and run `npm install` again.

### `npm run dev`

Run the proyect in http://localhost:5173/

### `npm run build`

Build the proyect bundle for release and distribution.
