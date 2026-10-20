<h1 align="center">clean-architecture-front</h1>

<p align="center">
  Aplicación web del <b>Sistema de Convocatorias</b> de la Universidad de Caldas · Semillero SOLID
</p>

<p align="center">
  <img src="https://skillicons.dev/icons?i=react,vite,js,css,nodejs,docker" alt="Tecnologías del front" />
</p>

<p align="center">
  <img src="https://img.shields.io/badge/React-18-61DAFB?style=for-the-badge&logo=react&logoColor=black" alt="React 18" />
  <img src="https://img.shields.io/badge/Vite-8-646CFF?style=for-the-badge&logo=vite&logoColor=white" alt="Vite 8" />
  <img src="https://img.shields.io/badge/Ant%20Design-6-0170FE?style=for-the-badge&logo=antdesign&logoColor=white" alt="Ant Design 6" />
  <img src="https://img.shields.io/badge/React%20Router-7-CA4245?style=for-the-badge&logo=reactrouter&logoColor=white" alt="React Router 7" />
  <img src="https://img.shields.io/badge/Axios-1-5A29E4?style=for-the-badge&logo=axios&logoColor=white" alt="Axios" />
  <img src="https://img.shields.io/badge/ESLint-9-4B32C3?style=for-the-badge&logo=eslint&logoColor=white" alt="ESLint 9" />
</p>

---

Este repositorio es la interfaz del sistema. Consume la API REST de [clean-architecture-api](https://github.com/SemilleroSOLID/clean-architecture-api), que es donde viven las reglas del negocio y donde está la **documentación general del sistema** (arquitectura completa, estados, diagramas). Este README explica cómo está construido el front por dentro.

## Contenido

1. [Qué hace](#qué-hace)
2. [Tecnologías](#tecnologías)
3. [Arquitectura del front](#arquitectura-del-front)
4. [Estructura de carpetas](#estructura-de-carpetas)
5. [Cómo fluye una acción](#cómo-fluye-una-acción)
6. [Decisiones de diseño](#decisiones-de-diseño)
7. [Estados de la convocatoria en la interfaz](#estados-de-la-convocatoria-en-la-interfaz)
8. [Cómo ejecutarlo](#cómo-ejecutarlo)
9. [Cómo agregar una pantalla](#cómo-agregar-una-pantalla)
10. [Estado](#estado)

## Qué hace

| Pantalla | Ruta | Qué permite |
|---|---|---|
| Inicio | `/` | Acceso a los módulos. |
| Convocatorias · Consultar | `/convocation` | Ver las convocatorias como tarjetas, ordenarlas y filtrarlas por tipo y estado. Abrir el detalle con sus requisitos y, desde ahí, editar, eliminar, cerrar, reabrir, finalizar o cancelar según el estado. |
| Convocatorias · Crear | `/convocation` (pestaña *Crear*) | Formulario con título, tipo, descripción, fechas y requisitos, validado antes de enviarlo y con confirmación del resultado. |
| Convocatorias · Tipos | `/convocation` (pestaña *Tipos*) | Tipos de convocatoria disponibles. |
| Solicitudes | `/request` | Formulario de postulación en cuatro pasos: elegir estudiante y convocatoria abierta (con su información y requisitos), ingresar un valor por requisito con adjunto opcional, revisar y corregir antes de confirmar, y ver el resultado de la verificación automática: activa, o pendiente con la lista de requisitos que no cumple ([#15](https://github.com/SemilleroSOLID/clean-architecture-api/issues/15)). |
| Revisar solicitudes | `/admin/requests` | Sección del administrador: tabla con todas las solicitudes (estudiante, convocatoria, fecha y estado), filtros por convocatoria y estado, y el detalle de cada una con la verificación requisito por requisito ([#16](https://github.com/SemilleroSOLID/clean-architecture-api/issues/16)). |

## Tecnologías

| Tecnología | Versión | Para qué |
|---|---|---|
| React | 18 | Componentes y estado de la interfaz. |
| Vite | 8 | Servidor de desarrollo y empaquetado. |
| Ant Design | 6 | Componentes visuales: formularios, tarjetas, modales, mensajes, selector de fechas. |
| React Router | 7 | Navegación entre páginas. |
| Axios | 1 | Peticiones HTTP a la API. |
| Day.js | 1 | Manejo de fechas en los formularios. |
| Lodash | 4 | Utilidades (`isEmpty`, etc.). |
| ESLint | 9 | Reglas de estilo y errores comunes de React. |

## Arquitectura del front

El front no tiene reglas del negocio: las reglas reales están en la API. Lo que sí hace es separar responsabilidades para que la vista no sepa de HTTP y la configuración no esté repartida por los componentes.

```mermaid
flowchart TB
    subgraph UI["Vista"]
        R[routes/router.jsx] --> P[components/*/index.jsx<br/>páginas]
        P --> C[components/*/children<br/>componentes]
        C --> CI[components/common<br/>formulario y pestañas reutilizables]
    end
    subgraph Def["Definición declarativa"]
        S[schema/<br/>campos de formularios,<br/>pestañas, orden y filtros]
        K[constants/<br/>etiquetas, colores,<br/>acciones por estado]
    end
    subgraph Data["Acceso a datos"]
        SV[services/<br/>una función por endpoint]
        CF[config/<br/>rutas de la API]
        U[utils/<br/>fechas, validaciones, getEndpoint]
    end
    C --> S
    C --> K
    C --> SV
    SV --> CF
    SV --> U
    SV -- "HTTP / JSON" --> API[(clean-architecture-api)]
```

| Capa | Carpeta | Responsabilidad | No debe |
|---|---|---|---|
| Vista | `components/`, `routes/`, `styles/` | Mostrar datos y reaccionar a lo que hace el usuario. | Llamar a Axios ni armar URLs. |
| Definición | `schema/`, `constants/` | Describir formularios, listas y textos como datos. | Tener lógica de red. |
| Datos | `services/`, `config/`, `utils/` | Hablar con la API y traducir sus respuestas y errores. | Importar componentes. |

Es la misma idea de la regla de dependencias del backend aplicada a un front: la vista depende de los servicios, pero los servicios no saben qué componente los usa.

## Estructura de carpetas

```text
src/
├── main.jsx                    ← punto de entrada: layout + router
├── routes/router.jsx           ← rutas de la aplicación
├── components/
│   ├── common/                 ← CommonForm, InputWrapper, Tabs (reutilizables)
│   ├── layout/                 ← encabezado, pie y contenedor
│   ├── home/                   ← página de inicio
│   ├── convocation/
│   │   ├── index.jsx           ← página con pestañas Consultar / Crear / Tipos
│   │   ├── children/           ← lista, detalle, formulario, acciones por estado
│   │   └── inputs/             ← selector de tipo de convocatoria
│   ├── requirement/            ← modal y tarjeta para agregar requisitos
│   ├── request/                ← postulación: selección, requisitos, revisión y resultado
│   └── requestAdmin/           ← administrador: lista de solicitudes con filtros y detalle
├── schema/                     ← formularios, pestañas y opciones de la lista como datos
├── constants/                  ← etiquetas y colores de estados y tipos, acciones por estado, rutas
├── services/                   ← convocation, requirement, request y student
├── config/                     ← host y endpoints de cada recurso de la API
├── utils/                      ← fechas, validaciones, getEndpoint, toRequestError y utilidades de la solicitud
└── styles/                     ← CSS por módulo
```

## Cómo fluye una acción

Ejemplo: el administrador cierra una convocatoria desde su detalle.

```mermaid
sequenceDiagram
    autonumber
    actor Admin as Administrador
    participant Act as ConvocationActions<br/>(componente)
    participant Svc as convocation.service.js
    participant Cfg as config + getEndpoint
    participant API as clean-architecture-api

    Admin->>Act: Clic en "Cerrar" y confirma
    Note over Act: El botón solo aparece si<br/>CONVOCATION_ACTIONS_BY_STATE lo permite
    Act->>Svc: closeConvocation(id)
    Svc->>Cfg: getEndpoint(convocationConfig, "closeConvocation")
    Cfg-->>Svc: http://localhost:3001/.../closeConvocation
    Svc->>API: PUT /convocation/closeConvocation/{id}
    alt 200
        API-->>Svc: { data: convocatoria con estado CLOSED }
        Svc-->>Act: convocatoria actualizada
        Act-->>Admin: Mensaje "Convocatoria cerrada" y etiqueta naranja
    else 400 / 404 / 409
        API-->>Svc: { message, data: { campo: error } }
        Svc-->>Act: Error con message y fieldErrors
        Act-->>Admin: Mensaje de error de la API
    end
```

## Decisiones de diseño

**Formularios definidos como datos.** Los campos del formulario de convocatoria no se escriben uno por uno en JSX. Están descritos en `schema/createConvocation.schema.js` (etiqueta, nombre, componente, reglas) y `CommonForm` los dibuja. El mismo esquema sirve para crear y para editar; al editar solo cambia la regla de la fecha de inicio.

```js
// schema/createConvocation.schema.js
{
  label: "Titulo",
  name: "title",
  rules: [{ whitespace: true, message: "El título no puede estar vacío" }],
  component: Input,
  childrenProps: { placeholder: "Ingrese el nombre de la convocatoria" }
}
```

**Validación en dos niveles.** El front valida antes de enviar (campos obligatorios, fecha de inicio posterior a hoy, fin al menos un día después del inicio, valor del requisito entre 0 y 5 si es una nota) para dar respuesta inmediata. La API vuelve a validar todo, porque es la que tiene la última palabra. Si la API rechaza un campo, `toRequestError` toma el mapa `campo → mensaje` de la respuesta y el formulario lo muestra debajo del campo con `form.setFields`.

**Constantes alineadas con el backend.** `constants/convocation.constant.js` tiene los mismos valores que los enums de la API (`OPEN`, `CLOSED`, `MONITORING`...), con su etiqueta en español y su color. La interfaz nunca muestra el valor técnico.

**Configuración centralizada.** La URL base sale de la variable `VITE_API_HOST` y cada recurso tiene su archivo en `config/` con sus endpoints. Los servicios arman la URL con `getEndpoint(config, "clave")`, así que un cambio de ruta en la API se corrige en un solo lugar.

**Fechas como texto `AAAA-MM-DD`.** Es el formato que intercambia con la API. Por eso la lista puede ordenar por fecha comparando texto, y `formatDate` las muestra como `dd/mm/aaaa`.

## Estados de la convocatoria en la interfaz

El ciclo de vida lo decide la API con el patrón State ([explicación completa](https://github.com/SemilleroSOLID/clean-architecture-api#ciclo-de-vida-de-una-convocatoria)). El front lo refleja así:

```mermaid
stateDiagram-v2
    direction LR
    [*] --> Abierta
    Abierta --> Cerrada : botón Cerrar
    Cerrada --> Abierta : botón Reabrir<br/>(pide nueva fecha de fin)
    Cerrada --> Finalizada : botón Finalizar
    Abierta --> Cancelada : botón Cancelar<br/>(pide motivo)
    Cerrada --> Cancelada : botón Cancelar<br/>(pide motivo)
    Abierta --> [*] : botón Eliminar
```

| Estado | Etiqueta | Botones visibles en el detalle |
|---|---|---|
| `OPEN` | 🟢 Abierta | Editar, Cerrar, Cancelar, Eliminar |
| `CLOSED` | 🟠 Cerrada | Reabrir, Finalizar, Cancelar |
| `FINISHED` | 🔵 Finalizada | Ninguno |
| `CANCELLED` | 🔴 Cancelada | Ninguno |

Los botones salen de `CONVOCATION_ACTIONS_BY_STATE`. Ocultarlos es solo una ayuda para el usuario: si alguien llamara la API directamente, la API igual rechazaría la acción.

## Cómo ejecutarlo

Requisitos: Node.js 22 (ver `.nvmrc`) y la API corriendo en `http://localhost:3001` ([instrucciones](https://github.com/SemilleroSOLID/clean-architecture-api#cómo-ejecutar-todo-el-sistema)).

```bash
npm install
cp .env.example .env
npm run dev
```

Abre http://localhost:5173.

| Variable | Valor |
|---|---|
| `VITE_API_HOST` | `http://localhost:3001/ms-logica-negocio/api` |

| Script | Qué hace |
|---|---|
| `npm run dev` | Servidor de desarrollo en el puerto 5173. |
| `npm run build` | Genera la versión de producción en `dist/`. |
| `npm run preview` | Sirve la versión de producción para probarla. |
| `npm run lint` | Revisa el código con ESLint. |

> Si `npm run dev` falla con `Cannot find native binding` (`@rolldown/binding-win32-x64-msvc`), `node_modules` se instaló desde otro sistema operativo. Borra `node_modules` y vuelve a ejecutar `npm install`.

## Cómo agregar una pantalla

Así se construyó el formulario de postulación ([#15](https://github.com/SemilleroSOLID/clean-architecture-api/issues/15)), y es el mismo camino para cualquier pantalla nueva:

1. **config/** · `request.api.config.js` con el host `${VITE_API_HOST}/request` y el endpoint `createRequest`.
2. **services/** · `request.service.js` con `createRequest(request)`, usando `getEndpoint` y traduciendo los errores con `toRequestError` (`utils/requestError.util.js`).
3. **schema/** · `createRequest.schema.js` describe los campos como datos: uno por requisito de la convocatoria, más su adjunto opcional.
4. **components/request/children/** · `createRequest` coordina los pasos y usa `CommonForm`, el esquema y el servicio; cada paso es un componente pequeño (`selectConvocation`, `requestReview`, `requestResult`).
5. **routes/** y **constants/links.constant.js** · solo si la pantalla necesita una ruta nueva.

## Estado

| Módulo | Estado |
|---|---|
| Convocatorias: listar, detalle, crear, editar, eliminar, cambiar estado | ✅ |
| Formulario de postulación del estudiante | ✅ [#15](https://github.com/SemilleroSOLID/clean-architecture-api/issues/15) |
| Ver todas las solicitudes (administrador) | ✅ [#16](https://github.com/SemilleroSOLID/clean-architecture-api/issues/16) |
| Aprobar o rechazar solicitudes | ⏳ [#17](https://github.com/SemilleroSOLID/clean-architecture-api/issues/17) |
| Historial del estudiante | ⏳ [#18](https://github.com/SemilleroSOLID/clean-architecture-api/issues/18) |
| Login y rutas protegidas por rol | ⏳ [#23](https://github.com/SemilleroSOLID/clean-architecture-api/issues/23) |

El backlog completo está en los [issues de clean-architecture-api](https://github.com/SemilleroSOLID/clean-architecture-api/issues).

---

<p align="center">Semillero SOLID · Universidad de Caldas</p>
